import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from '../modules/config.js';
import Cookies from 'js-cookie';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"

//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Image from '../components/fields/image';

//mui component
import { green } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function FacultyReg(props){
	const {username} = useParams();
	const [snackOpen, setSnackOpen] = useState(false)
	const [alertMes, setAlertMes] = useState(null)
	const [alertStatus, setAlertStatus] = useState(null)
	const [dialogOpen, setDialogOpen] = useState(false);
	const [image, setImage] = useState(null);
	const [imgFile, setImgFile] = useState(null);
	const [redirect, setRedirect] = useState( null );

	const today = new Date();
	var dateToday = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

	const handleDialog = () =>{
		setDialogOpen(true)
	}

	const handleDialogClose = () => {
	    setDialogOpen(false);
	};

	const handleSnackClose = () =>{
		setSnackOpen(false);
		setAlertMes(null);
		setAlertStatus(null);
	}

	const state ={
		username:null ,
		password:null,
		firstName:null,
		middleInitial:null,
		lastName:null,
		extentionName:null,
		birthdate:null,
		dateRegistered: dateToday,
		contactNo:null,
		emailAdd:null,
		img:null,
		status:'active'
	}


	function reducer(state, action){
		switch(action.type){
			case 'username':
				state.username = action.data;
				return state;
			case 'password':
				state.password = action.data;
				return state;
			case 'firstName':
				state.firstName = action.data;
				return state;
			case 'middleInitial':
				state.middleInitial = action.data;
				return state;
			case 'lastName':
				state.lastName = action.data;
				return state;
			case 'extentionName':
				state.extentionName = action.data;
				return state;
			case 'birthdate':
				state.birthdate = action.data;
				return state;
			case 'contactNo':
				state.contactNo = action.data;
				return state;
			case 'emailAdd':
				state.emailAdd = action.data;
				return state;
		}
	}

	const [data, dispatch] = useReducer(reducer, state)

	const imageOnChange = (e)=>{

		const file = e.target.files[0]
		var reader = new FileReader();
  		var url = reader.readAsDataURL(file);

		reader.onloadend = function (e) {
			setImage(reader.result)
		}

		setImgFile(e.target.files[0]);	
	}

	const handleSignOut = async () => {
		const token = Cookies.get('token');

		axios.delete(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/sign-out`, { token })
		.then(() => {
			Cookies.remove('token');
			Cookies.remove('rtoken');
		})
		.catch( err => {
			throw err;
		});
	}

	const handler = ()=>{
		setDialogOpen(false);
		setSnackOpen(true);

		const formData = new FormData();

		formData.append('MISimg', imgFile );

		axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/coordinator/clist/clear-logs`)
		.then( async ()=>{
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/coordinator/clist/new-admin`)			
			.then((res)=>{
				axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/coordinator/clist/register`, data)
				.then((res)=>{
					if(image){
						axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/clist/upload-picture`, formData)
						.then((res)=>{
							setAlertMes('Welcome new coordinator please re login');
							setAlertStatus(200)
							handleSignOut()
							setTimeout(()=>{setRedirect( <Redirect to='/sign-in'/> );},2000);	
							
						})
						.catch((err)=>{
							setAlertMes(JSON.parse(err.request.response).message);
							setAlertStatus(403)
						})
					}
					else{
						setAlertMes(res.data.message);		
						setAlertStatus(200)
						handleSignOut()
						setTimeout(()=>{setRedirect( <Redirect to='/sign-in'/> );},2000);
					}		
				})
				.catch((err)=>{
					setAlertMes(JSON.parse(err.request.response).message);
					setAlertStatus(403)
				})
			})// eto ung sa taas ung nag dedeactivate
			.catch((err)=>{
				setAlertMes(JSON.parse(err.request.response).message);
				setAlertStatus(403)
				console.Log(JSON.parse(err.request.response).message)
			})
		})
		.catch((err)=>{
			setAlertMes(JSON.parse(err.request.response).message);
			setAlertStatus(403)
		})

		

		
	}

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}


	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'>
					<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
						<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
							{alertMes}
						</Alert>				
					</Snackbar>
					<div style={{height:'95%',width:'95%', color:'black',border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey"}}>
						<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'90%',width:'100%'}}>
							<div className="d-flex justify-content-start align-items-center" style={{width:'90%',height:'20%'}}>
								<HowToRegIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
								<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Register New Coordinator</p>
							</div>
							<Divider style={{height:'2px', width:'100%', color:'black'}}/>
							<div style={{height:'90%',width:'90%'}} className="d-flex flex-row justify-content-center">
								<div style={{height:'95%',width:'50%'}}>
									<div style={{height:'160px',width:'225px', border:'1px solid black'}}>
										<img className="image-img loading" width="100%" height="100%" src={ image }/>
									</div>
									<input type="file" accept="image/*" onChange={imageOnChange}/>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Username:</label>
										<Field className='uNametxt' reqOnChange={(e) => {dispatch({type: 'username', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Password:</label>
										<Field className='Passwordtxt' reqOnChange={(e) => {dispatch({type: 'password', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>First Name:</label>
										<Field className='fName'reqOnChange={(e) => {dispatch({type: 'firstName', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Middle Initial:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'middleInitial', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Last Name:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'lastName', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Name Extention:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'extentionName', data: e.target.value});}}/>
									</div>
								</div>
								<div style={{height:'100%',width:'50%'}}>
									<div style={{height:'185px',width:'170px'}}>
									
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Birth Date</label>
										<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e) => {dispatch({type: 'birthdate', data: e.target.value});}}/>
									</div>		
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Contact No.:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'contactNo', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Email Address:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'emailAdd', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label>Date Registered:</label>
										<label>{dateToday}</label>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<Button title='Cancel' style={{height:'35px', width:'130px'}} click={()=>window.history.back()}/>
										<Button title='Register' style={{height:'35px', width:'130px'}} click={handleDialog}/>
										<Dialog
											open={dialogOpen}
									        onClose={handleDialogClose}
									        aria-labelledby="alert-dialog-title"
									        aria-describedby="alert-dialog-description"
										>
											<DialogTitle>
												{"Register New Coordinator"}
											</DialogTitle>
											<DialogContent>
												The previous coordinator's account will be deactivated you will be forced to log out, do you wish to proceed?
											</DialogContent>
											<DialogActions>
												<Button title='Cancel' click={cancelOp}/>
												<Button title='Yes' click={handler}/>
											</DialogActions>
										</Dialog>
									</div>
								</div>						
							</div>
						</div>
					</div>
				</div>
			</div>
			{ redirect }
		</>
	);
}