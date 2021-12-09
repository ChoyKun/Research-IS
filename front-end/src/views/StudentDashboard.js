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

//mui components
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';
import Divider from '@mui/material/Divider';


export default function StudentDashboard(props){
	const {username} = useParams();

	const [researchData, setResearchData] = useState([]);

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

	console.log(researchData)

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-row justify-content-center align-items-center" style={{height:'100%',width:'100%'}}>
						<div className='d-flex flex-column justify-content-center align-items-center'  style={{height:'100%',width:'60%'}}>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'60%',width:'100%'}}>
								<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									
								</div>
							</div>
							<div className='d-flex justify-content-center align-items-center'  style={{height:'40%',width:'100%'}}>
								<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
									
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
										<div className='d-flex flex-column justify-content-start align-items-center' style={{width:'95%', height:'90%',border:'1px solid black', borderRadius:'10px'}}>
											<div className="d-flex flex-row justify-content-around" style={{height:'25px',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white', borderRadius:'10px'}}>
												<div className='col-6 text-left'>Title</div>
												<div className='col-2 text-left'>Year</div>
											</div>
											<div className="d-flex flex-column justify-content-start" style={{height:'95%',width:'100%',overflowY:'auto',overflowX:'auto'}}>
												{researchData?.map?.(object =>(
													<div className='d-flex flex-row justify-content-around'>
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
