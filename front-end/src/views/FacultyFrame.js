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
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';




import IconBtn from '../components/buttons/iconbtn';
import Button from '../components/buttons/button';
import "../styles/button.css"
import "../styles/txt.css"

export default function SFrame(props){

	const [isMenuOpen, setIsMenuOpen] = useState( false );
	const { username } = useParams();
	const [name, setName] = useState(null);
	const [adminPage, setAdminPage] = useState('')

	const token = Cookies.get('token');
    const rtoken = Cookies.get('rtoken');

	const handleSignOut = async () => {
		const token = Cookies.get('token');
		console.log(token)

		axios.delete('http://localhost:7000/sign-out', { token })
		.then(() => {
			Cookies.remove('token');
			Cookies.remove('rtoken');
		})
		.catch( err => {
			throw err;
		});
	}

	

    useEffect(()=>{
    	axios.get('http://localhost:7000/verify-me', {
			headers: {
				'authentication': `Bearer ${token}`
			}
	    })
	    .then(req=>{
	    	const { role, name } = req.data.user;
	    	console.log(role)
	    	console.log(name)

	    	switch( role ){
				case 'mis officer':
					setAdminPage( `/admin-unauthorized/${username}`);
					axios.get(`http://localhost:7000/faculty/flist/${username}`)
					.then(res=>{
						setName(res.data.data);
					})
					.catch(err=>{
						console.log(err);
					});
					break;

				case 'admin':
					setAdminPage( `/admin-log-in/${username}` );
					setName('Coordinator');
					break;
        	}
	    })
    },[])

    const list = () =>(
		<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'300px',backgroundColor:"#385723"}}>
			<img style={{height:'130px',width:'150px'}} src={scslogo}/>
			<Divider style={{height:'10px',width:'100%',backgroundColor:"#385723"}}/>
			<div className="d-flex justify-content-center flex-column" style={{height:'70%',width:'90%',backgroundColor:"#E2F0D9",borderRadius:'10px'}}>
				<div className="d-flex justify-content-center flex-column" style={{height:'100%',width:'100%'}}>
					<List className="d-flex align-items-center flex-column" style={{height:'100%',width:'100%',color:'black'}}>
			 			<ListItem style={{width:'100%',color:'black'}}>
			 				<Link className="d-flex justify-content-between align-items-center text-center" to={`/MIS-dashboard/${username}`}>
			 					<ListItemButton className="d-flex justify-content-between align-items-center text-center" style={{color:'white'}}>
			 						<ListItemIcon sx={{color:green[500]}}>
			 							<DashboardIcon/>
			 						</ListItemIcon>
			 						<p style={{fontSize:'18px', textAlign:'center',height:'12px',color:'black'}} className="MontFont">Dashboard</p>
			 					</ListItemButton>
			 				</Link>
			 			</ListItem>
			 			<Divider style={{height:'2px',width:'100%'}}/>
			 			<ListItem style={{width:'100%',color:'black'}}>
			 				<Link className="d-flex justify-content-between align-items-center text-center" to={`/MIS-profile/${username}`}>
			 					<ListItemButton className="d-flex justify-content-between align-items-center text-center" style={{color:'white'}}>
			 						<ListItemIcon sx={{color:green[500]}}>
			 							<AccountBoxIcon/>
			 						</ListItemIcon>
			 						<p style={{fontSize:'18px', textAlign:'center',height:'12px',color:'black'}} className="MontFont">Profile</p>
			 					</ListItemButton>
			 				</Link>
			 			</ListItem>
			 			<Divider style={{height:'2px',width:'100%'}}/>
			 			<ListItem style={{width:'100%',color:'black'}}>
			 				<Link className="d-flex justify-content-between align-items-center text-center" to={adminPage}>
			 					<ListItemButton className="d-flex justify-content-between align-items-center text-center" style={{color:'white'}}>
			 						<ListItemIcon sx={{color:green[500]}}>
			 							<SupervisorAccountIcon/>
			 						</ListItemIcon>
			 						<p style={{fontSize:'18px', textAlign:'center',height:'12px',color:'black'}} className="MontFont">Login as Admin</p>
			 					</ListItemButton>
			 				</Link>
			 			</ListItem>
			 			<Divider style={{height:'47%',width:'100%',backgroundColor:"#E2F0D9"}}/>
			 			<ListItem style={{width:'100%',color:'black'}}>
			 				<Link to={`/sign-in`}>				
			 					<ListItemButton onClick={handleSignOut} className="d-flex justify-content-between align-items-center text-center" style={{color:'white'}}>
			 						<ListItemIcon sx={{color:green[500]}}>
			 							<LogoutIcon/>
			 						</ListItemIcon>
			 						<p style={{fontSize:'18px', textAlign:'center',height:'12px',color:'black'}} className="MontFont">Log out</p>
			 					</ListItemButton>
			 				</Link>
			 			</ListItem>
			 		</List>
		 		</div>
			</div>
		</div>
	)

	const toggleDrawer = (open) => (event) => {
		setIsMenuOpen( open );
	}

	return(
		<div style={{width: '100%', height: '100%', color:'white'}} className="main-container">
			<Box sx={{ flexGrow: 1 }}>
		      <AppBar position="static" style={{backgroundColor:'#548235'}}>
		        <Toolbar>
		          <IconButton
		            size="large"
		            edge="start"
		            color="inherit"
		            aria-label="menu"
		            sx={{ mr: 2 }}
		          >
		            <MenuIcon onClick={toggleDrawer(true)}/>
		            <Drawer
		            	anchor={'left'}
		            	open={isMenuOpen}
		            	onClose={toggleDrawer(false)}
		            >
	            	{list()}
	            	</Drawer>
		            
		          </IconButton>
		          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
		           	Welcome Mr./Ms. {name}
		          </Typography>
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

		axios.delete('http://localhost:7000/sign-out', { token })
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