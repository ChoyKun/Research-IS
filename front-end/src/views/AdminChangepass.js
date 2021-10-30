import React,{useState, useEffect, useReducer} from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from '../modules/config.js';


//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";

//Styles
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';

export default function StudentChangePass(props){

	const {username} = useParams();

	const state = {
		_currPassword:null,
		_newPassword:null,
		_verPassword:null,
	}

	function reducer(state,action){
		console.log( state );
		switch(action.type){
			case '_currPassword':
				state._currPassword=action.data;
				return state;
			case '_newPassword':
				state._newPassword=action.data;
				return state;
			case '_verPassword':
				state._verPassword=action.data;
				return state;
		}
	}

	const [data, dispatch] = useReducer(reducer, state);

	const handler=()=>{
		const send = window.confirm("Do you want to change password?");
		if(send == true){
			axios.put(`http://localhost:7000/auth-admin/changepassword/${username}`,data)
			.then((res)=>{
				alert(res.data.message);
			})
			.catch((err)=>{
				alert( err.response.data.message );
			})
		}
		else{
			alert("Operation canceled")
		}
		
	}

	return(
		<>
			<div style={{height:'100%',width:'100%'}} className='d-flex flex-column justify-content-center align-items-center'>
				<div style={{height:'10%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
					<h2>Change Password</h2>				
				</div>
				<div style={{height:'90%', width:'90%', color:'black',backgroundColor:'white', border:'1px solid black'}} className='d-flex  flex-column justify-content-center align-items-center'>
					<div style={{height:'70%', width:'100%'}} className='d-flex justify-content-center flex-column'>
						<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
							<h3 >Current Password</h3>
							<Field style={{width:'100%'}} reqOnChange={(e)=>{dispatch({type:'_currPassword', data: e.target.value})}}/>
						</div>
						<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
							<h3 >New Password</h3>
							<Field style={{width:'100%'}} reqOnChange={(e)=>{dispatch({type:'_newPassword', data: e.target.value})}}/>
						</div>
						<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
							<h3 >Re-Enter Password</h3>
							<Field style={{width:'100%'}} reqOnChange={(e)=>{dispatch({type:'_verPassword', data: e.target.value})}}/>
						</div>
					</div>
					<div style={{height:'20%', width:'100%'}} className='d-flex align-items-center justify-content-center'>
						<Button style={{height:'50px',width:'200px'}} title='Save Changes' click={handler}/>
					</div>
				</div>
			</div>

		</>
	);
}


