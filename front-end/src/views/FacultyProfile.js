import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../modules/config.js';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"

//mui component
import Divider from '@mui/material/Divider';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { green } from '@mui/material/colors';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';




//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function StudentProfile(props){

	const {username} = useParams();
	const [facultyData, setFacultyData] = useState([]);
	const [name, setName] = useState(null);
	const [pCount, setPCount] = useState(null);
	const [aCount, setACount] = useState(null);
	const [drawerState, setDrawerState] = useState(false);
	const [profileState, setProfileState] = useState(false);
	const [actState, setActState] = useState(false);
	const [activity, setActivity] = useState(null)
	const [passwordSnackOpen, setPasswordSnackOpen] =useState(false);
	const [profileSnackOpen, setProfileSnackOpen] =useState(false);
	const [passwordAlertMes, setPasswordAlertMes] = useState(null);
	const [passwordAlertStatus, setPasswordAlertStatus] = useState(null);
	const [profileAlertMes, setProfileAlertMes] = useState(null);
	const [profileAlertStatus, setProfileAlertStatus] = useState(null);
	const [logsSnackOpen, setLogsSnackOpen] =useState(false);
	const [logsAlertMes, setLogsAlertMes] = useState(null);
	const [logsAlertStatus, setLogsAlertStatus] = useState(null);
	const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
	const [logsDialogOpen, setLogsDialogOpen] = useState(false);
	const [profileDialogOpen, setProfileDialogOpen] = useState(false);
	const [showCurrPassword, setShowCurrPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showVerPassword, setShowVerPassword] = useState(false);
	const [image, setImage] = useState(null);
	const [imgFile, setImgFile] = useState(null);
	const [newImage, setNewImage] = useState(null);



	const state={
		_currPassword: null,
		_newPassword: null,
		_verNewPassword:null,
		_username:null ,
		_password:null,
		_firstName:null,
		_middleInitial:null,
		_lastName:null,
		_extentionName:null,
		_birthdate:null,
		_dateRegistered:null,
		_contactNo:null,
		_emailAdd:null,
		_img:'',
	}


	const handleClickShowCurrPassword = () => setShowCurrPassword(!showCurrPassword)
	const handleMouseDownCurrPassword = () => setShowCurrPassword(!showCurrPassword)
	const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword)
	const handleMouseDownNewPassword = () => setShowNewPassword(!showNewPassword)
	const handleClickShowVerPassword = () => setShowVerPassword(!showVerPassword)
	const handleMouseDownVerPassword = () => setShowVerPassword(!showVerPassword)

	const handlePasswordSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setPasswordSnackOpen(false);
		setPasswordAlertMes(null);
		setPasswordAlertStatus(null);
	}

	const handlePasswordDialog = () =>{
		setPasswordDialogOpen(true)
	}


	const handlePasswordDialogClose = () => {
	    setPasswordDialogOpen(false);
	};

	const handleLogsSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setLogsSnackOpen(false);
		setLogsAlertMes(null);
		setLogsAlertStatus(null);
	}

	const handleProfileSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setProfileSnackOpen(false);
		setProfileAlertMes(null);
		setProfileAlertStatus(null);
	}

	const handleLogsDialog = () =>{
		setLogsDialogOpen(true)
	}

	const handleLogsDialogClose = () => {
	    setLogsDialogOpen(false);
	};

	const handleProfileDialog = () =>{
		setProfileDialogOpen(true)
	}

	const handleProfileDialogClose = () => {
	    setProfileDialogOpen(false);
	};
	function reducer(state, action){
		switch(action.type){
			case '_currPassword':
				state._currPassword=action.data;
				return state;
			case '_newPassword':
				state._newPassword=action.data;
				return state;
			case '_verNewPassword':
				state._verNewPassword=action.data;
				return state;
			case '_username':
				state._username = action.data;
				return state;
			case '_password':
				state._password = action.data;
				return state;
			case '_firstName':
				state._firstName = action.data;
				return state;
			case '_middleInitial':
				state._middleInitial = action.data;
				return state;
			case '_lastName':
				state._lastName = action.data;
				return state;
			case '_extentionName':
				state._extentionName = action.data;
				return state;
			case '_birthdate':
				state._birthdate = action.data;
				return state;
			case '_dateRegistered':
				state._dateRegistered = action.data;
				return state;
			case '_contactNo':
				state._contactNo = action.data;
				return state;
			case '_emailAdd':
				state._emailAdd = action.data;
				return state;
			case '_img':
				state._img = action.data;
				return state;
		}
	}

	const [data, dispatch] = useReducer(reducer,state);

	const imageOnChange = (e)=>{

		const file = e.target.files[0]
		var reader = new FileReader();
  		var url = reader.readAsDataURL(file);

		reader.onloadend = function (e) {
			setNewImage(reader.result)
		}

		setImgFile(e.target.files[0]);	
	}

	const passwordHandler = ()=>{
		setPasswordDialogOpen(false);
		setPasswordSnackOpen(true);

		axios.put(`http://localhost:7000/faculty/flist/changepassword/${username}`,data)
		.then((res)=>{
			setPasswordAlertMes(res.data.message);
			setPasswordAlertStatus('good');
		})
		.catch((err)=>{
			setPasswordAlertMes(JSON.parse(err.request.response).message)
			setPasswordAlertStatus(403)
			
		})
	}


	console.log(passwordAlertMes)
	console.log(passwordAlertStatus)

	const cancelPassword =() =>{
		setPasswordDialogOpen(false);
		setPasswordSnackOpen(true);
		setPasswordAlertMes("Operation canceled")
		setPasswordAlertStatus(403)
	}

	const changePass = () =>(
		<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'100%', height:'350px',backgroundColor:"#E2F0D9"}}>
			<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'90%', height:'90%',backgroundColor:"white",border:'1px solid black',borderRadius:'10px'}}>
				<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'100%', height:'100%'}}>
					<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={passwordSnackOpen} autoHideDuration={2000} onClose={handlePasswordSnackClose}>
						<Alert variant='filled' severity={passwordAlertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
							{passwordAlertMes}
						</Alert>				
					</Snackbar>
					<div  style={{width:'95%', height:'80px'}}className='d-flex flex-column justify-content-center align-items-start' >
						<div  style={{height:'100px'}}className='d-flex flex-row justify-content-center align-items-center' >
							<LockIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
							<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Change Password</p>
						</div>					
					</div>
					<Divider style={{height:'2px', width:'95%', color:'black'}}/>
					<div  style={{width:'80%', height:'200px'}}className='d-flex flex-row justify-content-between align-items-center' >
						<TextField 
							style={{width:'300px',height:'50px'}} 
							id="filled-password-input" 
							type={showCurrPassword ? "text" : "password"} 
							label='Current password' 
							variant='filled' 
							onChange={(e)=>{dispatch({type:'_currPassword', data: e.target.value})}}
							InputProps={{
								endAdornment:(
									<InputAdornment position="end">
										<Tooltip title='Show Password' arrow>
											<IconButton
												aria-label="toggle password visibility"
												onClick ={handleClickShowCurrPassword}
												onMouseDown={handleMouseDownCurrPassword}
											>
												{showCurrPassword ? <Visibility/> : <VisibilityOff/>}
											</IconButton>
										</Tooltip>
											
									</InputAdornment>
								)
							}}
						/>
						<TextField 
							style={{width:'300px',height:'50px'}} 
							id="filled-password-input" 
							type={showNewPassword ? "text" : "password"}  
							label='New password' 
							variant='filled'
							onChange={(e)=>{dispatch({type:'_newPassword', data: e.target.value})}}
							InputProps={{
								endAdornment:(
									<InputAdornment position="end">
										<Tooltip title='Show Password' arrow>
											<IconButton
												aria-label="toggle password visibility"
												onClick ={handleClickShowNewPassword}
												onMouseDown={handleMouseDownNewPassword}
											>
												{showNewPassword ? <Visibility/> : <VisibilityOff/>}
											</IconButton>
										</Tooltip>
											
									</InputAdornment>
								)
							}}
						/>

						<TextField 
							style={{width:'300px',height:'50px'}} 
							id="filled-password-input" 
							type={showVerPassword ? "text" : "password"}
							label='Confirm new password' 
							variant='filled' 
							onChange={(e)=>{dispatch({type:'_verNewPassword', data: e.target.value})}}
							InputProps={{
								endAdornment:(
									<InputAdornment position="end">
										<Tooltip title='Show Password' arrow>
											<IconButton
												aria-label="toggle password visibility"
												onClick ={handleClickShowVerPassword}
												onMouseDown={handleMouseDownVerPassword}
											>
												{showVerPassword ? <Visibility/> : <VisibilityOff/>}
											</IconButton>
										</Tooltip>
											
									</InputAdornment>
								)
							}}
						/>
					</div>
					<Divider style={{height:'2px', width:'95%', color:'black'}}/>
					<div  style={{width:'95%', height:'100px'}}className='d-flex flex-row-reverse justify-content-between align-items-center' >
						<Button title='Save' click={handlePasswordDialog} style={{fontSize:'18px',height:'40px', width:'100px'}}/>
						<Dialog
							open={passwordDialogOpen}
					        onClose={handlePasswordDialogClose}
					        aria-labelledby="alert-dialog-title"
					        aria-describedby="alert-dialog-description"
						>
							<DialogTitle>
								{"Change Password"}
							</DialogTitle>
							<DialogContent>
								Do you want to update your password?
							</DialogContent>
							<DialogActions>
								<Button title='Cancel' click={cancelPassword}/>
								<Button title='Yes' click={passwordHandler}/>
							</DialogActions>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	)

	const profileHandler =()=>{
		setProfileDialogOpen(false);
		setProfileSnackOpen(true);

		const formData = new FormData();

		formData.append('MISimg', imgFile );

		axios.put(`http://localhost:7000/faculty/flist/editprofile/${username}`, data)
		.then((res)=>{
			if(newImage){
				axios.put(`http://localhost:7000/faculty/upload-picture`, formData)
				.then((res)=>{
					setProfileAlertMes(res.data.message);
					setProfileAlertStatus('good');
				})
				.catch((err)=>{
					setProfileAlertMes(JSON.parse(err.request.response).message);
					setProfileAlertStatus(403);
				})
			}
			else{
				setProfileAlertMes(res.data.message);
				setProfileAlertStatus('good');
			}
		})
		.catch((err)=>{
			setProfileAlertMes(JSON.parse(err.request.response).message);
			setProfileAlertStatus(403);
		})
		
	}

	const cancelProfile =() =>{
		setProfileDialogOpen(false);
		setProfileSnackOpen(true);
		setProfileAlertMes("Operation canceled")
		setProfileAlertStatus(403)
	}

	const profileEdit = ()=>(
		<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'900px', height:'100%',backgroundColor:"#E2F0D9"}}>
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={profileSnackOpen} autoHideDuration={2000} onClose={handleProfileSnackClose}>
				<Alert variant='filled' severity={profileAlertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
					{profileAlertMes}
				</Alert>				
			</Snackbar>
			<div className="d-flex justify-content-between align-items-start flex-column" style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey",overflowY:'auto',overflowX:'auto'}}>	
				<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'100%', height:'100%'}}>
					<div  style={{width:'90%', height:'80px'}}className='d-flex flex-column justify-content-center align-items-start' >
						<div  style={{height:'100px'}}className='d-flex flex-row justify-content-center align-items-center' >
							<EditIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
							<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Edit Profile Details</p>
						</div>					
					</div>
					<Divider style={{height:'2px', width:'100%', color:'black'}}/>
					<div style={{height:'90%',width:'90%',color:'black'}} className='d-flex justify-content-center align-items-center flex-row'>
						{facultyData?.map?.(object=>(
							<div style={{height:'100%',width:'100%'}}>	
								<div style={{height:'100%',width:'100%'}} className='d-flex justify-content-between align-items-center flex-row'>
									<div style={{height:'100%',width:'90%'}} className='d-flex justify-content-around flex-column'>
										<div style={{height:'40%',width:'90%'}} className='d-flex justify-content-start flex-column'>
											<div style={{height:'170px',width:'180px', border:'1px solid black'}}>
												<img className="image-img loading" width="178px" height="168px" src={ newImage ?? image }/>
												<input type="file" accept="image/*" onChange={imageOnChange}/>
											</div>
										</div>
										<div style={{width:'300px'}} className='d-flex justify-content-between'>
											<label style={{fontSize:'20px'}}>First Name:</label>
											<Field style={{width:'150px'}} placeHolder={object.firstName} reqOnChange={(e)=>{dispatch({type:'_firstName',data: e.target.value})}}/>
										</div>
										<div style={{width:'300px'}} className='d-flex justify-content-between'>
											<label style={{fontSize:'20px'}}>Middle Initial:</label>
											<Field style={{width:'150px'}} placeHolder={object.middleInitial} reqOnChange={(e)=>{dispatch({type:'_middleInitial',data: e.target.value})}}/>
										</div>
										<div style={{width:'300px'}} className='d-flex justify-content-between'>
											<label style={{fontSize:'20px'}}>Last Name:</label>
											<Field style={{width:'150px'}} placeHolder={object.lastName} reqOnChange={(e)=>{dispatch({type:'_lastName',data: e.target.value})}}/>
										</div>
										<div style={{width:'300px'}} className='d-flex justify-content-between'>
											<label style={{fontSize:'20px'}}>Extention Name:</label>
											<Field style={{width:'150px'}} placeHolder={object.extentionName} reqOnChange={(e)=>{dispatch({type:'_extentionName',data: e.target.value})}}/>
										</div>		
									</div>
									<div style={{height:'100%',width:'90%'}} className='d-flex justify-content-around flex-column'>		
											<div style={{width:'300px'}} className='d-flex justify-content-between flex-column'>
												<label style={{fontSize:'20px'}}>Contact No:</label>
												<div style={{width:'90%'}} className="d-flex justify-content-center align-items-center">
													<Field style={{width:'200px'}} placeHolder={object.contactNo} reqOnChange={(e)=>{dispatch({type:'_contactNo',data: e.target.value})}}/>
												</div>
											</div>	
											<div style={{width:'300px'}} className='d-flex flex-column justify-content-between flex-column'>
												<label style={{fontSize:'20px'}}>Email Address:</label>
												<div style={{height:'100%',width:'90%'}} className="d-flex justify-content-center align-items-center">
													<Field style={{width:'200px'}} placeHolder={object.emailAdd} reqOnChange={(e)=>{dispatch({type:'_emailAdd',data: e.target.value})}}/>
												</div>	
											</div>					
											<div style={{width:'300px'}} className='d-flex justify-content-between flex-column'>
												<label style={{fontSize:'20px'}}>Birthday:</label>
												<div style={{width:'90%'}} className="d-flex justify-content-center align-items-center">
													<label style={{fontSize:'20px'}}>{(() => {
														const date = new Date(object.birthdate);
														return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
													})()}</label>
												</div>	
											</div>
											<div style={{width:'300px'}} className='d-flex justify-content-between flex-column'>
												<label style={{fontSize:'20px'}}>Reg. Date:</label>
												<div style={{width:'90%'}} className="d-flex justify-content-center align-items-center">
													<label style={{fontSize:'20px'}}>{(() => {
														const date = new Date(object.dateRegistered);
														return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
													})()}</label>
												</div>	
											</div>
										</div>
								</div>							
							</div>
						))}
					</div>
					<div style={{height:'10%',width:'100%'}} className='d-flex justify-content-end flex-row align-items-center'>
						<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-end'>
							<Field style={{width:'200px',height:'30px'}} placeHolder='password' reqOnChange={(e)=>{dispatch({type:'_password',data: e.target.value})}}/>
						</div>
						<div style={{height:'100%',width:'25%'}} className='d-flex justify-content-around '>
							<Button style={{height:'30px',width:'150px'}} title='Save Changes' click={handleProfileDialog}/>
							<Dialog
								open={profileDialogOpen}
						        onClose={handleProfileDialogClose}
						        aria-labelledby="alert-dialog-title"
						        aria-describedby="alert-dialog-description"
							>
								<DialogTitle>
									{"Edit Profile Details"}
								</DialogTitle>
								<DialogContent>
									Do you want to update your profile details?
								</DialogContent>
								<DialogActions>
									<Button title='Cancel' click={cancelProfile}/>
									<Button title='Yes' click={profileHandler}/>
								</DialogActions>
							</Dialog>
						</div>
					</div>
				</div>

			</div>
		</div>
	)



	const clearLogs = () =>{
		setLogsDialogOpen(false);
		setLogsSnackOpen(true);
		axios.put(`http://localhost:7000/faculty/flist/clear-logs/${username}`)
		.then(res=>{
			setLogsAlertMes(res.data.message);
			setLogsAlertStatus('good');
		})
		.catch(err=>{
			setLogsAlertMes(JSON.parse(err.request.response).message)
			setLogsAlertStatus(403)
		})

	}

	const cancelLogs =() =>{
		setLogsDialogOpen(false);
		setLogsSnackOpen(true);
		setLogsAlertMes("Operation canceled")
		setLogsAlertStatus(403)
	}

	const actLogs = () =>(
		<div className='d-flex flex-column justify-content-center align-items-center' style={{width:'700px', height:'100%',backgroundColor:"#E2F0D9"}}>
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={logsSnackOpen} autoHideDuration={2000} onClose={handleLogsSnackClose}>
				<Alert variant='filled' severity={logsAlertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
					{logsAlertMes}
				</Alert>				
			</Snackbar>
			<div style={{height:'90%', width:'90%'}}>
				<p style={{fontSize:'36px'}}>Activity Logs</p>
				<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'80%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey",overflowY:'auto',overflowX:'auto'}}>
					<div style={{height:'7%',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white',fontSize:'18px'}} className='d-flex flex-row justify-content-around align-items-center'>
						<div className='col-7 text-center'>
							Activity
						</div>
						<div className='col-1 text-center'>
							Date
						</div>
					</div>
					<div style={{height:'95%',width:'100%',overflowY:'overlay' }} className='d-flex flex-column align-items-start justify-content-start'>	
						{activity?.map?.(object =>(
							<>
								<div className="d-flex flex-row justify-content-around" style={{height:'8%',width:'100%'}}>
									<div className="col-9 text-center">{object.message}</div>
									<div className="col-3 text-center">{object.date}</div>
								</div>
								<Divider style={{height:'2px',width:'100%',backgroundColor:"#385723"}}/>
							</>
						))}
					</div>
				</div>
				<div className='d-flex flex-row-reverse align-items-center ' style={{width:'100%', height:'10%'}}>
					<Button click={handleLogsDialog} style={{width:'100px', height:'40px', fontSize:'18px'}} title='Clear logs'/>
					<Dialog
						open={logsDialogOpen}
				        onClose={handleLogsDialogClose}
				        aria-labelledby="alert-dialog-title"
				        aria-describedby="alert-dialog-description"
					>
						<DialogTitle>
							{"Clear Logs"}
						</DialogTitle>
						<DialogContent>
							Do you want to clear all your activity?
						</DialogContent>
						<DialogActions>
							<Button title='Cancel' click={cancelLogs}/>
							<Button title='Yes' click={clearLogs}/>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	) 

	

	useEffect(()=>{
		axios.get('http://localhost:7000/faculty/flist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.username );
				if( elem.username === username ){
					setFacultyData((facultyData) => [...facultyData, elem]);
				}
			})
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

	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/r-count/${username}`)
		.then(res=>{
			setACount(res.data.aCount);
			setPCount(res.data.pCount);
		})
		.catch(err=>{
			console.log(err);
		})
	},[])

	useEffect(()=>{
		axios.get(`http://localhost:7000/faculty/flist/activity/${username}`)
		.then(res=>{
			setActivity(res.data.data)
		})
		.catch(err=>{
			console.log(err);
		})
	},[])

	useEffect(() =>{
		axios.get(`http://localhost:7000/clist/picture`)
		.then( res => {
			setImage( () => res.data.path );			
		})
		.catch( err => {
			console.log( err );
		});
	}, []);

	const toggleDrawer = (open) => (event) => {
		setDrawerState( open );
	}

	const toggleProfileDrawer = (open) => (event) => {
		setProfileState( open );
	}

	const toggleActDrawer = (open) => (event) => {
		setActState( open );
	}
	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'100%', width:'100%'}} className='d-flex justify-content-center align-items-center flex-row'>
						<div className='d-flex justify-content-center align-items-center' style={{width:'50%',height:'100%'}}> 
							<div className='d-flex justify-content-center align-items-center flex-column' style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey"}}>
								<div className="d-flex justify-content-center align-items-center" style={{height:'100%', width:'100%'}}>
									<div className='d-flex justify-content-around align-items-center flex-column' style={{height:'90%', width:'90%'}}>
										<Avatar style={{height:'100px',width:'100px'}} src={image}/>
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										{facultyData?.map?.(object=>(
											<div className="d-flex align-items-center justify-content-center flex-column" style={{width:'100%',height:'60%',color:'black'}}>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<BadgeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Name:</label>
													<label style={{fontSize:'20px'}}>{name ?? 'Loading'}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<CakeIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Birthday:</label>
													<label style={{fontSize:'20px'}}>{(() => {
																const date = new Date(object.birthdate);
																return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
													</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<ContactPhoneIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Contact No. :</label>
													<label style={{fontSize:'20px'}}>{object.contactNo}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<ContactMailIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Email Address:</label>
													<label style={{fontSize:'20px'}}>{object.emailAdd}</label> 
												</div>
												<div style={{height:'15%',width:'100%'}} className='d-flex flex-row justify-content-start'>
													<CalendarTodayIcon sx={{color:green[500]}}/>
													<label style={{fontSize:'20px'}}>Date Registered:</label>
													<label style={{fontSize:'20px'}}> {(() => {
																const date = new Date(object.dateRegistered);
																return `${date.getDate()+1}-${date.getMonth() + 1}-${date.getFullYear()}`
															})()}
													</label> 
												</div>
											</div>
										))}
										<Divider style={{height:'2px', width:'100%', color:'black'}}/>
										<Divider style={{height:'10px', width:'100%'}}/>
										<div className='d-flex flex-row-reverse justify-content-around' style={{width:'100%'}}>
											<Button style={{height:'30px',width:'150px'}} click={toggleDrawer(true)} title='Change Password'/>
											<Drawer
												anchor={'bottom'}
												open={drawerState}
												onClose={toggleDrawer(false)}
											>
												{changePass()}
											</Drawer>
											<Button style={{height:'30px',width:'150px'}} click={toggleProfileDrawer(true)} title='Edit Details'/>
											<Drawer
												anchor={'left'}
												open={profileState}
												onClose={toggleProfileDrawer(false)}
											>
												{profileEdit()}
											</Drawer>
										</div>
									</div>
								</div>			
							</div>
						</div>
						<div className='d-flex justify-content-center align-items-center flex-column' style={{width:'50%',height:'100%'}}> 
							<div className='d-flex justify-content-center align-items-center flex-column' style={{width:'100%',height:'100%'}}> 
								<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey",color:'black'}}>
										<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%'}}>
											<div className='d-flex justify-content-around align-items-start flex-column' style={{height:'90%', width:'90%'}}>
												<p style={{fontSize:'28px',textAlign:'left',height:'5px'}}>Activity Logs</p>
												<Divider style={{height:'2px', width:'100%', color:'black'}}/>
												<div className='d-flex justify-content-start align-items-start' style={{height:'60%', width:'100%',overflowY:'auto',overflowX:'auto'}}>		
													<div className="d-flex flex-column justify-content-start" style={{width:'100%', height:'100%',overflowY:'auto',overflowX:'auto'}}>
														{activity?.map?.(object =>(
															<div className='d-flex justify-content-between flex-row' style={{width:'100%',height:'25px'}}>
																<div style={{width:'70%',height:'20%'}}>{object.message}</div>
																<div style={{width:'20%',height:'20%'}}>{object.date}</div>
															</div>
														))}
													</div>
												</div>
												<Divider style={{height:'2px', width:'100%', color:'black'}}/>
												<div className="d-flex flex-row justify-content-end" style={{width:'100%', height:'15%'}}>
													<Button style={{height:'30px',width:'100px'}} click={toggleActDrawer(true)} title='See All'/>
													<Drawer
														anchor={'right'}
														open={actState}
														onClose={toggleActDrawer(false)}
													>
														{actLogs()}
													</Drawer>
												</div>
											</div>
											
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



