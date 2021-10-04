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
import Image from '../components/fields/image';
import SearcBar from '../components/contents/SearchBar';


export default function FacultyEditProfile(props){

	const {username} = useParams();

	const state={
		_username:null ,
		_password:null,
		_firstName:null,
		_middleInitial:null,
		_lastName:null,
		_extentionName:null,
		_birthdate:null,
		_dateRegistered:null,
		_img:null,
	}

	const [facultyData, setFacultyData] = useState([]);

	function reducer(state,action){
		switch(action.type){
			case '_username':
				state._username = action.data;
				return state;
			case '_password':
				state._password = action.data;
				return state;
			case '_firstName':
				state._firstName = action.data;
				return state;
			case '_middleInitial':
				state._middleInitial = action.data;
				return state;
			case '_lastName':
				state._lastName = action.data;
				return state;
			case '_extentionName':
				state._extentionName = action.data;
				return state;
			case '_birthdate':
				state._birthdate = action.data;
				return state;
			case '_dateRegistered':
				state._dateRegistered = action.data;
				return state;
			case '_img':
				state._img = action.data;
				return state;
		}
	}

	const [data,dispatch] = useReducer(reducer, state);

	const handler =()=>{
		const send = window.confirm("Do you want to update your profile?");
		if(send == true){
			axios.put(`http://localhost:7000/faculty/flist/editprofile/${username}`, data)
			.then((res)=>{
				alert(res.data.message);
			})
			.catch((err)=>{
				alert(JSON.parse(err.request.response).message);
			})
		}
		else{
			alert("Operation canceled")
		}
		
	}

	useEffect(()=>{
		axios.get('http://localhost:7000/faculty/flist')
		.then(res=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.status === 'active' ){
					setFacultyData((facultyData) => [...facultyData, elem]);
				}
			})
		})
		.catch(err=>{
			console.log(err)
		})
	},[]);

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
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/MIS-slist/${username}`}><Button className='AdminMenu' title='Active Students'/></Link>
				<Link to={`/MIS-inactive-slist/${username}`}><Button className='AdminMenu' title='Inactive Students'/></Link>
				<Link to={`/MIS-reg/${username}`}><Button className='AdminMenu' title='Register New Student'/></Link>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-around flex-column'>
						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-start'>
							<div style={{height:'100%',width:'225px', border:'1px solid black'}}>
								<Image active={true} username={username}/>
							</div>
						</div>
						<div style={{height:'8%',width:'20%'}} className='d-flex justify-content-start'>
							{/*<Image username={username}/>*/}
						</div>
						<div style={{height:'32%',width:'100%',color:'black'}} className='d-flex justify-content-around flex-column'>
							{facultyData?.map?.(object=>(
								<>
									<div style={{width:'100%'}} className='d-flex justify-content-between flex-row'>
										<div style={{width:'50%'}} className='d-flex justify-content-between flex-column'>
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>First Name:</label>
												<Field style={{width:'150px'}} placeHolder={object.firstName} reqOnChange={(e)=>{dispatch({type:'_firstName',data: e.target.value})}}/>
											</div>
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>Middle Initial:</label>
												<Field style={{width:'150px'}} placeHolder={object.middleInitial} reqOnChange={(e)=>{dispatch({type:'_middleInitial',data: e.target.value})}}/>
											</div>
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>Last Name:</label>
												<Field style={{width:'150px'}} placeHolder={object.lastName} reqOnChange={(e)=>{dispatch({type:'_lastName',data: e.target.value})}}/>
											</div>
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>Extention Name:</label>
												<Field style={{width:'150px'}} placeHolder={object.extentionName} reqOnChange={(e)=>{dispatch({type:'_extentionName',data: e.target.value})}}/>
											</div>
										</div>
										<div style={{width:'50%'}} className='d-flex justify-content-between flex-column'>
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>Username:</label>
												<Field style={{width:'180px'}} placeHolder={object.username} reqOnChange={(e)=>{dispatch({type:'_username',data: e.target.value})}}/>
											</div>
											
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>Birthday:</label>
												<label style={{fontSize:'20px'}}>{(() => {
													const date = new Date(object.birthdate);
													return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
												})()}</label>
											</div>
											<div style={{width:'300px'}} className='d-flex justify-content-between'>
												<label style={{fontSize:'20px'}}>Reg. Date:</label>
												<label style={{fontSize:'20px'}}>{(() => {
													const date = new Date(object.dateRegistered);
													return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
												})()}</label>
											</div>
										</div>
									</div>
									
								</>
							))}
						</div>
						<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-end flex-column align-items-center'>
							<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-around'>
								<Field style={{width:'200px',height:'30px'}} placeHolder='password' reqOnChange={(e)=>{dispatch({type:'_password',data: e.target.value})}}/>
							</div>
							<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-around '>
								<Button style={{height:'30px',width:'100px'}} title='Cancel' click={()=>window.history.back()}/>
								<Button style={{height:'30px',width:'150px',backgroundColor:'#595959',color:'white'}} title='Save Changes' click={handler}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


