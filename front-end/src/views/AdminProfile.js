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
	const [adminData, setAdminData] = useState([]);
	const [name, setName] = useState(null);

	useEffect(()=>{
		axios.get('http://localhost:7000/auth-admin/profile')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.status === 'active' ){
					setAdminData((AdminData) => [...AdminData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])
	console.log(username);
	
	useEffect(() => {
		axios.get(`http://localhost:7000/auth-admin/profile/${username}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, [])

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-around align-items-center flex-column'>
						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-start'>
							<div style={{height:'100%',width:'225px', border:'1px solid black'}}> </div>
						</div>
						<div style={{height:'40%',width:'100%',color:'black'}} className='d-flex justify-content-center flex-column'>
							{adminData?.map?.( object=>(
								<div onClick={() => console.log('clicked')} key={adminData.indexOf(object)} className="d-flex flex-column justify-content-start">
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
							<Link to={`/admin-edit-profile/${username}`}><Button style={{height:'50px',width:'100px'}} title='Edit Profile'/></Link>
							<Link to={`/admin-new-coor/${username}`}><Button style={{height:'50px',width:'100px'}} title='Regiser New Coordinator'/></Link>
							<Link to={`/admin-coor-list/${username}`}><Button style={{height:'50px',width:'100px'}} title='Change Coordinator'/></Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


