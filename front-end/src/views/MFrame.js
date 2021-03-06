import React, {useState, useEffect} from 'react';
import {Link, useParams, Redirect} from 'react-router-dom';
import axios from 'axios';	
import Cookies from 'js-cookie';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"
import drawer from "../images/drawer.png"
import rlist from "../images/rlist.png"

//mui components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { green } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Badge from '@mui/material/Badge';

import InboxContext from '../contexts/Inbox-context';
import IconBtn from '../components/buttons/iconbtn';
import Button from '../components/buttons/button';
import "../styles/button.css"
import "../styles/txt.css"



export default function SFrame(props){
	const inboxMessages = React.useContext( InboxContext );

	const [isMenuOpen, setIsMenuOpen] = useState( false );
	const [messageDrawer, setMessageDrawer] = useState( false );
	const { username } = useParams();
	const [name, setName] = useState(null);
	const [inbox , setInbox] = useState( [] );
	const [dialogOpen, setDialogOpen] = useState(false);
	const [snackOpen, setSnackOpen] = useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [readMessagesNumber, setReadMessagesNumber] = useState( 0 );

	const handleSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setSnackOpen(false);
		setAlertMes(null);
		setAlertStatus(null);
	}

	const handleDialog = () =>{
		setDialogOpen(true)
	}

	const handleDialogClose = () => {
	    setDialogOpen(false);
	};

	const handleSignOut = async () => {
		const token = Cookies.get('token');

		axios.delete(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/sign-out`, { token })
		.then(() => {
			Cookies.remove('token');
			Cookies.remove('rtoken');
		})
		.catch( err => {
			throw err;
		});
	}

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}

	useEffect(() => {
		const id = Cookies.get('id');

		if( id ){
			console.log( id );

			console.log( inboxMessages );
			const tempInboxList = [];
			inboxMessages.forEach( msg => {
				console.log( msg );
				// console.log( msg.message, id );
				// console.log( )
				if( msg._id === id ){
					tempInboxList.push(
						<>
							<div className="d-flex flex-row justify-content-center" style={{height:'fit-content',width:'100%'}}>
								<div className="col-8 text-left">{ msg.message }</div>
								<div className="col-3 text-center">{ msg.date }</div>
							</div>
							<Divider style={{height:'2px',width:'100%',backgroundColor:"#385723"}}/>
						</>
					);
				}
			});

			setInbox([ ...tempInboxList ]);
		}
	}, [inboxMessages]);

	const list = () =>(
		<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'200px',backgroundColor:"#385723"}}>
			<img style={{height:'140px',width:'150px'}} src={scslogo}/>
			<Divider style={{height:'10px',width:'100%',backgroundColor:"#385723"}}/>
			<div className="d-flex justify-content-center flex-column" style={{height:'70%',width:'90%',backgroundColor:"#E2F0D9",borderRadius:'10px'}}>
				<div className="d-flex justify-content-center flex-column" style={{height:'100%',width:'100%'}}>
				 	<List className="d-flex align-items-center flex-column" style={{height:'100%',width:'100%',color:'black'}}>
				 		<Link className="d-flex justify-content-between align-items-center text-center" to={`/student-dashboard/${username}`} style={{ textDecoration: 'none',height:'10%',width:'70%' }}>
			 				<DashboardIcon sx={{color:green[500],width:'25px',height:'25px'}}/>
			 				<p style={{fontSize:'15px', textAlign:'center',height:'12px',color:'black'}} className="MontFont">Dashboard</p>
						</Link>
				 		<Divider style={{height:'2px',width:'100%'}}/>
				 		<Link className="d-flex justify-content-between align-items-center text-center" to={`/student-profile/${username}`} style={{ textDecoration: 'none',height:'10%',width:'70%' }}>
			 				<AccountBoxIcon sx={{color:green[500],width:'25px',height:'25px'}}/>
			 				<p style={{fontSize:'15px', textAlign:'start',height:'12px',width:'65%',color:'black'}} className="MontFont">Profile</p>
			 			</Link>
				 		<Divider style={{height:'70%',width:'100%',backgroundColor:"#E2F0D9"}}/>
				 		<Link className="d-flex justify-content-between align-items-center text-center" to={`/sign-in`} style={{ textDecoration: 'none',height:'10%',width:'70%' }}>				
			 				<LogoutIcon sx={{color:green[500],width:'25px',height:'25px'}}/>
			 				<p style={{fontSize:'15px', textAlign:'center',height:'12px',width:'65%',color:'black'}} className="MontFont">Log out</p>
			 			</Link>
				 	</List>
		 		</div>
			</div>
		</div>
	)

	const messages =()=>(
		<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'250px', height:'100%',backgroundColor:"#E2F0D9"}}>
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
				<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
					{alertMes}
				</Alert>				
			</Snackbar>
			<div style={{height:'90%', width:'90%'}}>
				<p style={{fontSize:'36px'}}>Inbox</p>
				<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'80%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey",overflowY:'auto',overflowX:'auto'}}>
					<div style={{height:'7%',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white'}} className='d-flex flex-row justify-content-around align-items-center'>
						<div className='col-5 text-center' style={{fontSize:'20px'}}>
							Message
						</div>
						<div className='col-1 text-center' style={{fontSize:'20px'}}>
							Date
						</div>
					</div>
					<div style={{height:'95%',width:'100%',overflowY:'overlay' }} className='d-flex flex-column align-items-start justify-content-start'>	
						{ inbox }
					</div>
				</div>
			</div>
		</div>
	)

	const clearMessage = () =>{
		setDialogOpen(false);
		setSnackOpen(true);

		axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/clear-message/${username}`)
		.then(res=>{
			setAlertMes(res.data.message);
			setAlertStatus('good');
		})
		.catch(err=>{
			setAlertMes(JSON.parse(err.request.response).message)
			setAlertStatus(403)
		})

	}

	// useEffect(()=>{
	// 	axios.get(`http://localhost:7000/student/slist/inbox/${username}`)
	// 	.then(res=>{
	// 		setInbox(res.data.data)
	// 	})
	// 	.catch(err=>{
	// 		console.log(err);
	// 	})
	// },[])


	useEffect(() => {
		axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/${username}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		});
	}, [])

	useEffect(() => {
		const id = Cookies.get('id');

		if( messageDrawer ){
			const readMessages = [];
			
			inboxMessages.forEach( msg => {
				if( msg._id === id ){
					readMessages.push( msg.msg_id );					
				}
			});

			Cookies.set('readMessages', JSON.stringify( readMessages ));
		}
		else{
			let readMessages = Cookies.get('readMessages');

			let readMessagesCurrentNumber = 0;

			if( readMessages ){
				readMessages = JSON.parse( readMessages );
				console.log( typeof readMessages );

				inboxMessages.forEach( msg => {
					if( msg._id === id ){
						if( !readMessages.includes( msg.msg_id ) ){
							readMessagesCurrentNumber += 1;
						}
					}
				});

				setReadMessagesNumber( readMessagesCurrentNumber );
			}
			else{
				inboxMessages.forEach( msg => {
					if( msg._id === id ){
						readMessagesCurrentNumber += 1;
					}
				});
				setReadMessagesNumber( readMessagesCurrentNumber );
			}
		}
	}, [messageDrawer, inboxMessages]);

	const toggleDrawer = (open) => (event) => {
		setIsMenuOpen( open );
	}

	const toggleInbox = (open) => (event) => {
		setMessageDrawer( open );
	}

	return(
		<div style={{width: '100%', height: '100%', color:'white'}} className="main-container">
			<Box sx={{ flexGrow: 1 }}>
		      <AppBar position="static" style={{backgroundColor:'#548235'}}>
		        <Toolbar>
		        	<Tooltip title="Menu" arrow>
			          <IconButton
			            size="large"
			            edge="start"
			            color="inherit"
			            aria-label="menu"
			            sx={{ mr: 2 }}
			          >
			            <MenuIcon onClick={toggleDrawer(true)} style={{height: '35px',width:'35px'}}/>
			            
			          </IconButton>
		        	</Tooltip>
		            <Drawer
		            	anchor={'left'}
		            	open={isMenuOpen}
		            	onClose={toggleDrawer(false)}
		            >
		            	{list()}
	            	</Drawer>
		          <Typography variant="h7" component="div" sx={{ flexGrow: 1 ,fontSize:'15px',fontWeight:'bold'}}>
		           	Welcome Student
		          </Typography>

		          	<Tooltip title="Inbox" arrow>
			          <IconButton
			            size="large"
			            edge="start"
			            color="inherit"
			            aria-label="menu"
			            sx={{ mr: 2 }}
			          >
			          	<Badge badgeContent={readMessagesNumber} color="secondary">
				            <MailIcon onClick={toggleInbox(true)} fontSize="large"/>
			          	</Badge>
			          </IconButton>
			        </Tooltip>
		            <Drawer
		            	anchor={'right'}
		            	open={messageDrawer}
		            	onClose={toggleInbox(false)}
		            >
	            		{messages()}
	            	</Drawer>
		        </Toolbar>
		      </AppBar>
		    </Box>

			<div style={{width: '100%', height: '90%'}} className="d-flex flex-row">	
				<div style={{width:'100%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column">
					{ props.children }
				</div>	
			</div>
		</div>
	);
}

function OpenedMenu( props ){
	const handleSignOut = async () => {
		const token = Cookies.get('token');

		axios.delete(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/sign-out`, { token })
		.then(() => {
			Cookies.remove('token');
			Cookies.remove('rtoken');
		})
		.catch( err => {
			throw err;
		});
	}
	
	return(
		<div className="side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"80%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
				<img style={{height:'130px',width:'150px'}} src={scslogo}/>
				<div style={{height:'3px',width:'250px',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'></div>
				<div style={{width:'280px'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={profile}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/student-profile/${props.username}`}><Button style={{height:'40px' , width:'100%'}} title='Profile'/></Link>
					</div>
				</div>
				<div style={{width:'280px'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={rlist}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/student-rlist/${props.username}`}><Button style={{height:'40px' , width:'100%'}} title='Research List'/></Link>
					</div>
				</div>
				<div style={{width:'280px'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={lock}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/student-changepass/${props.username}`}><Button style={{height:'40px' , width:'100%'}} title='Change Password'/></Link>
					</div>
				</div>
				<div style={{width:'280px'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={rlist}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/student-approved/${props.username}`}><Button style={{height:'40px' , width:'100%'}} title='Research Requests'/></Link>
					</div>
				</div>
				<div style={{width:'280px'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/sign-in`}><Button click={handleSignOut} style={{height:'40px' , width:'100%'}} title='Log-out'/></Link>
					</div>
				</div>
			</div>
		</div>
	);
}


function ClosedMenu( props ){
	return(
		<div className="sidebarClose side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"50%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
				<img style={{height:'60px',width:'70px'}} src={scslogo}/>
				<div style={{height:'3px',width:'60px',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'></div>
				<img style={{height:'50px',width:'50px'}} src={profile}/>
				<img style={{height:'50px',width:'50px'}} src={rlist}/>
				<img style={{height:'50px',width:'50px'}} src={lock}/>
				<img style={{height:'50px',width:'50px'}} src={rlist}/>
			</div>
		</div>
	);
}