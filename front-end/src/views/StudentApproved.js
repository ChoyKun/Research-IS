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
//mui components
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';
import PreviewIcon from '@mui/icons-material/Preview';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';


export default function AdminRequest( props ){
	const {username} = useParams();

	const [approved, setApproved] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/approved-list/${username}`)
		.then((res)=>{
			setApproved( res.data.data );
		})
		.catch((err)=>{
			throw err;
		});
	},[])
	
	console.log(approved);

	useEffect(()=>{
		setFilteredData(approved?.map?.(object =>{
			if(search){
				let result = [];
				if( object.title.toLowerCase().includes( search.toLowerCase() ) ){
					return <Item key={object._id} object={object}/>
				}
			}
			else{
				return <Item key={object._id} object={object}/>
			}
		}))
	}, [search, approved])

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div className="d-flex justify-content-center align-items-center" style={{height:'90%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'98%', width:'97%'}}>
						<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
							<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<LocalLibraryIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Approved Requested Researches</p>
								</div>
								<Link to={`/student-pending/${username}`}><Button style={{height:'40px',width:'200px'}} title='Pending Requests'/></Link>							
							</div>
							<div className="d-flex flex-column" style={{height:'80%', width:'95%',border:'1px solid black',overflowY:'auto',overflowX:'auto'}}>
								<RListHeader/>
								<div className="d-flex flex-column" style={{height:'100%', width:'100%',backgroundColor:'#70AD47',overflowY:'auto',overflowX:'auto'}}>
									{filteredData}						
								</div>							
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function Item(props){
	const [open, setOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		setOpen( open );
	}

	const list = ()=>(
		<div className="d-flex justify-content-center flex-column" style={{height:'100%',width:'500px',backgroundColor:"#E2F0D9"}}>
			<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'95%',width:'95%'}}>
				<div className="d-flex justify-content-start align-items-start" style={{height:'10%',width:'90%'}}>
					<p style={{fontSize:'30px'}}>{props.object.title}</p>
				</div>
				<div className="d-flex flex-column justify-content-start align-items-start" style={{height:'70%',width:'90%'}}>
					<div className="d-flex flex-row justify-content-between" style={{width:'150px'}}>
						<p style={{fontSize:'20px'}}>Title:</p>
						<p style={{fontSize:'20px'}}>{props.object.title}</p>
					</div>
					<div className="d-flex flex-row justify-content-between" style={{width:'120px'}}>
						<p style={{fontSize:'20px'}}>Course:</p>
						<p style={{fontSize:'20px'}}>{props.object.course}</p>
					</div>
					<div className="d-flex flex-row justify-content-start" style={{width:'380px'}}>
						<p style={{fontSize:'20px'}}>Categories:   </p>
						<p style={{fontSize:'20px'}}>{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</p>
					</div>
					<div className="d-flex flex-row justify-content-between" style={{width:'220px'}}>
						<p style={{fontSize:'20px'}}>Year Submitted:</p>
						<p style={{fontSize:'20px'}}>{props.object.yearSubmitted}</p>
					</div>
					<div className="d-flex flex-column justify-content-start" style={{width:'100%'}}>
						<p style={{fontSize:'20px'}}>Authors:</p>
						<div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100%'}}>
							<div className="d-flex flex-column justify-content-center align-items-start" style={{width:'80%'}}>
								<p style={{fontSize:'20px'}}>{props.object.lead}</p>
								<p style={{fontSize:'20px'}}>{props.object.mem1}</p>
								<p style={{fontSize:'20px'}}>{props.object.mem2}</p>
								<p style={{fontSize:'20px'}}>{props.object.mem3}</p>
								<p style={{fontSize:'20px'}}>{props.object.me4 ?? '---'}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex flex-row-reverse justify-content-start" style={{width:'100%'}}>
					<Link to={`/research-full/${props.object._id}`}><Button title="View Document" style={{height:'40px'}}/></Link>
				</div>
			</div>
		</div>
	)

	return(
		<div className="d-flex flex-row justify-content-around" style={{height:'30px',width:'100%',backgroundColor:'#E2F0D9',border:'1px solid black',borderRadius:'10px'}}>
			<div className="col-3 text-center">{props.object.title}</div>
			<div className="col-3 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>			
			<div className="d-flex justify-content-center align-items-center text-center">
				<IconButton
				size="large"
				edge="end"
				color="inherit"
				aria-label="menu"
				sx={{ mr: 2 }}
				>
           	 		<PreviewIcon style={{height: '25px',width:'25px'}} onClick={toggleDrawer(true)}/>
           	 	</IconButton>
           	 	<Drawer
	            	anchor={'right'}
	            	open={open}
	            	onClose={toggleDrawer(false)}
	            >
            	{list()}
            	</Drawer>
			</div>
			{/*<Link to={`/research-full/${props.object._id}`}><Button className='col-1 text-center' style={{height:'30px',width:'70px',backgroundColor:'#385723', color:'white'}} title='View' /></Link>*/}
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
			<div className='col-2 text-center'>
				Authors
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-2 text-center'>
				Date Approved
			</div>
			<div className='col-1 text-center'>

			</div>
		</div>
	);
}
