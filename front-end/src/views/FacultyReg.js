import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';

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

	const state = {
		studentNo : null,
		password : null,
		firstName:  null,
		middleInitial:  null,
		lastName: null,
		extentionName: null,
		birthdate: null,
		course: 'BSIT',
		yearLevel: '1',
		section: null,
		dateRegistered: dateToday,
		img: null,
		sex:'Male',
		favorites: [],
		status:'active'
	}


	function reducer( state, action ){
		console.log( state );
		switch( action.type ){
			case 'studentNo':
				state.studentNo = action.data;
				return state;

			case 'firstName':
				state.firstName = action.data;
				return state;

			case 'middleInitial':
				state.middleInitial = action.data;
				return state;

			case 'lastName':
				state.lastName = action.data;
				state.password = action.data+'123';
				return state;

			case 'extentionName':
				state.extentionName = action.data;
				return state;

			case 'birthdate':
				state.birthdate = action.data;
				return state;

			case 'sex':
				state.sex = action.data;
				return state;

			case 'course':
				state.course = action.data;
				return state;

			case 'yearLevel':
				state.yearLevel = action.data;
				return state;

			case 'section':
				state.section = action.data;
				return state;

			case 'img':
				state.img = action.data;
				return state;

			default:
				throw new Error();
		}
	}

	const [data, dispatch] = useReducer(reducer, state)

	const handler = ()=>{
		setDialogOpen(false);
		setSnackOpen(true);
		axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/register`, data)
		.then((res)=>{
			setAlertMes(res.data.message);
			setAlertStatus(200)
		})
		.catch((err)=>{
			if( err?.response?.data?.message ){
				setAlertMes( err.response.data.message );
				setAlertStatus(403)
			}
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
				<div style={{height:'90%', width:'90%', backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'>
					<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
						<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
							{alertMes}
						</Alert>				
					</Snackbar>
					<div style={{height:'95%',width:'95%', color:'black',border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey"}}>
						<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'90%',width:'100%'}}>
							<div className="d-flex justify-content-start align-items-center" style={{width:'90%',height:'20%'}}>
								<HowToRegIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
								<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Register New Student</p>
							</div>
							<Divider style={{height:'2px', width:'100%', color:'black'}}/>
							<div style={{height:'90%',width:'90%'}} className="d-flex flex-row justify-content-center">
								<div style={{height:'95%',width:'50%'}}>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Student ID:</label>
										<Field className='uNametxt' reqOnChange={(e) => {dispatch({type: 'studentNo', data: e.target.value});}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>First Name:</label>
										<Field className='fName'reqOnChange={(e) => {dispatch({type: 'firstName', data: e.target.value});}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Middle Initial:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'middleInitial', data: e.target.value});}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Last Name:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'lastName', data: e.target.value});}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Name Extention:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'extentionName', data: e.target.value});}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Birth Date</label>
										<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e) => {dispatch({type: 'birthdate', data: e.target.value});}}/>
									</div>
								</div>
								<div style={{height:'100%',width:'50%'}}>			
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<Select className='aRegCourse justify-content-between' Width='100%' width='170px' label='Select Course: ' options={['BSIT','BSCS']} reqOnChange={(e)=>{dispatch({type:'course',data: e.target.value})}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<Select className='aRegYear justify-content-between' Width='100%' width='170px' label='Year Level: ' options={['1','2','3','4']} reqOnChange={(e)=>{dispatch({type:'yearLevel',data: e.target.value})}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<Select className='aRegYear justify-content-between' Width='100%' width='170px' label='Sex: ' options={['Male','Female']} reqOnChange={(e)=>{dispatch({type:'sex',data: e.target.value})}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label>Section:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'section', data: e.target.value});}}/>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label>Date Registered:</label>
										<label>{dateToday}</label>
									</div>
									<div style={{height:'15%',width:'500px'}} className='d-flex justify-content-between align-items-start flex-column'>
										<label>Note: Default password for each account will be last name + 123</label>
										<label>Example: Garcia123</label>
									</div>
									<div style={{height:'15%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<Button title='Register' style={{height:'35px', width:'130px'}} click={handleDialog}/>
										<Dialog
											open={dialogOpen}
									        onClose={handleDialogClose}
									        aria-labelledby="alert-dialog-title"
									        aria-describedby="alert-dialog-description"
										>
											<DialogTitle>
												{"Register New Student"}
											</DialogTitle>
											<DialogContent>
												You won't be able to edit some details in the record, do you wish to proceed?
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
		</>
	);
}