import React,{useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';



//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';

//mui component
import { green } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email'
import Divider from '@mui/material/Divider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';



export default function AdminRequest( props ){
	const {username} = useParams();

	const [requests, setRequests] = useState([]);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [snackOpen, setSnackOpen] =useState(false);

	const handleSnack = () =>{
		setSnackOpen(true);
	}

	const handleSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setSnackOpen(false);
		setAlertMes(null);
	}

	
	const handleDialog = () =>{
		setDialogOpen(true)
	}

	const handleDialogClose = () =>{
		setDialogOpen(false)
	}

	useEffect(() => {
		const getRequests = setInterval(() => {
			axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/c-views`)
			.then( res => {
				if( !requests.length ){
					setRequests([...res.data.reqViews]);
				}
				else{
					res.data.reqViews.forEach( req => {						
						if( !requests.map( r => r.id ).includes( req.id ) ){
							setRequests( requests => [...requests, res]);
						}
					});
				}
			})
			.catch( err => {
				console.log(err);
				clearInterval( getRequests );
			})
		}, 3000);

		return () => clearInterval( getRequests );
	}, []);

	const clear = () =>{
		setDialogOpen(false);
		setSnackOpen(true);

		axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/clear-requests`)
		.then((res)=>{
			setAlertMes( res.data.message );
			setAlertStatus('good')
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex flex-column justify-content-center align-items-center'>
				
				<div style={{height:'95%', width:'95%', backgroundColor:'white', overflowY: 'auto'}} className='d-flex flex-column justify-content-center align-items-center'>
					<div className="d-flex justify-content-around align-items-center flex-column" style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey",overflowY:'auto',overflowX:'auto'}}>
						<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
									<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
										{alertMes}
									</Alert>				
								</Snackbar>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<EmailIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px',color:'black'}}>Student Requests for Full Content</p>
								</div>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<Button style={{width:'100px',height:'30px'}} click={handleDialog} title="Clear All"/>
									<Dialog
										open={dialogOpen}
								        onClose={handleDialogClose}
								        aria-labelledby="alert-dialog-title"
								        aria-describedby="alert-dialog-description"
									>
										<DialogTitle>
											{"Clear all requests"}
										</DialogTitle>
										<DialogContent>
											Do you want to delete all requests?
										</DialogContent>
										<DialogActions>
											<Button title='Cancel' click={cancelOp}/>
											<Button title='Yes' click={clear}/>
										</DialogActions>
									</Dialog>
								</div>						
							</div>
						<Divider style={{height:'2px', width:'100%', color:'black'}}/>
						<div style={{height:'80%', width:'95%', backgroundColor:'#70AD47', border:'1px solid black', overflowY: 'auto'}} className='d-flex flex-column justify-content-start align-items-center'>
							<Header/>
							<div className="d-flex flex-column" style={{height:'100%', width:'100%',backgroundColor:'white',overflowY:'overlay',overflowX:'overlay'}}>									
								{
									requests?.map?.( req => <Request setRequests={setRequests} key={req.id} {...req}/>)
								}
							</div>	
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


const Header = ( props ) => {
	return(
		<div 
			style={{
				width: '100%', 
				height: '35px', 
				border: '1px solid black',
				backgroundColor: '#385723',
				color: 'white'
			}}

			className="d-flex flex-row justify-content-around align-items-center"
		>
			<div className="col-1 text-center"><p className="p-0 m-0"> Student No. </p></div>
			<div className="col-3 text-center"><p className="p-0 m-0"> Student Name </p></div>
			<div className="col-5 text-center"><p className="p-0 m-0"> Title </p></div>
			<div className="col-1 text-center"><p className="p-0 m-0"> Date </p></div>
			<div className="col-1 text-center">Approve</div>
			<div className="col-1 text-center">Decline</div>
		</div>
	);
}
 

const Request = ( props ) => {

	const {username} = useParams();

	const [approved, setApproved] = useState([])
	const [approvedTitle, setApprovedTitle] = useState([])
	const [declined, setDeclined] = useState([])
	const [declinedTitle, setDeclinedTitle] = useState([])
	const [sendApproved, setSendApproved] = useState(false);
	const [sendDeclined, setSendDeclined] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [snackOpen, setSnackOpen] =useState(false);

	const handleSnack = () =>{
		setSnackOpen(true);
	}

	const handleSnackClose = (evernt , reason) =>{
		if(reason === 'clickaway') {
			return;
		}

		setSnackOpen(false);
		setAlertMes(null);
	}

	
	const handleDialog = () =>{
		setDialogOpen(true)
	}

	const handleDeclineDialog = () =>{
		setDeclineDialogOpen(true)
	}

	const handleDialogClose = () =>{
		setDialogOpen(false)
	}

	const handleDeclineDialogClose = () =>{
		setDeclineDialogOpen(false)
	}

	const today = new Date();

	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	useEffect(()=>{
		if( sendApproved ){
			setApproved((approved) => [...approved, props.id]);
			setApprovedTitle((approvedTitle) => [...approvedTitle, props.title]);
		}
	}, [sendApproved]);

	useEffect(() => {
		if( approved ){
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/approved/${props.studentID}/${date}/${[...approvedTitle]}`, approved) 
			.then( res => {
				setAlertMes( res.data.message );
				setAlertStatus('good')
				setSendApproved( false );
			})
			.catch((err)=>{console.log(err)});
		}
	}, [approved])

	useEffect(()=>{
		if( sendDeclined ){
			setDeclined((declined) => [...declined, props.id]);
			setDeclinedTitle((declinedTitle) => [...declinedTitle, props.title]);
		}
	}, [sendDeclined]);

	useEffect(() => {
		if( declined ){
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/declined/${props.studentID}/${[...declinedTitle]}`, declined) 
			.then( res => {
				setAlertMes( res.data.message );
				setAlertStatus('good')
				setSendApproved( false );
			})
			.catch((err)=>{console.log(err)});
		}
	}, [declined])


	const approve = async () => {
		setDialogOpen(false);
		setSnackOpen(true);
		setSendApproved( true );
	}

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}

	const cancelDecline =() =>{
		setDeclineDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}

	const decline = async () => {
		setDeclineDialogOpen(false);
		setSnackOpen(true);
		setSendDeclined( true );
	}

	return(
		<div 
			style={{
				width: '100%', 
				height: '30px', 
				color: 'black',
				backgroundColor: '#E2F0D9',
				border:'1px solid black',
				borderRadius:'10px'
			}} 
			className="d-flex flex-row justify-content-around align-items-center"
		>
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
				<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
					{alertMes}
				</Alert>				
			</Snackbar>
			<div className="col-1 text-center"><p className="p-0 m-0"> { props.studentID } </p></div>
			<div className="col-3 text-center"><p className="p-0 m-0"> { props.studentName } </p></div>
			<div className="col-5 text-center"><p className="p-0 m-0"> { props.title } </p></div>
			<div className="col-1 text-center"><p className="p-0 m-0"> { props.dateRequested } </p></div>
			<div className="col-1 text-center">
				<Tooltip title="Approve Request" arrow >
					<IconButton
					size="large"
					edge="end"
					color={"inherit"}
					aria-label="menu"
					sx={{ mr: 2,color:green[500] }}
					>
	           	 		<ThumbUpIcon style={{height: '25px',width:'25px'}} onClick={handleDialog}/>
	           	 	</IconButton>
				</Tooltip>
           	 	<Dialog
					open={dialogOpen}
			        onClose={handleDialogClose}
			        aria-labelledby="alert-dialog-title"
			        aria-describedby="alert-dialog-description"
				>
					<DialogTitle>
						{"Approve Research Request"}
					</DialogTitle>
					<DialogContent>
						Do you want to approve {props.studentName}'s request to view {props.title}?
					</DialogContent>
					<DialogActions>
						<Button title='Cancel' click={cancelOp}/>
						<Button title='Yes' click={approve}/>
					</DialogActions>
				</Dialog>
			</div>
			<div className="col-1 text-center">
				<Tooltip title='Decline Request' arrow>
					<IconButton
					size="large"
					edge="end"
					color={"inherit"}
					aria-label="menu"
					sx={{ mr: 2,color:green[500] }}
					>
	           	 		<ThumbDownIcon style={{height: '25px',width:'25px'}} onClick={handleDeclineDialog}/>
	           	 	</IconButton>
				</Tooltip>
           	 	<Dialog
					open={declineDialogOpen}
			        onClose={handleDeclineDialogClose}
			        aria-labelledby="alert-dialog-title"
			        aria-describedby="alert-dialog-description"
				>
					<DialogTitle>
						{"Decline Research Request"}
					</DialogTitle>
					<DialogContent>
						Do you want to decline {props.studentName}'s request to view {props.title}?
					</DialogContent>
					<DialogActions>
						<Button title='Cancel' click={cancelDecline}/>
						<Button title='Yes' click={decline}/>
					</DialogActions>
				</Dialog>
			</div>
			{/*<div className="col-1 text-center"><Button click={decline} title="Decline"/></div>*/}
		</div>
	);
}

