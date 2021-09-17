import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
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


export default function FacultyEditProfile(props){
	const {username, studentNo} = useParams();

	const [studentData, setStudentData] = useState([]);

	const state={
		_password: null,
		_firstName: null,
		_middleInitial: null,
		_lastName:null,
		_extentionName:null,
		_birthdate:null,
		_course: null, // 
		_yearLevel:null,
		_section:null,
		_img:null,
	}

	function reducer(state,action){
		switch(action.type){
			case '_password':
				state._password=action.data;
				return state;
			case '_firstName':
				state._firstName=action.data;
				return state;
			case '_middleInitial':
				state._middleInitial=action.data;
				return state;
			case '_lastName':
				state._lastName=action.data;
				return state;
			case '_extentionName':
				state._extentionName=action.data;
				return state;
			case '_birthdate':
				state._birthdate=action.data;
				return state;
			case '_course':
				state._course=action.data;
				return state;
			case '_yearLevel':
				state._yearLevel=action.data;
				return state;
			case '_section':
				state._section=action.data;
				return state;

		}
	}

	const [data, dispatch] = useReducer(reducer,state);

	const handler=()=>{
		axios.put(`http://localhost:7000/faculty/flist/editstudent/${username}/${studentNo}`,data)
		.catch((err)=>{
			alert( err.response.data.message );
		})
	}
	useEffect(() => {
		axios.get('http://localhost:7000/student/slist')
		.then( res => {
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.studentNo === studentNo ){
					setStudentData((studentData) => [...studentData, elem]);

					
				}
			})
		})
		.catch( err => {
			console.log( err );
		})
	}, []);



	const getDateFrom = ( dateString ) => {
    	const date = new Date( dateString );



		const year = date.getFullYear();
		const month = date.getMonth().toString().length < 2 ? `0${date.getMonth().toString()}` : date.getMonth();
		const day = date.getDay().toString().length < 2 ? `0${date.getDay().toString()}` : date.getDay();

		const formated = `${year}-${month}-${day}`;

		return formated;
    }

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#385723', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Edit Profile</h2>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%', color:'black'}}>
						{studentData?.map?.(object =>(
							<div style={{height:'100%',width:'100%'}} key={studentData.indexOf(object)} className="d-flex flex-column justify-content-start">
								<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-center'>
									<div style={{height:'95%',width:'95%'}} className='d-flex flex-column'>
										<div>
											<label style={{fontSize:'20px'}}>Register	New User</label>
										</div>
										<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-around align-items-center'>
											<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<label>{object.studentNo}</label>
												<label style={{fontSize:'18px'}}>Student ID</label>
											</div>
											<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<label>{object.password}</label>
												<label style={{fontSize:'18px'}}>Password</label>
											</div>
										</div>
										<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
											<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='fName' placeHolder={object.firstName} reqOnChange={(e)=>{dispatch({type:'_firstName',data: e.target.value})}}/>
												<label style={{fontSize:'18px'}}>First Name</label>
											</div>
											<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='mInitial' placeHolder={object.middleInitial} reqOnChange={(e)=>{dispatch({type:'_middleInitial',data: e.target.value})}}/>
												<label style={{fontSize:'18px'}}>M.I.</label>
											</div>
											<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='lName'  placeHolder={object.lastName} reqOnChange={(e)=>{dispatch({type:'_lastName',data: e.target.value})}}/>
												<label style={{fontSize:'18px'}}>Last Name</label>
											</div>
											<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='eName' placeHolder={object.nameExtention} reqOnChange={(e)=>{dispatch({type:'_nameExtention',data: e.target.value})}}/>
												<label style={{fontSize:'18px'}}>Name Extention</label>
											</div>
										</div>
									</div>
								</div>
								<div style={{height:'30%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
										<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-center align-items-center flex-column'>
											<Field type='date' value={getDateFrom(object.birthdate)} reqOnChange={(e)=>{dispatch({type:'_birthdate',data: e.target.value})}}/>
											<label style={{fontSize:'18px'}}>Birth Date</label>
										</div>
										<div style={{height:'100%',width:'70%'}} className='d-flex justify-content-center align-items-center flex-column'>
											<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
												<div style={{height:'30%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
													<Select className='aRegCourse' label='Select Course:' options={['BSIT','BSCS']} selected={object.course} reqOnChange={(e)=>{dispatch({type:'_course',data: e.target.value})}}/>
													<Select className='aRegYear' label='Year Level' options={['1','2','3','4']} selected={object.yearLevel} reqOnChange={(e)=>{dispatch({type:'_yearLevel',data: e.target.value})}}/>
													<label>Section</label>
													<Field className='aRegSection' placeHolder={object.section} reqOnChange={(e)=>{dispatch({type:'_section',data: e.target.value})}}/>
												</div>
												<div style={{height:'70%',width:'100%'}} className='d-flex justify-content-center align-items-center flex-column'>
													<label>{getDateFrom(object.dateRegistered)}</label>
													<label>Date Registered</label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div style={{height:'30%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-center'>
										<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-row'>
											<div style={{height:'80%',width:'50%',backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
												
											</div>
											<div style={{height:'100%',width:'60%'}} className='d-flex justify-content-center align-items-center'>
												<Field title='Upload Photo' type="file" accepts="image/*" className='aRegUploadPhoto'/>
											</div>
										</div>
										<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-around align-items-center flex-column'>
											<Field style={{width:'200px'}} placeHolder='Enter password to confirm' reqOnChange={(e)=>{dispatch({type:'_password',data: e.target.value})}}/>
											<div style={{height:'60%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
												<Button title='Cancel' className='aRegUploadBtn' click={()=>window.history.back()}/>
												<Button title='Update' className='aRegUploadBtn' click={handler}/>
											</div>
										</div>	
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}


