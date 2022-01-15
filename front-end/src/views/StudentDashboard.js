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


export default function StudentDashboard(props){
	const {username} = useParams();

	const [researchData, setResearchData] = useState([]);
	const [hardware, setHardware] = useState(null)
	const [software, setSoftware] = useState(null)
	const [webSys, setWebSys] = useState(null)
	const [gameDev, setGameDev] = useState(null)
	const [aR, setAR] = useState(null)
	const [mobileApp, setMobileApp] = useState(null)
	const [bsit, setBsit] =useState(null)
	const [bscs, setBscs] =useState(null);
	const [total, setTotal] = useState(null);


	useEffect(()=>{
		const getResearchList = async () => {
			axios.get('http://localhost:7000/research/rlist')
			.then((res)=>{
				res.data.forEach( elem => {
					console.log( elem.status );
					if( elem.status === 'public' ){
						setResearchData((researchData) => [...researchData, elem]);
					}
				})
			})
			.catch((err)=>{
				console.log(err)
			})
		}
		getResearchList();
	},[]);

	useEffect(()=>{
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

	useEffect(()=>{
		axios.get('http://localhost:7000/research/rlist/course-count')
		.then((res)=>{
			setBsit(res.data.BSIT)
			setBscs(res.data.BSCS)
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])
	


	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-row justify-content-center align-items-center" style={{height:'100%',width:'100%'}}>
						<div className='d-flex flex-column justify-content-center align-items-center'  style={{height:'100%',width:'60%'}}>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'60%',width:'100%'}}>
								<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
										<CategoryIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Research Categories</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div style={{width:'90%',height:'80%'}}>
										<BarChart width='20' height='5' label={['Hardware','Software','Web System', 'Game Development', 'Augmented Reality', 'Mobile App']} data={[hardware,software,webSys,gameDev,aR,mobileApp]} color={['#4CAF50','#548235']} setLabel={'System Categories'}/>
									</div>
								</div>
							</div>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'40%',width:'100%'}}>
								<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									<div className='d-flex flex-row' style={{width:'90%',height:'18%'}}>
										<NumbersIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Total Available Researches</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div className='d-flex flex-row justify-content-center align-items-center'style={{width:'95%',height:'80%'}}>	
										<div className='d-flex flex-row'style={{width:'80%',height:'100%'}}>
											<HBarChart width='20' height='5' label={['BSIT','BSCS']} data={[bsit,bscs]} color={['#4CAF50','#548235']} setLabel={'System Categories'}/>
										</div>
										<div className='d-flex flex-column justify-content-around'style={{width:'20%',height:'60%'}}>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>BSIT :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{bsit}</p>
											</div>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>BSCS :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{bscs}</p>
											</div>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>Total:</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{bsit + bscs}</p>
											</div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
						<div className='d-flex flex-column justify-content-center align-items-center'  style={{height:'100%',width:'40%'}}>
							<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className="d-flex flex-column justify-content-center align-items-center" style={{width:'95%',height:'95%'}}>
									<div className='d-flex flex-row justify-content-start align-items-center' style={{width:'95%', height:'10%'}}>
										<LocalLibraryIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Available Researches</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'100%', height:'80%'}}>
										<div className='d-flex flex-column justify-content-start align-items-center' style={{width:'95%', height:'90%',border:'1px solid black', borderRadius:'10px',overflowY:'auto',overflowX:'auto'}}>
											<div className="d-flex flex-row justify-content-around" style={{height:'25px',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white'}}>
												<div className='col-6 text-left'>Title</div>
												<div className='col-2 text-left'>Year</div>
											</div>
											<div className="d-flex flex-column justify-content-start" style={{height:'95%',width:'100%',overflowY:'overlay',overflowX:'overlay',backgroundColor:'#70AD47'}}>
												{researchData?.map?.(object =>(
													<div className='d-flex flex-row justify-content-around' style={{fontSize:'18px',border:'1px solid gray',borderRadius:'10px',backgroundColor:'#E2F0D9'}}>
														<div className='col-6 text-left'>{object.title}</div>
														<div className='col-2 text-left'>{object.yearSubmitted}</div>
													</div>
												))}
											</div>
										</div>
									</div>
									<div className="d-flex flex-row justify-content-end" style={{height:'7%',width:'95%'}}>
										<Link to={`/student-rlist/${username}`}><Button style={{height:'40px'}}title='See All Researches'/></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
