import React,{useState, useEffect, useReducer} from 'react';
import scslogo from "../images/scs-final.png";
import '../styles/login.css';
import Field from '../components/fields/txtfield';
import Button from '../components/buttons/button'
import Select from '../components/fields/select';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


export default function Login(props){
	const [redirect, setRedirect] = useState( null );

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
			console.log(res.data.message);
			console.log(data._label);
			if(res.status == 200 ){
				if(data._label == 'Student'){
					setRedirect( <Redirect to={`/student-rlist/${data._username}`}/> );
				}
				else if(data._label == 'Adviser'){
					setRedirect( <Redirect to={`/faculty-slist/${data._username}`}/> );
				}
			}
		})	
		.catch(err=>{
			console.log( err.response.data.message );
			console.log(err);
		})
	}


	return(
		<div className='Login d-flex justify-content-center align-items-center'>
			<div className='login-bg' >
				<div className='login-logo d-flex flex-column align-items-center justify-content-center' >
					<img src={scslogo}/>
					<h1>SCS Research Portal</h1>
				</div>
				<div className='login-inputs d-flex flex-column align-items-center justify-content-center'>
					<div className="login-header d-flex justify-content-center align-items-center">
						<h5>Sign in to start session</h5>
					</div>
					<div className="login-field d-flex flex-column align-items-center justify-content-between">
						<Field className='username' placeHolder="student no." reqOnChange={(e)=>{dispatch({type:'username',data: e.target.value})}}/>
						<Field className='password' placeHolder="password" reqOnChange={(e)=>{dispatch({type:'password',data: e.target.value})}}/>
						<div style={{width:"80%"}}>
							<Select className="login-select" label='Select Position:'options={['Student','Adviser']} reqOnChange={(e)=>{dispatch({type:'label',data: e.target.value})}}/>
						</div>
						<Button className="login-button" title="Sign me in" click={handler}/>
					</div>
				</div>
			</div>
			{ redirect }
		</div>
	);
}


