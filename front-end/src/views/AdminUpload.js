import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
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
import FileUpload from '../components/fields/file-render';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';

//mui Components
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
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';



export default function FacultyUpload(props){
	const {username} = useParams();

	const [snackOpen, setSnackOpen] = useState(false)
	const [alertMes, setAlertMes] = useState(null)
	const [alertStatus, setAlertStatus] = useState(null)
	const [dialogOpen, setDialogOpen] = useState(false);

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
		title: null,
		course: 'BSIT',
		researchCategories: [],
		yearSubmitted: null,
		members: [],
		lead: null,
		mem1: null,
		mem2: null,
		mem3: null,
		mem4: null,
		PDFFile:null,
		status:'public',
		favorites:'false'
	}

	function reducer(state, action){
		console.log(state);
		switch(action.type){
			case 'title':
				state.title = action.data;
				return state;
			case 'course':
				state.course = action.data;
				return state;
			case 'researchCategories':
				if(action.data){
					state.researchCategories.push(action.name);
				}
				else{
					state.researchCategories.splice(state.researchCategories.indexOf(action.name), 1);
				}
				
				return state;
			case 'yearSubmitted':
				state.yearSubmitted = action.data;
				return state;
			case 'lead':
				state.lead = action.data;
				return state;
			case 'mem1':
				state.mem1 = action.data;
				return state;
			case 'mem2':
				state.mem2 = action.data;
				return state;
			case 'mem3':
				state.mem3 = action.data;
				return state;
			case 'mem4':
				state.mem4 = action.data;
				return state;
			case 'PDFFile':
				state.PDFFile = action.data;
				return state;
		}
	}

	const [data,dispatch] = useReducer(reducer,state);

	const handler = ()=>{
		setDialogOpen(false);
		setSnackOpen(true);

		data.researchCategories = JSON.stringify( data.researchCategories );
		console.log(data.members)
		data.members.push(data.lead);
		data.members.push(data.mem1);
		data.members.push(data.mem2);
		data.members.push(data.mem3);
		data.members.push(data.mem4);
		data.members = JSON.stringify( data.members );

		axios.post('http://localhost:7000/research/rlist/upload',data)
		.then((res) => {
			setAlertMes( res.data.message );
			setAlertStatus(200)
			data.researchCategories = JSON.parse( data.researchCategories )
		})
		.catch((err)=>{
			setAlertMes( err.response.data.message );
			setAlertStatus(403)
		})

	}

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}

	const handlePdfUpload = ( path ) => {
		dispatch({ type: 'PDFFile', data: path });
	}

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color: 'black'}} className='d-flex justify-content-center align-items-center flex-column'>
					<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
						<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
							{alertMes}
						</Alert>				
					</Snackbar>
					<div style={{height:'95%',width:'95%', color:'black',border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
						<div style={{height:'100%',width:'100%'}} className='d-flex justify-content-center align-items-center flex-column'>
							<div className="d-flex justify-content-start align-items-center flex-row" style={{width:'90%',height:'20%'}}>
								<LocalLibraryIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
								<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Upload New Research</p>
							</div>
							<Divider style={{height:'2px', width:'100%', color:'black'}}/>
							<div style={{height:'95%',width:'95%'}} className='d-flex justify-content-around align-items-center flex-row'>
								<div className='d-flex justify-content-center align-items-start flex-column' style={{height:'95%',width:'40%'}}>
									<label style={{fontSize:'20px'}}>Add new research</label>
									<div style={{height:'10%',width:'400px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'20px'}}>Title: </label>
										<Field style={{width:'300px'}} reqOnChange={(e)=>(dispatch({type:'title', data: e.target.value }))}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<Select style={{width:'300px'}} label='Select Course:' options={['BSIT','BSCS']} reqOnChange={(e)=>(dispatch({type:'course', data: e.target.value }))} />
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{width:'300px'}}>Year Submitted:</label>
										<Field style={{width:'300px'}} placeHolder='ex. 2001' reqOnChange={(e)=>(dispatch({type:'yearSubmitted', data: e.target.value }))}/>
									</div>
									<label style={{fontSize:'20px'}}>Group Members</label>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Leader:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'lead', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Member 1:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem1', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Member 2:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem2', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Member 3:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem3', data: e.target.value});}}/>
									</div>
									<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
										<label style={{fontSize:'18px'}}>Member 4:</label>
										<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem4', data: e.target.value});}}/>
									</div>
								</div>
								<div style={{height:'95%',width:'40%'}} className="d-flex flex-column justify-content-around align-items-center">
									<div style={{height: '90%', width: '100%'}} className="py-4 d-flex flex-row justify-content-around align-items-center">
										<div style={{height:'100%',width:'200px'}} className="d-flex flex-column justify-content-center align-items-center">
											<label style={{fontSize:'18px'}}>Research Categories</label>
											<div style={{height:'90%',width:'100%',backgroundColor:'white',border:'1px solid black'}} className='px-3 d-flex flex-column justify-content-around'>
												<Checkbox cLabel='Hardware' value='Hardware' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Hardware', data: e.target.checked }))}/>
												<Checkbox cLabel='Software' value='Software' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Software', data: e.target.checked }))}/>
												<Checkbox cLabel='Web System' value='Web System' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Web System', data: e.target.checked }))}/>
												<Checkbox cLabel='Game Dev' value='Game Dev' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Game Dev', data: e.target.checked }))}/>
												<Checkbox cLabel='Augmented Reality' value='Augmented Reality' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Augmented Reality', data: e.target.checked }))}/>
												<Checkbox cLabel='Mobile App'value='Mobile App' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Mobile App', data: e.target.checked }))} />
											</div>
										</div>
										<div style={{height:'100%',width:'200px'}} className='d-flex flex-column'>
											<FileUpload active={true} title={data.title} fileCatcher={handlePdfUpload}/>
										</div>
									</div>
									<div style={{height:'10%',width:'200px'}} className='d-flex flex-column'>
										<Button click={handleDialog} style={{height:'30px',width:'130px'}} title='Upload'/>
										<Dialog
											open={dialogOpen}
									        onClose={handleDialogClose}
									        aria-labelledby="alert-dialog-title"
									        aria-describedby="alert-dialog-description"
										>
											<DialogTitle>
												{"Register New Officer"}
											</DialogTitle>
											<DialogContent>
												The previous officer's account will be deactivated, do you wish to proceed?
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