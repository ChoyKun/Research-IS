import React,{useState, useEffect, Suspense, useContext, useReducer} from 'react';
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
import Search from '../components/contents/Search';
import Checkbox from '../components/fields/checkbox';
import Select from '../components/fields/select';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { green } from '@mui/material/colors';
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
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';



export default function StudentRList(props){
	const {username} = useParams();
	const filter = useContext( FilterContext );

	const [researchData, setResearchData] = useState([]);
	const [filteredResearch, setFilteredResearch] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState( '' );
	const [sendPublic, setSendPublic] = useState(false);
	const [pubAccum, setPubAccum]= useState([])
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
	

	const initState = {
		course: 'all',
		category: [],
		yearSubmitted: 'null',
		order: 'A-Z',
		year: 'Newest'
	}

	const reducer = (state, action) => {
		switch( action.type ){
			case 'course':
				state.course = action.data;
				return state;

			case 'category':
				if( state.category.length ){
					if( state.category.includes( action.data ) ){
						state.category = state.category.filter( elem => elem !== action.data );
					}
					else{
						state.category.push( action.data );						
					}
				}
				else{
					state.category.push( action.data );						
				}

				return state;

			case 'yearSubmitted':
				state.yearSubmitted = action.data;
				return state;

			case 'order':
				state.order = action.data;
				return state;

			case 'year':
				state.year = action.data;
				return state;
			case 'reset':
				state = {
					course: 'all',
					category: [],
					yearSubmitted: 'null',
					order: 'A-Z',
					year: 'Newest'
				}

				filter.setSFilter( null );

				return state;

			default:
				throw new Error(`Action type "${action.type}" is not recognized`);
		}
	}

	const [state, dispatch] = useReducer(reducer, initState);


	const rFilter = () =>(
		<div style={{height:'400px',width:'500px',border:'1px solid black',backgroundColor:'white',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}} className='d-flex justify-content-center flex-column'>
					<h3 style={{width:'95%',color:'black'}}>Filters:</h3>
					<Divider style={{height:'2px', width:'100%', color:'black'}}/>
					<div className='d-flex flex-row' style={{width:'100%',height:'70%'}}>
						<div className='d-flex flex-column justify-content-center align-items-center' style={{height:'100%',width:'50%'}}>
							<div className='d-flex flex-column justify-content-around align-items-start' style={{height:'100%',width:'80%'}}>
								<Select 
									className='sfilterCourse' 
									label='Course:' 
									options={['BSIT','BSCS']}
									reqOnChange={e => dispatch({type: 'course', data: e.target.value})}
								/>
								<div style={{ height:'40px',width:'100px', color:'black'}} className='d-flex flex-row'>
									<label style={{height:'40px',width:'300px'}}>Year: </label>
									<Field style={{ height:'25px',width:'100px', color:'black'}} type="number" placeHolder='ex. 2001' reqOnChange={e => dispatch({type: 'yearSubmitted', data: e.target.value})}/>
								</div>
								<div style={{width:'100%', color:'black'}}>
									<Select width='55px' className='sfilterAlphabetical' label='Sort from:' options={['A-Z','Z-A']}reqOnChange={e => dispatch({type: 'order', data: e.target.value})}/>
								</div>
								<div style={{width:'100%', color:'black'}}>
									<Select width='80px' className='sfilterYear' label='Sort by year:' options={['Newest','Oldest']} reqOnChange={e => dispatch({type: 'year', data: e.target.value})}/>
								</div>
							</div>
						</div>
						<div className='d-flex flex-column justify-content-start align-items-start' style={{height:'100%',width:'50%'}}>
							<p>Research Categories</p>
							<div style={{height:'80%',width:'95%',border:'1px solid black',backgroundColor:'white',borderRadius:'15px'}} className='d-flex justify-content-around align-items-center flex-column'>
								<div style={{height:'100%',width:'95%'}} className='d-flex justify-content-around align-items-start flex-column'>
									<Checkbox cLabel='Hardware' value="Hardware" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
									<Checkbox cLabel='Software' value="Software" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
									<Checkbox cLabel='Web System' value="Web System" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
									<Checkbox cLabel='Game Dev' value="Game Dev" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
									<Checkbox cLabel='Augmented Reality'value="Augmented Reality" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
									<Checkbox cLabel='Mobile App' value="Mobile App" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
								</div>
							</div>
						</div>
					</div>
					<div className='d-flex flex-row-reverse  align-items-start' style={{height:'5%',width:'95%'}}>					
						<Button style={{width:'100px',height:'30px'}} title='Filter' click={() => {
							filter.setSFilter( state );
						}}/>
					</div>
				</div>
	)

	// const removeFilter = () =>{
	// 	filter.setSFilter( initState );
		
	// }


	useEffect(()=>{
		const getResearchList = async () => {
			axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/research/rlist`)
			.then((res)=>{
				res.data.forEach( elem => {
					console.log( elem.status );
					if( elem.status === 'archive' ){
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

	useEffect(() => {
		let result = [];

		const handleSearch = async () => {
			
			if( filter.sFilter ){
				const { 
					course,
					category,
					yearSubmitted,
					order,
					year
				} = filter.sFilter;

				// ?course=${course}&category=${category}&yearSubmitted=${yearSubmitted}&order=${order}&year=${year}
				axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/archive-filter-query/${course}/${category}/${yearSubmitted}/${order}/${year}`)
				.then( res => {
					res.data.result.forEach( item => {
						result.push(<Item key={item._id} object={item}/>);
						setFilteredResearch((filteredResearch)=>[...filteredResearch, item])
					});

					setFilteredData([...result]);
				})
			}
			else if(!filter.sFilter){
				const filteredItem = []

				researchData.forEach( item =>{
					if( item.title.toLowerCase().startsWith(search?.[0]?.toLowerCase?.() ?? '') && item.title.toLowerCase().includes(search.toLowerCase())){
						result.push( <Item key={item._id} object={item}/> );
						filteredItem.push(item)

						setFilteredResearch([...filteredItem])
					}
				});

				setFilteredData([...result]);
			}



		}

		handleSearch();			

	}, [search, researchData, filter.sFilter]);

	useEffect(()=>{
		if( sendPublic ){
			const newArchiveElems = []
			filteredResearch.forEach((elem) => {
				if(elem.status === 'public') {
					console.log('here')
					setPubAccum((pubAccum) => [...pubAccum, elem])
				}
				else{
					newArchiveElems.push( elem );
				}
				
			});
			setResearchData(() => [...newArchiveElems])		
			console.log( pubAccum );	
		}

	}, [sendPublic])


	useEffect(() => {
		if( pubAccum.length ){
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/research/rlist/update`, pubAccum)
			.then( res => {
				setAlertMes( res.data.message );
				setAlertStatus('good');
				setSendPublic( false );
			})
			.catch((err)=>{
				console.log(err)
			});
		}
	}, [pubAccum])

	const sender = () =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setSendPublic(true);
	}
	
	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}


	console.log(filter.sFilter)

	return(
		<>
			<Search setSearch={setSearch} list={rFilter()} reset={() => dispatch({ type: 'reset' })} placeHolder='Enter Research Title' />			
			<div style={{width: '100%', height: '90%'}} className='d-flex justify-content-center align-items-center'>
				<div className="d-flex justify-content-center align-items-center" style={{height:'90%', width:'95%', backgroundColor:'white', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'98%', width:'97%'}}>
						<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey"}}>
							<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
									<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
										{alertMes}
									</Alert>				
								</Snackbar>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<LocalLibraryIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Hidden Researches</p>
								</div>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<Button style={{width:'100px',height:'30px'}} click={handleDialog} title="Publish"/>
									<Dialog
										open={dialogOpen}
								        onClose={handleDialogClose}
								        aria-labelledby="alert-dialog-title"
								        aria-describedby="alert-dialog-description"
									>
										<DialogTitle>
											{"Deactivate Account/s"}
										</DialogTitle>
										<DialogContent>
											Do you want to update the list and publish selected researches?
										</DialogContent>
										<DialogActions>
											<Button title='Cancel' click={cancelOp}/>
											<Button title='Yes' click={sender}/>
										</DialogActions>
									</Dialog>
								</div>						
							</div>
							<div className="d-flex flex-column" style={{height:'80%', width:'95%',border:'1px solid black'}}>
								<RListHeader researchData={filteredResearch}/>
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


function Loading(props){
	return(
		<div>
			loading
		</div>
	);
}

function Item(props){
	const { username, id } = useParams();

	const [pending, setPending] = useState([])
	const [sendPend, setSendPend] = useState(false);
	const [url, setUrl] = useState(null)
	const [name, setName] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [open, setOpen] = useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [snackOpen, setSnackOpen] =useState(false);

	const toggleDrawer = (open) => (event) => {
		setOpen( open );
	}

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
	
	useEffect(() => {
		const token = Cookies.get('token');

		axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/check-research-state/${username}/${props.object._id}`)
		.then((res)=>{
			setUrl(`/research-full`)
		})
		.catch((err)=>{
			setUrl(`/research-abstract`)
		})
	}, [])

	const list = ()=>(
		<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'900px',backgroundColor:"#E2F0D9"}}>
			<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'95%',width:'90%',border:'1px solid black',backgroundColor:'white',borderRadius:'10px'}}>
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
						<Link to={`/research-full/${props.object._id}`}><Button title="View Document" style={{height:'40px'}}/></Link>
					</div>
				</div>
			</div>
		</div>
	)

	useEffect(()=>{
		const token = Cookies.get('token');

		const checkFile = async () => {
			axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/disable/${username}/${props.object._id}`)
			.then((res)=>{
				setDisabled(true)
			})
			.catch((err)=>{
				console.log(err);
			});
		}

		checkFile();
	},[])

	useEffect(() => {
		const token = Cookies.get('token'); 

		axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/${username}`,{
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})

		axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/check-research-state/${username}/${props.object._id}`)
		.then((res)=>{
			setUrl(`/research-full`)
		})
		.catch((err)=>{
			setUrl(`/research-abstract`)
		})	
	},[])


	useEffect(()=>{
		if( sendPend ){
			setPending((pending) => [...pending, props.object._id]);
		}
	}, [sendPend]);

	useEffect(() => {
		const token = Cookies.get('token')

		if( pending ){
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/student/slist/pending/${username}/${props.object.title}`, pending,{
			headers: {
				authorization: `Bearer ${token}`
			}
		}) 
			.then( res => {
				setSendPend( false );
			})
			.catch((err) =>{
				console.log( err.response );
				if(err?.response?.data?.message) alert(`${ err?.response?.data?.message}`) 
			});
		}
	}, [pending])

	const requestForView = async () => {

		const today = new Date();

		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		console.log(date);

		const data = {
			id: props.object._id,
			studentID: username,
			studentName: name,
			title: props.object.title,
			state: 'pending',
			dateRequested: date
		};

		setAlertMes(`You requested "${data.title}" for full content viewing,\nApproval of admin is required for full content.\nThank you for your patience`);

		axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/request-view`, {data})
		.catch( err => {
			console.log( err );
		});

		setSendPend(true);

		handleSnack();
	}

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'public' : 'archive';
	}
	
	return(
		<div style={{height:'30px',width:'100%',backgroundColor:'#E2F0D9',border:'1px solid black',borderRadius:'10px'}} className="d-flex flex-row justify-content-around">
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
				<Alert variant='filled' severity='info' sx={{width:'500px'}}>
					{alertMes}
				</Alert>				
			</Snackbar>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange} name='chk'/></div>
			<div className="col-4 text-center">{props.object.title}</div>
			<div className="col-4 text-center">{props.object.researchCategories }</div>
			<div className="col-1 text-center">{props.object.yearSubmitted}</div>			
			<div className="col-1 d-flex justify-content-center align-items-center text-center">
				<Tooltip title="View Document" arrow>
					<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2,color:'#385723' }}
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
				{/*<Button style={{width:'90px'}} click={requestForView} disabled={disabled} className={`col-1 text-center`} title='Request'/>*/}
			</div>
		</div>
	);
}

function RListHeader(props){

	const handleSelectAll = (e) =>{
		var elem = document.getElementsByName('chk')
		var selectAll = document.getElementById('selectAll')

		for(var i=0;i<elem.length;i++){
			if(selectAll.checked == true){
				elem[i].checked = true;
			}
			else{
				elem[i].checked = false;
			}
			console.log(elem[i].checked)			
		}

		props.researchData?.forEach(object =>{
			const result = []

			result.push(object)

			for(var i=0;i<result.length;i++){
				if(elem[i].checked == true){
					object.status = 'public';
				}
				else{
					object.status = 'archive';
				}
				console.log(object.status)					
			}
			
		})
		
	}

	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black',color:"white", backgroundColor:'#385723'}} className='d-flex flex-row justify-content-start'>
			<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-around'>
				<div className="col-1 text-center">
					<Checkbox reqOnChange={handleSelectAll} cLabel='Select All' id='selectAll'/>
				</div>
				<div className='col-4 text-center'>
					Title
				</div>
				<div className='col-4 text-center'>
					ResearchCategories
				</div>
				<div className='col-1 text-center'>
					Year Submitted
				</div>
				<div className="col-1 text-center">
					View Details
				</div>
			</div>
		</div>
	);
}
