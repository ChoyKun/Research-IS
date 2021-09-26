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
		const send = window.confirm("Registering new MIS Officer will disable the current officer's account Are you sure you want to continue?");
		if(send == true){
			axios.post('http://localhost:7000/faculty/flist/register',data)
			.then((res)=>{
				axios.put('http://localhost:7000/faculty/flist/new-officer')
				.then((res)=>{
					alert(res.data.message);
				})
				.catch((err)=>{
					if( err?.response?.data?.message ){
						alert( err.response.data.message );
					}
				})
			})
			.catch((err)=>{
			alert(err.response.data.message);
		})
		}
		else{
			alert("Operation canceled")
		}
	}

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Register New Officer</h2>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', color:'black'}}>
						<div style={{height:'90%',width:'90%'}} className="d-flex flex-row justify-content-center">
							<div style={{height:'95%',width:'50%'}}>
								<div style={{height:'150px',width:'170px',backgroundColor:'white', border:'1px solid black' }}>
									
								</div>
								<Field title='Upload Photo' type="file" accepts="image/*" className='aRegUploadPhoto'/>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Username:</label>
									<Field className='uNametxt' reqOnChange={(e) => {dispatch({type: 'username', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Password:</label>
									<Field className='Passwordtxt' reqOnChange={(e) => {dispatch({type: 'password', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>First Name:</label>
									<Field className='fName'reqOnChange={(e) => {dispatch({type: 'firstName', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Middle Initial:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'middleInitial', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Last Name:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'lastName', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Name Extention:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'extentionName', data: e.target.value});}}/>
								</div>
							</div>
							<div style={{height:'100%',width:'50%'}}>
								<div style={{height:'150px',width:'170px'}}>
									
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Birth Date</label>
									<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e) => {dispatch({type: 'birthdate', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label>Date Registered:</label>
									<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e) => {dispatch({type: 'dateRegistered', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<Button title='Cancel' className='crDecline' click={()=>window.history.back()}/>
									<Button title='Register' className='aRegUploadBtn' click={handler}/>
								</div>
							</div>						
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


