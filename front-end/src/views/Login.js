import React,{useState, useEffect, useReducer} from 'react';
import scslogo from "../images/scs-final.png";
import '../styles/login.css';
import Field from '../components/fields/txtfield';
import Button from '../components/buttons/button'
import Select from '../components/fields/select';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from '../modules/config.js';
import Cookies from 'js-cookie';
import researchimg from "../images/researchImg.jfif";
import rlist from "../images/rlist.png"
import lock from "../images/lock.png"
import favorites from "../images/heart.png";
import "../styles/button.css"

//mui components
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';




export default function Login(props){
	const {username} = useParams();
	const [redirect, setRedirect] = useState( null );
	const [showPassword, setShowPassword] = useState(false);
	const [snackOpen, setSnackOpen] =useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [dialogMes, setDialogMes] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	const token = Cookies.get('token');
	const rtoken = Cookies.get('rtoken');


	const state={
		_username: null,
		_password:null,
		_label: 'Student'
	}

	const handleSnack = () =>{
		setSnackOpen(true);
	}

	const handleSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setSnackOpen(false);
		setAlertMes(null);
		setAlertStatus(null);
	}

	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = () => setShowPassword(!showPassword)

	function reducer(state, action){
		switch(action.type){
			case "username":
				state._username=action.data;
				return state;
			case "password":
				state._password=action.data;
				return state;
			case "label":
				state._label=action.data;
				return state;
			default:
				throw new Error(`Unknown action type: ${action.type}`);
		}

	}

	const [data, dispatch] = useReducer(reducer,state)

	const handler=()=>{
		setSnackOpen(true)

		axios.post('http://localhost:7000/sign-in', data)
		.then(res=>{

			setAlertMes(res.data.message);
			setAlertStatus('good');

			console.log(res.data);
			Cookies.set('token', res.data.accessToken);
			Cookies.set('rtoken', res.data.refreshToken);		

			if(res.status == 200 ){
				if(res.data.role == 'student'){
					console.log("student")
					setTimeout(()=>{setRedirect( <Redirect to={`/student-dashboard/${data._username}`}/> );},2000);	
				}
				else if(res.data.role == 'mis officer'){
					console.log("Officer")
					setTimeout(()=>{setRedirect( <Redirect to={`/MIS-slist/${data._username}`}/> );},2000);
				}
			}

			
		})	
		.catch(err=>{
			console.log( err );
			setAlertMes(JSON.parse(err.request.response).message);
			setAlertStatus(403)
		})
	}

	console.log(alertStatus)
	console.log(alertMes)



	return(
		<div className="LoginBG d-flex justify-content-center align-items-center" style={{height:"100%", width:"100%"}}>
			<div className='Login d-flex justify-content-center align-items-center'>
				<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
					<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
						{alertMes}
					</Alert>				
				</Snackbar>
				<div style={{height:"90%",width:"80%",boxShadow:"10px 10px 50px 10px grey"}} className="d-flex flex-row justify-content-center align-items-center">
					<div style={{width:"50%",height:"100%"}}className='login-inputs d-flex flex-column justify-content-center'>
						<div style={{height:"50%"}}className="login-header d-flex justify-content-center align-items-center flex-column">
							<img src={scslogo}/>
							<h5 className="MontFont" style={{width:"270px",textAlign:"center"}}>Sign in to start session</h5>
						</div>
						<div style={{height:"40%"}}className="login-field d-flex flex-column align-items-center justify-content-around">
							<TextField required id='outlined-required' className="text-center MontFont" style={{width:"270px"}} label="Student no." onChange={(e)=>{dispatch({type:'username',data: e.target.value})}}/>
							<TextField 
								required id='outlined-required' 
								className="text-center MontFont" 
								style={{width:"270px"}} 
								type={showPassword ? "text" : "password"} 
								label="Password" 
								onChange={(e)=>{dispatch({type:'password',data: e.target.value})}}
								InputProps={{
									endAdornment:(
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick ={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility/> : <VisibilityOff/>}
											</IconButton>
												
										</InputAdornment>
									)
								}}
							/>
							<Button className="MontFont button" style={{height:"40px", width:"80%"}} title="Sign in" click={handler}/>
						</div>
					</div>
					<div style={{width:"50%",height:"100%",backgroundColor:"#E2F0D9"}}className='login-logo d-flex flex-column align-items-center justify-content-center' >						
						<h1 style={{fontFamily: "Garamond, serif",fontWeight: "bold",fontSize:"40px",textAlign:"center",color:"black"}}>SCS Research Information System</h1>
						<img style={{height:"170px",width:"170px"}} src={researchimg}/>
						<p style={{fontFamily: "Dancing Script",fontStyle: "italic",fontSize:"25px",textAlign:"center",color:"black"}}> You're quick stop on research papers from SCS department</p>
						<div style={{width:"60%"}}className="d-flex flex-row justify-content-between align-items-center">
							<div style={{width:"30px"}} className="d-flex flex-row justify-content-center align-items-center">
								<img style={{height:"30px"}}src={rlist}/>
								<h1 style={{fontFamily: "Monserrat",fontSize:"15px",textAlign:"center",color:"black"}}>View Research</h1>
							</div>
							<div style={{width:"30px"}} className="d-flex flex-row justify-content-center align-items-center">
								<img style={{height:"30px"}}src={favorites}/>
								<h1 style={{fontFamily: "Monserrat",width:"30px",fontSize:"15px",textAlign:"center",color:"black"}}>Search Easier</h1>
							</div>
							<div style={{width:"30px"}} className="d-flex flex-row justify-content-center align-items-center">
								<img style={{height:"30px"}}src={lock}/>
								<h1 style={{fontFamily: "Monserrat",width:"30px",fontSize:"15px",textAlign:"center",color:"black"}}>Request Permision</h1>
							</div>
						</div>
					</div>
				</div>
				{ redirect }
			</div>
		</div>
	);
}


