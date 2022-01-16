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
import PreviewIcon from '@mui/icons-material/Preview';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';



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
								<div className="d-flex flex-column" style={{height:'100%', width:'100%',backgroundColor:'#70AD47',overflowY:'overlay',overflowX:'overlay'}}>
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
		<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'500px',backgroundColor:"#E2F0D9"}}>
			<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'95%',width:'90%',border:'1px solid black',backgroundColor:'white',borderRadius:'10px'}}>
				<div className="d-flex justify-content-start align-items-center flex-column" style={{height:'100%',width:'100%'}}>
					<div className="d-flex justify-content-start align-items-end" style={{height:'10%',width:'90%'}}>
						<p style={{fontSize:'30px',textAlign:'center',height:'24px'}}>{props.object.title}</p>
					</div>
					<Divider style={{height:'2px', width:'100%', color:'black'}}/>
					<div className="d-flex flex-column justify-content-start align-items-start" style={{height:'85%',width:'90%'}}>
						<div className="d-flex flex-row justify-content-around" style={{height:'10%',width:'100%'}}>
							<p className="col-2" style={{fontSize:'20px'}}>Title:</p>
							<p className="col-10" style={{fontSize:'20px'}}>{props.object.title}</p>
						</div>
						<div className="d-flex flex-row justify-content-around" style={{height:'10%',width:'100%'}}>
							<p className="col-2" style={{fontSize:'20px'}}>Course:</p>
							<p className="col-10" style={{fontSize:'20px'}}>{props.object.course}</p>
						</div>
						<div className="d-flex flex-row justify-content-around" style={{height:'15%',width:'100%'}}>
							<p className="col-3" style={{fontSize:'20px'}}>Categories:   </p>
							<p className="col-9" style={{fontSize:'20px'}}>{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</p>
						</div>
						<div className="d-flex flex-row justify-content-around" style={{height:'10%',width:'100%'}}>
							<p className="col-5" style={{fontSize:'20px'}}>Year Submitted:</p>
							<p className="col-7" style={{fontSize:'20px'}}>{props.object.yearSubmitted}</p>
						</div>
						<div className="d-flex flex-column justify-contentasd-start" style={{height:'40%',width:'100%'}}>
							<p style={{fontSize:'20px'}}>Authors:</p>
							<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100%',width:'100%'}}>
								<div className="d-flex flex-column justify-content-center align-items-start" style={{height:'100%',width:'80%'}}>
									<p style={{fontSize:'20px'}}>{props.object.lead ?? '---'}</p>
									<p style={{fontSize:'20px'}}>{props.object.mem1 ?? '---'}</p>
									<p style={{fontSize:'20px'}}>{props.object.mem2 ?? '---'}</p>
									<p style={{fontSize:'20px'}}>{props.object.mem3 ?? '---'}</p>
									<p style={{fontSize:'20px'}}>{props.object.mem4 ?? '---'}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="d-flex flex-row-reverse justify-content-start" style={{height:'10%',width:'90%'}}>
						<Link to={`/research-abstract/${props.object._id}`}><Button title="View Document" style={{height:'40px'}}/></Link>
					</div>
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
				{/*<Button style={{width:'90px'}} click={requestForView} disabled={disabled} className={`col-1 text-center`} title='Request'/>*/}
			</div>
			{/*<Link to={`/research-abstract/${props.object._id}`}><Button className='col-1 text-center' style={{height:'30px',width:'70px',backgroundColor:'#385723', color:'white'}} title='View' /></Link>*/}
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
			<div className='col-3 text-center'>
				Title
			</div>
			<div className='col-3 text-center'>
				ResearchCategories
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-1 text-center'>
				View Details
			</div>
		</div>
	);
}
