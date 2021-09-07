import React,{useState, useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


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


export default function AdminReg(props){

	const state ={
		username:null ,
		password:null,
		firstName:null,
		middleInitial:null,
		lastName:null,
		extentionName:null,
		birthdate:null,
		dateRegistered:null,
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
			case 'dateRegistered':
				state.dateRegistered = action.data;
				return state;
			case 'img':
				state.img = action.data;
				return state;
		}
	}

	const [data, dispatch] = useReducer(reducer,state)

	const handler = ()=>{
		axios.post('http://localhost:7000/faculty/flist/register',data)
		.catch((err)=>{
			if( err?.response?.data?.message ){
				alert( err.response.data.message );
			}
			alert( err.response.data.message );
		})
	}

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', color:'black'}}>
						<div style={{height:'50%',width:'100%'}} className='d-flex justify-content-center'>
							<div style={{height:'95%',width:'95%'}} className='d-flex flex-column'>
								<div>
									<label style={{fontSize:'20px'}}>Register New Adviser</label>
								</div>
								<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-around align-items-center'>
									<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
										<Field className='uNametxt' reqOnChange={(e)=>{dispatch({type:'username', data:e.target.value})}}/>
										<label style={{fontSize:'18px'}}>Username</label>
									</div>
									<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
										<Field className='Passwordtxt'reqOnChange={(e)=>{dispatch({type:'password', data:e.target.value})}}/>
										<label style={{fontSize:'18px'}}>Password</label>
									</div>
									<Button className='autoGeneratebtn' title='Auto Generate'/>
								</div>
								<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
										<Field className='fName' reqOnChange={(e)=>{dispatch({type:'firstName', data:e.target.value})}} />
										<label style={{fontSize:'18px'}}>First Name</label>
									</div>
									<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
										<Field className='mInitial' reqOnChange={(e)=>{dispatch({type:'middleInitial', data:e.target.value})}}/>
										<label style={{fontSize:'18px'}}>M.I.</label>
									</div>
									<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
										<Field className='lName' reqOnChange={(e)=>{dispatch({type:'lastName', data:e.target.value})}}/>
										<label style={{fontSize:'18px'}}>Last Name</label>
									</div>
									<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-center align-items-center flex-column'>
										<Field className='eName' reqOnChange={(e)=>{dispatch({type:'extentionName', data:e.target.value})}}/>
										<label style={{fontSize:'18px'}}>Name Extention</label>
									</div>
								</div>
							</div>
						</div>
						<div style={{height:'20%',width:'100%'}} className='d-flex flex-row'>
							<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
								<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-center align-items-center flex-column'>
									<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e)=>{dispatch({type:'birthdate', data:e.target.value})}}/>
									<label style={{fontSize:'18px'}}>Birth Date</label>
								</div>
								<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-center align-items-center flex-column'>
									<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e)=>{dispatch({type:'dateRegistered', data:e.target.value})}}/>
									<label>Date Registered</label>
								</div>
							</div>
						</div>
						<div style={{height:'30%',width:'100%'}} className='d-flex flex-row'>
							<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-center'>
								<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-row'>
									<div style={{height:'80%',width:'50%',backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'></div>
									<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-center align-items-center'>
										<Button title='Upload Photo' className='aRegUploadPhoto'/>
									</div>
								</div>
								<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-revers'>
									<Button title='Cancel' click={()=>window.history.back()} className='aRegEdit'/>
									<Button click={handler} title='Register' className='aRegUploadBtn'/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


