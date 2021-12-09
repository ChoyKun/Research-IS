import React,{useState, useEffect, Suspense} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';

//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';

//mui components
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';



export default function AdminRequest( props ){
	const {username} = useParams();

	const [pending, setPending] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState('');


	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/pending-list/${username}`)
		.then((res)=>{
			// console.log( res.data );
			setPending( res.data.data );
		})
		.catch((err)=>{
			throw err;
		});
	},[])
	console.log(pending);

	useEffect(()=>{
		setFilteredData(pending?.map?.(object =>{
			if(search){
					for( let key of Object.keys(object)){
							if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
								return <Item key={object._id} object={object}/>
							}
					}
			}
			else{
				return <Item key={object._id} object={object}/>
			}
		}))
	}, [search, pending])


	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div className="d-flex justify-content-center align-items-center" style={{height:'90%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'98%', width:'97%'}}>
						<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
							<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<LocalLibraryIcon sx={{color:green[300],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Pending Requested Researches</p>
								</div>
								<Link to={`/student-approved/${username}`}><Button style={{height:'40px',width:'200px'}} title='Approved Researches'/></Link>							
							</div>
							<div className="d-flex flex-column" style={{height:'80%', width:'95%',border:'1px solid black',overflowY:'auto',overflowX:'auto'}}>
								<RListHeader/>
								{filteredData}							
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function Item(props){

	return(
		<div className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-3 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-3 text-center">
				<marquee width="60%" direction="left" height="100%">
					{props.object.members === '[]' ? 'N/A' : (()=> JSON.parse(props.object.members).join(', '))()}
				</marquee>
			</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<Link to={`/research-abstract/${props.object._id}`}><Button className='col-1 text-center' style={{height:'30px',width:'70px',backgroundColor:'#385723', color:'white'}} title='View' /></Link>
		</div>
	);
}

function Loading(props){
	
	return(
		<div>
			loading
		</div>
	);
}

function RListHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white'}} className='d-flex flex-row justify-content-around'>
			<div className='col-2 text-center'>
				Title
			</div>
			<div className='col-3 text-center'>
				ResearchCategories
			</div>
			<div className='col-3 text-center'>
				Authors
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-1 text-center'>
				
			</div>
		</div>
	);
}
