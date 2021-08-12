import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

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
	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to='/faculty-slist'><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/faculty-upload'><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to='/faculty-reg'><Button className='AdminMenu' title='Register new Student'/></Link>
				<Link to='/admin-access'><Button className='AdminMenu' title='Archived'/></Link>					
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
				<SearcBar location='/slist-filter'/>		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'80%', width:'90%', backgroundColor:'white', border:'1px solid black'}}>
					
				</div>
			</div>
		</>
	);
}


