import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../modules/config.js';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"

//mui component
import Divider from '@mui/material/Divider';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { green } from '@mui/material/colors';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';




//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function StudentProfile(props){

	const {username} = useParams();
	const [studentData, setStudentData] = useState([]);
	const [name, setName] = useState(null);
	const [pCount, setPCount] = useState(null);
	const [aCount, setACount] = useState(null);
	const [drawerState, setDrawerState] = useState(false);

	const state={
		_currPassword: null,
		_newPassword: null,
		_verNewPassword:null
	}

	function reducer(state, action){
		switch(action.type){
			case '_currPassword':
				state._currPassword=action.data;
				return state;
			case '_newPassword':
				state._newPassword=action.data;
				return state;
			case '_verNewPassword':
				state._verNewPassword=action.data;
				return state;
		}
	}

	const [data, dispatch] = useReducer(reducer,state);

	const handler = ()=>{
		const send = window.confirm("Do you want to update your password?");
		if(send == true){
			axios.put(`http://localhost:7000/student/slist/changepassword/${username}`,data)
			.then((res)=>{
				alert( res.data.message );
			})
			.catch((err)=>{
				alert( err.response.data.message );
			})
		}
		else{
			alert("Operation canceled")
		}
	}

	const changePass = () =>(
		<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'100%', height:'50%',backgroundColor:"#E2F0D9"}}>
			<p style={{fontSize:'25px'}}>Change Password</p>
			<p style={{fontSize:'18px'}}>Only MIS officers are allowed to edit your personal information, you can only update your password</p>
			<div  style={{width:'80%', height:'100px'}}className='d-flex flex-row justify-content-between align-items-center' >
				<TextField style={{width:'300px',height:'50px'}} id="filled-password-input" type='password' label='Current password' variant='filled' onChange={(e)=>{dispatch({type:'_currPassword', data: e.target.value})}}/>
				<TextField style={{width:'300px',height:'50px'}} id="filled-password-input" type='password' label='New password' variant='filled'onChange={(e)=>{dispatch({type:'_newPassword', data: e.target.value})}}/>
				<TextField style={{width:'300px',height:'50px'}} id="filled-password-input" type='password' label='Confirm new password' variant='filled' onChange={(e)=>{dispatch({type:'_verNewPassword', data: e.target.value})}}/>
			</div>
			<div  style={{width:'80%', height:'100px'}}className='d-flex flex-row-reverse justify-content-between align-items-center' >
				<Button title='Save' click={handler} style={{fontSize:'18px',height:'40px', width:'100px'}}/>
			</div>
			
		</div>
	) 

	

	useEffect(()=>{
		axios.get('http://localhost:7000/student/slist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.studentNo === `${username}` ){
					setStudentData((studentData) => [...studentData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])

	useEffect(() => {
		axios.get(`http://localhost:7000/student/slist/${username}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, [])

	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/r-count/${username}`)
		.then(res=>{
			setACount(res.data.aCount);
			setPCount(res.data.pCount);
		})
		.catch(err=>{
			console.log(err);
		})
	},[])

	const toggleDrawer = (open) => (event) => {
		setDrawerState( open );
	}

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-center align-items-center flex-row'>
						<div className='d-flex justify-content-center align-items-center' style={{width:'50%',height:'100%'}}> 
							<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className="d-flex justify-content-center align-items-center" style={{height:'100%', width:'100%'}}>
									<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'90%', width:'90%'}}>
										<img src={scslogo}/>
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										{studentData?.map?.(object=>(
											<div className="d-flex align-items-center justify-content-center flex-column" style={{width:'100%',height:'60%',color:'black'}}>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<BadgeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Name:</label>
													<label style={{fontSize:'20px'}}>{name ?? 'Loading'}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<CakeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Birthday:</label>
													<label style={{fontSize:'20px'}}>{(() => {
																const date = new Date(object.birthdate);
																return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
													</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<SchoolIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Course:</label>
													<label style={{fontSize:'20px'}}>{object.course}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<GradeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Year Level:</label>
													<label style={{fontSize:'20px'}}>{object.yearLevel}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<RoomIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Section:</label>
													<label style={{fontSize:'20px'}}>{object.section}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<CalendarTodayIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Date Registered:</label>
													<label style={{fontSize:'20px'}}> {(() => {
																const date = new Date(object.dateRegistered);
																return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
													</label> 
												</div>
											</div>
										))}
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										<Divider style={{height:'10px', width:'100%'}}/>
										<div className='d-flex flex-row-reverse'style={{width:'100%'}}>
											<Button style={{height:'30px',width:'100px'}} click={toggleDrawer(true)} title='Update'/>
											<Drawer
												anchor={'bottom'}
												open={drawerState}
												onClose={toggleDrawer(false)}
											>
												{changePass()}
											</Drawer>
										</div>
									</div>
								</div>			
							</div>
						</div>
						<div className='d-flex justify-content-center align-items-center flex-column' style={{width:'50%',height:'100%'}}> 
							<div className='d-flex justify-content-center align-items-center flex-column' style={{width:'100%',height:'50%'}}> 
								<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey",color:'black'}}>
									<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%'}}>
										<div className='d-flex justify-content-around align-items-start flex-column' style={{height:'80%', width:'80%'}}>
											<p style={{fontSize:'20px',textAlign:'left'}}>Number of Requested Research</p>
											<Divider style={{height:'2px', width:'100%', color:'black'}}/>
											<div className="d-flex flex-row justify-content-between" style={{width:'90%', height:'15%'}}>
												<div className='d-flex flex-row'>
													<LocalLibraryIcon sx={{color:green[300]}}/>
													<p>Pending requested researches</p>
												</div>
												<p>{pCount}</p>
											</div>
											<div className="d-flex flex-row justify-content-between" style={{width:'90%', height:'15%'}}>
												<div className='d-flex flex-row'>
													<LocalLibraryIcon sx={{color:green[500]}}/>
													<p>Approved requested researches</p>
												</div>
												<p>{aCount}</p>
											</div>
											<Divider style={{height:'2px', width:'100%', color:'black'}}/>
											<div className="d-flex flex-row justify-content-end" style={{width:'90%', height:'15%'}}>
												<Link to={`/student-pending/${username}`}><Button style={{height:'30px',width:'100px'}} title='View List'/></Link>
											</div>
										</div>
										
									</div>
								</div>
							</div>
							<div className='d-flex justify-content-center align-items-center flex-column' style={{width:'100%',height:'50%'}}> 
								<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}



