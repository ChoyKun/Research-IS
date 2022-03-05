import React,{useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';


//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import ActSearch from '../components/contents/ActSearch';

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

export default function AdminRequest( props ){
	const {username} = useParams();


	const [requests, setRequests] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState( '' );

	useEffect(()=>{
		axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/actlog-views`)
		.then( res => {
			let result = [];
			res.data.reqViews.forEach( data =>{
				if( 
					data.message.toLowerCase().includes(search?.toLowerCase()) || 
					data.date.toLowerCase().includes(search.toLowerCase())
				){
					result.push(<Request key={data.id} object={data}/>)
				}	
			})

			setRequests([...result])	
		})
		.catch( err => {
			console.log(err);
		})
	},[search])

	console.log(requests)


	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex flex-column justify-content-between align-items-center'>
				<ActSearch setSearch={setSearch} placeHolder='Enter date or activity' />
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black', overflowY: 'auto'}} className='d-flex flex-column justify-content-center align-items-center'>
					<div className="d-flex justify-content-around align-items-center flex-column" style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey",overflowY:'auto',overflowX:'auto'}}>
						<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
							<div className="d-flex flex-row align-items-center justify-content-center">
								<EmailIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
								<p style={{fontSize:'30px', textAlign:'center',height:'24px',color:'black'}}>Coordinator's Activity Archive</p>
							</div>						
						</div>
						<Divider style={{height:'2px', width:'100%', color:'black'}}/>
						<div style={{height:'80%', width:'95%', border:'1px solid black', overflowY: 'auto'}} className='d-flex flex-column justify-content-start align-items-center'>
							<Header/>
							<div className="d-flex flex-column" style={{height:'100%', width:'100%',backgroundColor:'#70AD47',overflowY:'overlay',overflowX:'overlay'}}>									
								{ 
									requests
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
			<div className="col-6 text-center"><p className="p-0 m-0"> Activity </p></div>
			<div className="col-2 text-center"><p className="p-0 m-0"> Date </p></div>
		</div>
	);
}

const Request = ( props ) => {
	return(
		<div 
			style={{
				width: '100%', 
				height: '10%', 
				color: 'black',
				backgroundColor: '#E2F0D9',
				border:'1px solid black',
				borderRadius:'10px',
			}} 
			className="d-flex flex-row justify-content-around align-items-center"
		>
			<div className="col-6 text-center"> { props.object.message }</div>
			<div className="col-2 text-center"> { props.object.date }</div>
		</div>
	);
}
