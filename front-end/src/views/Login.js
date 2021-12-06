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




export default function Login(props){
	const {username} = useParams();
	const [redirect, setRedirect] = useState( null );

	const token = Cookies.get('token');
	const rtoken = Cookies.get('rtoken');


	const state={
		_username: null,
		_password:null,
		_label: 'Student'
	}

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
		axios.post('http://localhost:7000/sign-in', data)
		.then(res=>{
			console.log(res.data);
			Cookies.set('token', res.data.accessToken);
			Cookies.set('rtoken', res.data.refreshToken);

			alert(res.data.message);
			if(res.status == 200 ){
				if(data._label == 'Student'){
					setRedirect( <Redirect to={`/student-rlist/${data._username}`}/> );
				}
				else if(data._label == 'MIS Officer'){
					setRedirect( <Redirect to={`/MIS-slist/${data._username}`}/> );
				}
			}
		})	
		.catch(err=>{
			console.log( err );
			alert(JSON.parse(err.request.response).message);
		})
	}


	return(
		<div className="LoginBG d-flex justify-content-center align-items-center" style={{height:"100%", width:"100%"}}>
			<div className='Login d-flex justify-content-center align-items-center'>
				<div style={{height:"90%",width:"80%",boxShadow:"10px 10px 50px 10px grey"}} className="d-flex flex-row justify-content-center align-items-center">
					<div style={{width:"50%",height:"100%"}}className='login-inputs d-flex flex-column justify-content-center'>
						<div style={{height:"50%"}}className="login-header d-flex justify-content-center align-items-center flex-column">
							<img src={scslogo}/>
							<h5 className="MontFont" style={{width:"270px",textAlign:"center"}}>Sign in to start session</h5>
						</div>
						<div style={{height:"40%"}}className="login-field d-flex flex-column align-items-center justify-content-around">
							<Field className="text-center MontFont" style={{width:"270px"}} placeHolder="Student no." reqOnChange={(e)=>{dispatch({type:'username',data: e.target.value})}}/>
							<Field className="text-center MontFont" style={{width:"270px"}} type="password" placeHolder="Password" reqOnChange={(e)=>{dispatch({type:'password',data: e.target.value})}}/>
							<div className="MontFont" style={{width:"80%"}}>
								<Select width="120px" label='Select Position:'options={['Student','MIS Officer']} reqOnChange={(e)=>{dispatch({type:'label',data: e.target.value})}}/>
							</div>
							<Button className="MontFont button" style={{height:"30px", width:"80%"}} title="Sign in" click={handler}/>
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


