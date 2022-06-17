import React,{useState, useEffect, Suspense} from 'react';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from '../modules/config.js';


//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';

//mui components
//mui components
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';
import PreviewIcon from '@mui/icons-material/Preview';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminRequest( props ){
	const {username} = useParams();

	const [approved, setApproved] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(()=>{
		axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/approved-list/${username}`)
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
				<div className="d-flex justify-content-center align-items-center" style={{height:'90%', width:'95%', backgroundColor:'white', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'98%', width:'97%'}}>
						<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey"}}>
							<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<LocalLibraryIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Approved Requested Researches</p>
								</div>
								<Link to={`/student-pending/${username}`}><Button style={{height:'40px',width:'200px'}} title='Pending Requests'/></Link>							
							</div>
							<div className="d-flex flex-column" style={{height:'80%', width:'95%',border:'1px solid black',overflowY:'auto',overflowX:'auto'}}>
								<RListHeader/>
								<div className="d-flex flex-column" style={{height:'100%', width:'100%',backgroundColor:'white',overflowY:'overlay',overflowX:'overlay'}}>
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
	const [dialogOpen, setDialogOpen] = useState(false);
	const [redirect, setRedirect] = useState( null );
	const [snackOpen, setSnackOpen] =useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	var agree;

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}

	const handleDialog = () =>{
		setDialogOpen(true)
	}

	const handleDialogClose = () =>{
		setDialogOpen(false)
	}

	const toggleDrawer = (open) => (event) => {
		setOpen( open );
	}

	const handleSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setSnackOpen(false);
		setAlertMes(null);
	}

	const handleAgree = (e) =>{
		agree = e.target.checked ? 'yes' : 'no'
	}

	const Agree = () =>{
		if(agree == 'yes'){
			setRedirect( <Redirect to={`/research-full/${props.object._id}`}/> );
		}
		else{
			setDialogOpen(false);
			setSnackOpen(true);
			setAlertMes("You must read the strict reminder check the checkbox to proceed")
			setAlertStatus(403)
		}
	}



	const list = ()=>(
		<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'900px',backgroundColor:"#E2F0D9"}}>
			<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'95%',width:'90%',border:'1px solid black',backgroundColor:'white',borderRadius:'10px'}}>
				<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
					<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
						{alertMes}
					</Alert>				
				</Snackbar>
				<div className="d-flex justify-content-start align-items-center flex-column" style={{height:'100%',width:'100%'}}>
					<div className="d-flex justify-content-start align-items-end" style={{height:'10%',width:'90%'}}>
						<p style={{fontSize:'25px',textAlign:'center',height:'24px'}}>{props.object.title}</p>
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
							<p className="col-9" style={{fontSize:'20px'}}>{props.object.researchCategories}</p>
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
						<Button title="View Document" click={handleDialog} style={{height:'40px'}}/>
						<Dialog
							open={dialogOpen}
					        onClose={handleDialogClose}
					        aria-labelledby="alert-dialog-title"
					        aria-describedby="alert-dialog-description"
						>
							<DialogTitle>
								{"Strict Reminder"}
							</DialogTitle>
							<DialogContent>
								<p>	This document is owned by the institution and the author of the study. You are only permitted to read/view this document for research purposes. It is illegal and punishable under the law to copy anything from this document. Illegal distribution or copying of the document outside the institution may result to expulsion. Do you understand?</p>
								<Checkbox cLabel="Yes, I understand" reqOnChange={handleAgree}/> 
							</DialogContent>
							<DialogActions>
								<Button title='Cancel' click={cancelOp}/>
								<Button title='Yes' click={Agree}/>
							</DialogActions>
						</Dialog>
					</div>
				</div>
				{redirect}
			</div>
		</div>
	)

	return(
		<div className="d-flex flex-row justify-content-around" style={{height:'30px',width:'100%',backgroundColor:'#E2F0D9',border:'1px solid black',borderRadius:'10px'}}>
			<div className="col-3 text-center">{props.object.title}</div>
			<div className="col-3 text-center">{props.object.researchCategories }</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<div className="col-2 text-center">{props.object.dateApproved}</div>				
			<div className="col-1 d-flex justify-content-center align-items-center text-center">
				<Tooltip title='View Document' arrow>
					<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-label="menu"
					sx={{ color:'#385723',mr: 2 }}
					>
	           	 		<PreviewIcon style={{height: '25px',width:'25px'}} onClick={toggleDrawer(true)}/>
	           	 	</IconButton>
				</Tooltip>
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
			<div className='col-3 text-center'>
				Title
			</div>
			<div className='col-3 text-center'>
				Research Categories
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-2 text-center'>
				Date Approved
			</div>
			<div className='col-1 text-center'>
				View
			</div>
		</div>
	);
}
