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
import Tooltip from '@mui/material/Tooltip';



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
					setTimeout(()=>{setRedirect( <Redirect to={`/MIS-dashboard/${data._username}`}/> );},2000);
				}
				else if(res.data.role == 'admin'){
					console.log("admin")
					setTimeout(()=>{setRedirect( <Redirect to={`/admin-dashboard/${data._username}`}/> );},2000);
				}
			}

			
		})	
		.catch(err=>{
			console.log( err );
			setAlertMes(JSON.parse(err.request.response).message);
			setAlertStatus(403)
		})
	}




	return(
		<div className="LoginBG d-flex justify-content-center align-items-center" style={{height:"100%", width:"100%"}}>
			<div className='d-flex justify-content-center align-items-center' style={{height:'90%',width:'70%'}}>
				<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
					<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
						{alertMes}
					</Alert>				
				</Snackbar>
				<div style={{height:"90%",width:"80%"}} className="d-flex flex-row justify-content-center align-items-center">
					<div style={{width:"50%",height:"100%"}}className='login-inputs d-flex flex-column justify-content-center'>
						<div style={{height:"50%"}}className="login-header d-flex justify-content-center align-items-center flex-column">
							<img src={scslogo}/>
							<h5 className="MontFont" style={{width:"270px",textAlign:"center",color:'#676e78'}}>Sign in to start session</h5>
						</div>
						<div style={{height:"40%"}}className="login-field d-flex flex-column align-items-center justify-content-around">
							<TextField required id='outlined-required' variant='filled' className="text-center MontFont" style={{width:"270px"}} label="Student no." onChange={(e)=>{dispatch({type:'username',data: e.target.value})}}/>
							<TextField 
								required id='outlined-required' 
								className="text-center MontFont" 
								style={{width:"270px"}} 
								type={showPassword ? "text" : "password"} 
								label="Password"
								variant='filled' 
								onChange={(e)=>{dispatch({type:'password',data: e.target.value})}}
								InputProps={{
									endAdornment:(
										<InputAdornment position="end">
											<Tooltip title='Show Password'>
												<IconButton
													aria-label="toggle password visibility"
													onClick ={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{showPassword ? <Visibility/> : <VisibilityOff/>}
												</IconButton>
											</Tooltip>												
										</InputAdornment>
									)
								}}
							/>
							<Button className="MontFont button" style={{height:"40px", width:"63%",color:'#676e78'}} title="Sign in" click={handler}/>
						</div>
					</div>
					<div style={{width:"50%",height:"100%",backgroundColor:"#E2F0D9"}}className='login-logo d-flex flex-column align-items-center justify-content-center' >						
						<h1 style={{height:'15%',fontFamily: "Garamond, serif",fontWeight: "bold",fontSize:"40px",textAlign:"center",color:"black"}}>SCS Research Information System</h1>
						<div className='d-flex align-items-center flex-column justify-content-center' style={{height:'30%'}}>
							<img style={{height:"170px",width:"170px"}} src={researchimg}/>
						</div>
						<div className='d-flex align-items-center flex-column justify-content-center' style={{height:'25%'}}>
							<p style={{fontFamily: "Dancing Script",fontStyle: "italic",fontSize:"25px",textAlign:"center",color:"#676e78"}}> Your quick stop for research papers </p>
							<p style={{fontFamily: "Dancing Script",fontStyle: "italic",fontSize:"25px",textAlign:"center",color:"#676e78"}}> from SCS department</p>
						</div>
					</div>
				</div>
				{ redirect }
			</div>
		</div>
	);
}


