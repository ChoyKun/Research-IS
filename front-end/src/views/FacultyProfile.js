import React,{useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
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


export default function FacultyProfile(props){
	const {username} = useParams();
	const [facultyData, setFacultyData] = useState([]);
	const [name, setName] = useState(null);

	useEffect(()=>{
		axios.get('http://localhost:7000/faculty/flist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.username === `${username}` ){
					setFacultyData((FacultyData) => [...FacultyData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])
	console.log(username);
	
	useEffect(() => {
		axios.get(`http://localhost:7000/faculty/flist/${username}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, [])

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/faculty-slist/${username}`}><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to={`/faculty-upload/${username}`}><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to={`/faculty-reg/${username}`}><Button className='AdminMenu' title='Register new Student'/></Link>
				<Link to={`/admin-access/${username}`}><Button className='AdminMenu' title='Archived'/></Link>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-around align-items-center flex-column'>
						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-start'>
							<div style={{height:'100%',width:'225px', border:'1px solid black'}}> </div>
						</div>
						<div style={{height:'40%',width:'100%',color:'black'}} className='d-flex justify-content-center flex-column'>
							{facultyData?.map?.( object=>(
								<div onClick={() => console.log('clicked')} key={facultyData.indexOf(object)} className="d-flex flex-column justify-content-start">
									<div style={{height:'40%',width:'50%'}} className='d-flex flex-row justify-content-start'>
										<label style={{fontSize:'20px'}}>Name:</label>
										<label style={{fontSize:'20px'}}>{name ?? 'Loading'}</label> 
									</div>
									<div style={{height:'40%',width:'50%'}} className='d-flex flex-row justify-content-start'>
										<label style={{fontSize:'20px'}}>Birthday:</label>
										<label style={{fontSize:'20px'}}>{(() => {
													const date = new Date(object.birthdate);
													return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
												})()}</label> 
									</div>
									<div style={{height:'40%',width:'50%'}} className='d-flex flex-row justify-content-start'>
										<label style={{fontSize:'20px'}}>Date Registered:</label>
										<label style={{fontSize:'20px'}}> {(() => {
													const date = new Date(object.dateRegistered);
													return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
												})()}
										</label> 
									</div>
								</div>
							))}
						</div>
						<div style={{height:'10%',width:'100%'}} className='d-flex justify-content-end align-items-center'>
							<Link to={`/faculty-edit-profile/${username}`}><Button style={{height:'50px',width:'100px'}} title='Edit Profile'/></Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


