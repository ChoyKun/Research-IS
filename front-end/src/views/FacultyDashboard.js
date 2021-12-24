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



//mui components
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category'
import NumbersIcon from '@mui/icons-material/Numbers'
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';


export default function StudentDashboard(props){
	const {username} = useParams();

	const [studentData, setStudentData] = useState([]);
	const [Male , setMale] = useState(null)
	const [Female , setFemale] = useState(null)
	const [bsit, setBsit] =useState(null)
	const [bscs, setBscs] =useState(null);
	const [first, setFirst] = useState(null);
	const [second, setSecond] = useState(null);
	const [third, setThird] = useState(null);
	const [fourth, setFourth] = useState(null);
	const [courseTotal, setCourseTotal] = useState(null);
	const [sexTotal, setSexTotal] = useState(null);
	


	useEffect(()=>{
		const getStudentList = async () => {
			axios.get('http://localhost:7000/student/slist')
			.then((res)=>{
				res.data.forEach( elem => {
					console.log( elem.status );
					if( elem.status === 'active' ){
						setStudentData((studentData) => [...studentData, elem]);
					}
				})
			})
			.catch((err)=>{
				console.log(err)
			})
		}
		getStudentList();
	},[]);

	useEffect(()=>{
		axios.get('http://localhost:7000/student/course-count')
		.then((res)=>{
			setBsit(res.data.BSIT);
			setBscs(res.data.BSCS)
		})
		.catch((err)=>{
			console.log(err);
		})

		axios.get('http://localhost:7000/student/sex-count')
		.then((res)=>{
			setMale(res.data.Male);
			setFemale(res.data.Female)
		})
		.catch((err)=>{
			console.log(err);
		})

		axios.get('http://localhost:7000/student/year-count')
		.then((res)=>{
			setFirst(res.data.first);
			setSecond(res.data.second);
			setThird(res.data.third);
			setFourth(res.data.fourth);
		})
		.catch((err)=>{
			console.log(err);
		})
	},[])
	


	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100%',width:'100%'}}>
						<div className='d-flex flex-row justify-content-center align-items-center'  style={{height:'50%',width:'100%'}}>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'100%',width:'32%'}}>
								<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'100%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
										<CategoryIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Students Per Year Level</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div style={{width:'90%',height:'70%'}}>
										<BarChart width='20' height='5' label={['1st Year','2nd Year','3rd Year', '4th Year']} data={[first,second,third,fourth]} color={['#4CAF50','#548235']} setLabel={'Student Year Levels'}/>
									</div>
								</div>
							</div>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'100%',width:'32%'}}>
								<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'100%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
										<WcIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Student's Gender Ratio</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div className='d-flex flex-column justify-content-center align-items-center'style={{width:'80%',height:'70%'}}>	
										<div className='d-flex flex-row justify-content-around'style={{width:'100%',height:'10%'}}>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>Male :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{Male}</p>
											</div>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>Female :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{Female}</p>
											</div>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>Total :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{Female + Male}</p>
											</div>
										</div>
										<div className='d-flex flex-row'style={{width:'100%',height:'80%'}}>
											<PieChart width='23' height='20' label={['Male','Female']} data={[Male,Female]} color={['#4CAF50','#548235']} setLabel={'System Categories'}/>
										</div>
									</div>
								</div>
							</div>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'100%',width:'32%'}}>
								<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'100%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									<div className='d-flex flex-row' style={{width:'90%',height:'10%'}}>
										<SchoolIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Student's Course Ratio</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div className='d-flex flex-column justify-content-center align-items-center'style={{width:'80%',height:'70%'}}>	
										<div className='d-flex flex-row justify-content-around'style={{width:'100%',height:'10%'}}>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>BSIT :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{bsit}</p>
											</div>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>BSCS :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{bscs}</p>
											</div>
											<div className='d-flex flex-row justify-content-around align-items-center'style={{width:'100%',height:'20%'}}>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>Total :</p>
												<p style={{fontSize:'20px', textAlign:'center',height:'20px'}}>{bscs + bsit}</p>
											</div>
										</div>
										<div className='d-flex flex-row'style={{width:'100%',height:'80%'}}>
											<PieChart width='23' height='20' label={['BSIT','BSCS']} data={[bsit,bscs]} color={['#4CAF50','#548235']} setLabel={'System Categories'}/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='d-flex flex-row justify-content-around align-items-center'  style={{height:'45%',width:'100%'}}>
							<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'70%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100%',height:'95%'}}>
									<div className='d-flex flex-row justify-content-start align-items-center' style={{width:'95%', height:'18%'}}>
										<SchoolIcon sx={{color:green[500],height:'35px',width:'35px'}}/>
										<p style={{fontSize:'25px', textAlign:'center',height:'24px'}}>Student List</p>
									</div>
									<Divider style={{height:'2px', width:'100%', color:'black'}}/>
									<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'100%', height:'80%'}}>
										<div className='d-flex flex-column justify-content-start align-items-center' style={{width:'95%', height:'90%',border:'1px solid black',backgroundColor:'#70AD47', borderRadius:'10px',overflowY:'auto',overflowX:'auto'}}>
											<div className="d-flex flex-row justify-content-around align-items-center" style={{height:'25px',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white'}}>
												<div className='col-2 text-left'>First Name</div>
												<div className='col-1 text-left'>M.I</div>
												<div className='col-2 text-left'>Last Name</div>
												<div className='col-2 text-left'>Year</div>
											</div>
											<div className="d-flex flex-column justify-content-start align-items-center" style={{height:'95%',width:'100%',overflowY:'auto',overflowX:'auto'}}>
												{studentData?.map?.(object =>(
													<div className='d-flex flex-row justify-content-around align-items-center' style={{fontSize:'18px',width:'100%',border:'1px solid gray',backgroundColor:'#E2F0D9',borderRadius:'10px'}}>
														<div className='col-2 text-left'>{object.firstName}</div>
														<div className='col-1 text-left'>{object.middleInitial}</div>
														<div className='col-2 text-left'>{object.lastName}</div>
														<div className='col-2 text-left'>{object.yearLevel}</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'20%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
								<div className="d-flex flex-row justify-content-center" style={{height:'25%',width:'100%'}}>
									<Link to={`/MIS-slist/${username}`}><Button style={{width:'230px',height:'40px'}} title="Activated Account"/></Link>
								</div>
								<div className="d-flex flex-row justify-content-center" style={{height:'25%',width:'100%'}}>
									<Link to={`/MIS-inactive-slist/${username}`}><Button style={{width:'230px',height:'40px'}} title="Deactivated Account"/></Link>
								</div>
								<div className="d-flex flex-row justify-content-center" style={{height:'25%',width:'100%'}}>
									<Link to={`/MIS-reg/${username}`}><Button style={{width:'230px',height:'40px'}} title="Register New Student"/></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
