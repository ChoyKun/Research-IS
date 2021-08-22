import React,{useState, useEffect, Suspense} from 'react';
import { Link } from 'react-router-dom';
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


export default function FacultyRList(props){

	const [studentData, setStudentData] = useState( null );

	
	useEffect(() => {
		axios.get('http://localhost:7000/student/slist')
		.then( res => {
			setStudentData( res.data );
		})
		.catch( err => {
			console.log( err );
		})
	}, [])

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to='/faculty-slist'><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/faculty-upload'><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to='/faculty-reg'><Button className='AdminMenu' title='Register new Student'/></Link>
				<Link to='/admin-access'><Button className='AdminMenu' title='Archived'/></Link>					
			</div>
			<div style={{height:'15%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='/slist-filter'/>
				<div style={{height:'20%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Link to ='/faculty-edit-student'><Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Edit'/></Link>		
				</div>		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'80%', width:'90%', backgroundColor:'white', border:'1px solid black',color:'black'}}>
					<Suspense fallback={<Loading/>}>
						<SlistHeader/>
						{ studentData?.map?.( object => (
								<div onClick={() => console.log('clicked')} key={studentData.indexOf(object)} className="d-flex bg-secondary flex-row justify-content-around">
									<div className="col-1 text-center">{object.studentNo}</div>
									<div className="col-1 text-center">{object.password}</div>
									<div className="col-1 text-center">{object.firstName}</div>
									<div className="col-1 text-center">{object.middleInitial}</div>
									<div className="col-1 text-center">{object.lastName}</div>
									<div className="col-1 text-center">{object.extentionName ?? "N/A"}</div>
									<div className="col-1 text-center">{(() => {
																	const date = new Date(object.birthdate);
																	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
									</div>
									<div className="col-1 text-center ">{object.course}</div>
									<div className="col-1 text-center">{object.yearLevel}</div>
									<div className="col-1 text-center">{object.section}</div>
									<div className="col-2 text-center">{(() => {
																	const date = new Date(object.dateRegistered);
																	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
									</div>
								</div>			
							)) }
					</Suspense>

				</div>
			</div>
		</>
	);
}

function Loading(props){
	return(
		<div>
			loading
		</div>
	);
}


function SlistHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#4472c4'}} className='d-flex flex-row justify-content-around'> 
			<div className='col-1 text-center'>
				StudentNo
			</div>
			<div className='col-1 text-center'>
				Password
			</div>
			<div className='col-1 text-center'>
				First Name
			</div>
			<div className='col-1 text-center'>
				Middile Initial
			</div>
			<div className='col-1 text-center'>
				Last Name
			</div>
			<div className='col-1 text-center'>
				E. Name
			</div>
			<div className='col-1 text-center'>
				Birth Date
			</div>
			<div className='col-1 text-center'>
				Course
			</div>
			<div className='col-1 text-center'>
				Year level
			</div>
			<div className='col-1 text-center'>
				Section
			</div>
			<div className='col-2 text-center'>
				Date Registered
			</div>
		</div>
	);
}