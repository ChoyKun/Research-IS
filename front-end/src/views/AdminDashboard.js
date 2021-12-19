import React,{useState, useEffect, Suspense, useContext} from 'react';
import { Link, Redirect,useParams} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import "../styles/button.css";

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import FilterContext from '../contexts/filter-context';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';
import Select from '../components/fields/select';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import HBarChart from '../components/charts/HBarChart';




//mui components
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category'
import NumbersIcon from '@mui/icons-material/Numbers'
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import GradeIcon from '@mui/icons-material/Grade';
import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar';
import Visibility from '@mui/icons-material/Visibility';
import MenuIcon from '@mui/icons-material/Menu';


export default function StudentDashboard(props){
	const {username} = useParams();

	const [facultyData, setFacultyData] = useState([]);
	const [hardware, setHardware] = useState(null)
	const [software, setSoftware] = useState(null)
	const [webSys, setWebSys] = useState(null)
	const [gameDev, setGameDev] = useState(null)
	const [aR, setAR] = useState(null)
	const [mobileApp, setMobileApp] = useState(null)
	const [Public , setPublic] = useState(null)
	const [archive , setArchive] = useState(null)
	const [active , setActive] = useState(null)
	const [inactive , setInactive] = useState(null)
	const [name, setName] = useState(null);
	const [image, setImage] = useState(null);


	useEffect(()=>{
		const getFacultyData = async () => {
			axios.get('http://localhost:7000/faculty/flist')
			.then((res)=>{
				res.data.forEach( elem => {
					console.log( elem.status );
					if( elem.status === 'active' ){
						setFacultyData((facultyData) => [...facultyData, elem]);
					}
				})
			})
			.catch((err)=>{
				console.log(err)
			})
		}
		getFacultyData();
	},[]);

	useEffect(()=>{

		axios.get('http://localhost:7000/rlist/archive-count')
		.then((res)=>{
			setPublic(res.data.Public);
			setArchive(res.data.Archive)
		})
		.catch((err)=>{
			console.log(err);
		})

		axios.get('http://localhost:7000/slist/status-count')
		.then((res)=>{
			setActive(res.data.Active);
			setInactive(res.data.Inactive)
		})
		.catch((err)=>{
			console.log(err);
		})

		axios.get('http://localhost:7000/research/rlist/Category-count')
		.then((res)=>{
			setHardware(res.data.hardware)
			setSoftware(res.data.software)
			setWebSys(res.data.webSys)
			setGameDev(res.data.gameDev)
			setAR(res.data.AR)
			setMobileApp(res.data.mobileApp)
		})
		.catch((err)=>{
			console.log(err)
		})



	},[])

	useEffect(() => {
		axios.get(`http://localhost:7000/faculty/flist/${username}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, [])
	
	useEffect(() =>{
		axios.get(`http://localhost:7000/clist/picture`)
		.then( res => {
			setImage( () => res.data.path );			
		})
		.catch( err => {
			console.log( err );
		});
	}, []);


	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-row justify-content-center align-items-center" style={{height:'100%',width:'100%'}}>
						<div className="d-flex flex-column justify-content-around align-items-center" style={{height:'100%',width:'32%'}}>
							<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'45%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
									<Visibility sx={{color:green[500],height:'35px',width:'35px'}}/>
									<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Research Status Ratio</p>
								</div>
								<Divider style={{height:'2px', width:'100%', color:'black'}}/>
								<div style={{width:'90%',height:'60%'}}>
									<HBarChart width='20' height='5' label={['Public','Hidden']} data={[Public,archive]} color={['#4CAF50','#548235']} setLabel={'Research Status'}/>
								</div>
								<div className='d-flex flex-row justify-content-around' style={{width:'90%'}}>
									<Link to={`/admin-rlist/${username}`}><Button style={{height:'30px',width:'100px'}} title='Published'/></Link>
									<Link to={`/admin-archive/${username}`}><Button style={{height:'30px',width:'100px'}} title='Archive'/></Link>
								</div>
							</div>
							<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'45%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
									<CategoryIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
									<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Research Categories</p>
								</div>
								<Divider style={{height:'2px', width:'100%', color:'black'}}/>
								<div style={{width:'90%',height:'70%'}}>
									<PieChart width='20' height='5' label={['Hardware','Software','Web System', 'Game Development', 'Augmented Reality', 'Mobile App']} data={[hardware,software,webSys,gameDev,aR,mobileApp]} color={['#98FB98','#00FF7F','#7FFF00','#4CAF50','#548235','#006400']} setLabel={'Student Year Levels'}/>
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-center align-items-center" style={{height:'95%',width:'32%'}}>
							<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'100%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'90%', width:'90%'}}>
										<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
											<AccountCircleIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
											<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Current MIS Officer</p>
										</div>
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										<Avatar style={{height:'100px',width:'100px'}} src={image}/>
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										{facultyData?.map?.(object=>(
											<div className="d-flex align-items-center justify-content-center flex-column" style={{width:'100%',height:'50%',color:'black'}}>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<BadgeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'17x'}}>Name:</label>
													<label style={{fontSize:'17x'}}>{name ?? 'Loading'}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<CakeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'17x'}}>Birthday:</label>
													<label style={{fontSize:'17x'}}>{(() => {
																const date = new Date(object.birthdate);
																return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
													</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<ContactPhoneIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'17x'}}>Contact No. :</label>
													<label style={{fontSize:'17x'}}>{object.contactNo}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<ContactMailIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'17x'}}>Email:</label>
													<label style={{fontSize:'17x'}}>{object.emailAdd}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<CalendarTodayIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'17x'}}>Date Registered:</label>
													<label style={{fontSize:'17x'}}> {(() => {
																const date = new Date(object.dateRegistered);
																return `${date.getDate()+1}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
													</label> 
												</div>
											</div>
										))}
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										<div className='d-flex flex-row-reverse justify-content-start' style={{width:'100%'}}>
											<Link to={`/admin-current-officer/${username}`}><Button style={{height:'30px',width:'150px'}} title='Officer Profile'/></Link>
										</div>
									</div>
							</div>
						</div>
						<div className="d-flex flex-column justify-content-around align-items-center" style={{height:'100%',width:'32%'}}>
							<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'45%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
									<MenuIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
									<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Menu</p>
								</div>
								<Divider style={{height:'2px', width:'100%', color:'black'}}/>
								<div className='d-flex flex-column justify-content-around align-items-center'  style={{width:'90%',height:'80%'}}>
									<Link to={`/admin-slist/${username}`}><Button style={{height:'30px',width:'200px'}} title="Check Student's List"/></Link>
									<Link to={`/admin-upload/${username}`}><Button style={{height:'30px',width:'200px'}} title='Upload Research'/></Link>
									<Link to={`/admin-request/${username}`}><Button style={{height:'30px',width:'200px'}} title='Check Requests'/></Link>
								</div>
							</div>
							<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'45%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
									<CategoryIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
									<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Student's Status Ratio</p>
								</div>
								<Divider style={{height:'2px', width:'100%', color:'black'}}/>
								<div style={{width:'90%',height:'70%'}}>
									<BarChart width='20' height='5' label={['Activated','Deactivated']} data={[active,inactive]} color={['#4CAF50','#548235']} setLabel={"Student's Status"}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}