import React,{useState, useEffect, useReducer} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from '../modules/config.js';


//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock1.png";



//style
import '../styles/button.css'
import '../styles/login.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';

//mui components
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function AdminLogin(props){
	const [adminData, setAdminData] = useState(null)
	const [redirect, setRedirect] = useState( null );
	const [snackOpen, setSnackOpen] =useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = () => setShowPassword(!showPassword)


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

	const state={
		_username:null,
		_password:null
	}

	function reducer(state,action){
		switch(action.type){
			case 'username':
				state._username = action.data;
				return state;
			case 'password':
				state._password = action.data;
				return state;
		}
	}

	// wait parang nagegets ko na WAHHAAHHA ung saving lang problem paps, d kase nagsesave as 'active' ung selected coor kaya walang active coor
	
	const [data, dispatch] = useReducer(reducer, {});

	const handler= ()=>{
		setSnackOpen(true)
		
		axios.post('http://localhost:7000/auth-admin',data)
		.then((res)=>{
			if(res.status == 200 ){
				setAlertMes(res.data.message);
				setAlertStatus('good');
				setTimeout(()=>{setRedirect( <Redirect to={`/admin-dashboard/${data._username}`}/> );},2000);	
				
			}
			
		})
		.catch((err)=>{
			setAlertMes(JSON.parse(err.request.response).message);
			setAlertStatus(403);
		})
	}

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', background:'linear-gradient( to bottom, #548235,#e2f0d9)', border:'1px solid black',color:'black',borderRadius:'10px'}} className='d-flex justify-content-center align-items-center'>
						<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
							<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
								{alertMes}
							</Alert>				
						</Snackbar>
						<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
							<div style={{height:'50%',width:'100%'}} className="p-3 d-flex justify-content-around align-items-center flex-column">
								<img src={lock} style={{height:"150px"}}/>
								<h1 style={{fontSize:'40px'}}>Research Coordinator Login</h1>
							</div>
							<div style={{height:'100%',width:'100%'}} className="d-flex flex-column justify-content-around">
								<div style={{height:'70%',width:'100%'}} className="login-field d-flex flex-column align-items-center justify-content-around flex-column">
									<TextField required id='outlined-required' variant='filled' className="text-center MontFont" style={{backgroundColor:'white',width:"500px"}} label="Username" onChange={(e)=>{dispatch({type:'username',data: e.target.value})}}/>
									<TextField
										variant='filled'
										required id='outlined-required' 
										className="text-center MontFont" 
										style={{backgroundColor:'white',width:"500px"}} 
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
									<Button style={{height:'30px',width:'600px'}} title="Sign in" click={handler}/>
									<Link to='/admin-access'><Button style={{height:'30px',width:'600px'}} title="Go Back" /></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				{redirect}
			</div>
		</>
	);
}


