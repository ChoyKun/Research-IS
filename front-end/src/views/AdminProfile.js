import React,{useState, useEffect} from 'react';
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


export default function AdminProfile(props){
	const [adminData, setAdminData] = useState(null);


	useEffect(()=>{
		axios.get('http://localhost:7000/auth-admin/profile')
		.then(res=>{
			console.log( res.data.data );
			setAdminData(res.data.data)
		})
		.catch(err=>{
			console.log(err)
		})
	},[]);

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to="/admin-slist"><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/admin-rlist'><Button className='AdminMenu' title='List of Research'/></Link>
				<Link to='/admin-rlist'><Button className='AdminMenu' title='List of Faculties'/></Link>
				<Link to="/admin-upload"><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to="/admin-reg"><Button className='AdminMenu' title='Register new Adviser'/></Link>
				<Link to="/admin-archive"><Button className='AdminMenu' title='Archived'/></Link>					
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-around align-items-center flex-column'>
						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-start'>
							<div style={{height:'100%',width:'225px', border:'1px solid black'}}> </div>
						</div>
						<div style={{height:'40%',width:'100%',color:'black'}} className='d-flex justify-content-center flex-column'>
							<div className='d-flex flex-row'>
								<label style={{fontSize:'20px'}}>Name:</label>
								<label style={{fontSize:'20px'}}>{adminData?.name}</label>
							</div>
							<div className='d-flex flex-row'>
								<label style={{fontSize:'20px'}}>Position:</label>
								<label style={{fontSize:'20px'}}>{adminData?.position}</label>
							</div>
							<div className='d-flex flex-row'>
								<label style={{fontSize:'20px'}}>ID:</label>
								<label style={{fontSize:'20px'}}>{adminData?.username}</label>
							</div>
							<div className='d-flex flex-row'>
								<label style={{fontSize:'20px'}}>Birthday:</label>
								<label style={{fontSize:'20px'}}>{adminData?.birthday}</label>
							</div>
						</div>
						<div style={{height:'10%',width:'100%'}} className='d-flex justify-content-end align-items-center'>
							<Button style={{height:'50px',width:'100px'}} title='Edit Profile'/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


