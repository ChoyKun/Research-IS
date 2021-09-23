import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

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


export default function FacultyReg(props){
	const {username} = useParams();

	const state = {
		studentNo : null,
		password : null,
		firstName:  null,
		middleInitial:  null,
		lastName: null,
		extentionName: null,
		birthdate: null,
		course: 'BSIT',
		yearLevel: '1',
		section: null,
		dateRegistered: null,
		img: null,
		favorites: [],
		status:'active'
	}


	function reducer( state, action ){
		console.log( state );
		switch( action.type ){
			case 'studentNo':
				state.studentNo = action.data;
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

			case 'course':
				state.course = action.data;
				return state;

			case 'yearLevel':
				state.yearLevel = action.data;
				return state;

			case 'section':
				state.section = action.data;
				return state;

			case 'dateRegistered':
				state.dateRegistered = action.data;
				return state;

			case 'img':
				state.img = action.data;
				return state;

			default:
				throw new Error();
		}
	}

	const [data, dispatch] = useReducer(reducer, state)

	const handler = ()=>{
		axios.post('http://localhost:7000/student/slist/register', data)
		.catch((err)=>{
			if( err?.response?.data?.message ){
				alert( err.response.data.message );
			}
		})
	}


	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#385723', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Register New Student</h2>				
			</div>
			<div style={{height:'10%', width:'100%'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/MIS-slist/${username}`}><Button className='AdminMenu' title='Active Students'/></Link>
				<Link to={`/MIS-inactive-slist/${username}`}><Button className='AdminMenu' title='Inactive Students'/></Link>
				<Link to={`/MIS-reg/${username}`}><Button className='AdminMenu' title='Register New Student'/></Link>					
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'100%',width:'100%', color:'black'}} className="d-flex flex-column justify-content-center">
								<div style={{height:'100%',width:'100%'}} className="d-flex flex-row justify-content-center">
									<div style={{height:'95%',width:'50%'}}>
										<div style={{height:'150px',width:'170px',backgroundColor:'white', border:'1px solid black' }}>
											
										</div>
										<Field title='Upload Photo' type="file" accepts="image/*" className='aRegUploadPhoto'/>
										<div style={{height:'10%',width:'50%'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label style={{fontSize:'18px'}}>Student ID:</label>
											<Field className='uNametxt' reqOnChange={(e) => {dispatch({type: 'studentNo', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'150px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label style={{fontSize:'18px'}}>Password:</label>
											<Field className='Passwordtxt' reqOnChange={(e) => {dispatch({type: 'password', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label style={{fontSize:'18px'}}>First Name:</label>
											<Field className='fName'reqOnChange={(e) => {dispatch({type: 'firstName', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label style={{fontSize:'18px'}}>Middle Initial:</label>
											<Field className='mInitial' reqOnChange={(e) => {dispatch({type: 'middleInitial', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label style={{fontSize:'18px'}}>Last Name:</label>
											<Field className='lName' reqOnChange={(e) => {dispatch({type: 'lastName', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label style={{fontSize:'18px'}}>Name Extention:</label>
											<Field className='eName' reqOnChange={(e) => {dispatch({type: 'extentionName', data: e.target.value});}}/>
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
											<Select className='aRegCourse' label='Select Course:' options={['BSIT','BSCS']} reqOnChange={(e)=>{dispatch({type:'_course',data: e.target.value})}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<Select className='aRegYear' label='Year Level' options={['1','2','3','4']} reqOnChange={(e)=>{dispatch({type:'_yearLevel',data: e.target.value})}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label>Section:</label>
											<Field className='aRegSection' reqOnChange={(e) => {dispatch({type: 'section', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
											<label>Date Registered:</label>
											<Field type='date' placeHolder='Enter Date Here' reqOnChange={(e) => {dispatch({type: 'dateRegistered', data: e.target.value});}}/>
										</div>
										<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
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


// <div style={{height:'95%', width:'95%', color:'black'}}>
// 						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-center'>
// 							<div style={{height:'95%',width:'95%'}} className='d-flex flex-column'>
// 								<div>
// 									<label style={{fontSize:'20px'}}>Register	New User</label>
// 								</div>
// 								<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-around align-items-center'>
// 									<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 										
// 										<label style={{fontSize:'18px'}}>Student ID</label>
// 									</div>
// 									<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 										
// 										<label style={{fontSize:'18px'}}>Password</label>
// 									</div>
// 									<Button className='autoGeneratebtn' title='Auto Generate'/>
// 								</div>
// 								<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
// 									<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 										
// 										<label style={{fontSize:'18px'}}>First Name</label>
// 									</div>
// 									<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 										
// 										<label style={{fontSize:'18px'}}>M.I.</label>
// 									</div>
// 									<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 										
// 										<label style={{fontSize:'18px'}}>Last Name</label>
// 									</div>
// 									<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 										
// 										<label style={{fontSize:'18px'}}>Name Extention</label>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 						<div style={{height:'30%',width:'100%'}} className='d-flex flex-row'>
// 							<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
// 								<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 									
// 									<label style={{fontSize:'18px'}}>Birth Date</label>
// 								</div>
// 								<div style={{height:'100%',width:'70%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 									<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
// 										<div style={{height:'30%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
// 											<Select className='aRegCourse' label='Select Course:' options={['BSIT','BSCS']} reqOnChange={(e) => {
// 																						dispatch({type: 'course', data: e.target.value});
// 																					}}/>
// 											<Select className='aRegYear' label='Year Level' options={['1','2','3','4']} reqOnChange={(e) => {
// 																						dispatch({type: 'yearLevel', data: e.target.value});
// 																					}}/>
// 											<label>Section</label>
// 											
// 										</div>
// 										<div style={{height:'70%',width:'100%'}} className='d-flex justify-content-center align-items-center flex-column'>
// 											
// 											<label>Date Registered</label>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 						<div style={{height:'30%',width:'100%'}} className='d-flex flex-row'>
// 							<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-center'>
// 								<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-row'>
// 									<div style={{height:'80%',width:'50%',backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
										
// 									</div>
// 									<div style={{height:'100%',width:'60%'}} className='d-flex justify-content-center align-items-center'>
// 										<Field title='Upload Photo' type="file" accepts="image/*" className='aRegUploadPhoto'/>
// 									</div>
// 								</div>
// 								<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-revers'>
// 									<Button click={handler} title='Register' className='aRegUploadBtn'/>
// 								</div>
// 							</div>
// 						</div>
// 					</div>