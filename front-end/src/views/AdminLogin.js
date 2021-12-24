import React,{useState, useEffect, useReducer} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from '../modules/config.js';


//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png";



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


export default function AdminLogin(props){
	const [adminData, setAdminData] = useState(null)
	const [redirect, setRedirect] = useState( null );
	const [snackOpen, setSnackOpen] =useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);

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
			alert(JSON.parse(err.request.response).message);
		})
	}

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', background:'linear-gradient( to bottom, #a1c7f6, #ffffff)', border:'1px solid black',color:'black'}} className='d-flex justify-content-center align-items-center'>
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
									<Field className='txt' placeHolder="username" reqOnChange={(e)=>{dispatch({type:'username',data:e.target.value})}}/>
									<Field className='txt' type="password" placeHolder="password" reqOnChange={(e)=>{dispatch({type:'password',data:e.target.value})}}/>
									<Button style={{height:'30px',width:'600px'}} title="Sign me in" click={handler}/>
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


