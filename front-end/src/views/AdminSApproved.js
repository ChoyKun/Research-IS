import React,{useState, useEffect, Suspense,useReducer,useContext} from 'react';
import { Link, Redirect,useParams} from 'react-router-dom';
import axios from '../modules/config.js';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';
import FilterContext from '../contexts/filter-context';


//mui components
import Search from '../components/contents/Search';
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
import SchoolIcon from '@mui/icons-material/School';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function RListFilter(props){
	const {username, studentNo} = useParams();
	const filter = useContext( FilterContext );

	const [researchData, setResearchData] = useState([]);
	const [filteredData, setFilteredData] = useState( [] );
	const [search, setSearch] = useState( '' );
	const [name, setName] = useState(null);

	const initState = {
		course: 'BSIT',
		category: [],
		yearSubmitted: 'null',
		order: 'A-Z',
		year: 'Newest'
	}

	useEffect(() => {
		axios.get(`http://localhost:7000/student/slist/${studentNo}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, [])
	
	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/approved-list/${studentNo}`)
		.then((res)=>{
			// console.log( res.data );
			setResearchData( res.data.data );
		})
		.catch((err)=>{
			throw err;
		});
	},[])

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
				axios.get(`http://localhost:7000/filter-query/${course}/${category}/${yearSubmitted}/${order}/${year}`)
				.then( res => {
					res.data.result.forEach( item => {
						result.push(<Item key={item._id} object={item}/>);
					});

					setFilteredData([...result]);
				})
			}
			else if(!filter.sFilter){
				researchData.forEach( item =>{
					if( item.title.toLowerCase().startsWith(search?.[0]?.toLowerCase?.() ?? '') && item.title.toLowerCase().includes(search.toLowerCase())){
						result.push( <Item key={item._id} object={item}/> );
					}
				});

				setFilteredData([...result]);
			}



		}

		handleSearch();			

	}, [search, researchData, filter.sFilter]);

	const reducer = (state, action) => {
		switch( action.type ){
			case 'course':
				state.course = action.data;
				return state;

			case 'section':
				state.section = action.data;
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

			default:
				throw new Error(`Action type "${action.type}" is not recognized`);
		}
	}

	const [state, dispatch] = useReducer(reducer, initState);

	const rFilter = () =>(
		<div className="d-flex justify-content-center flex-column" style={{height:'400px',width:'300px',backgroundColor:"#E2F0D9"}}>
			<div className="d-flex justify-content-center align-items-center" style={{height:'95%',width:'100%'}}>
				<div className="d-flex justify-content-center align-items-center" style={{height:'100%',width:'95%',border:'1px solid black',backgroundColor:'white',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}} className='d-flex justify-content-center flex-column'>
					<h3 style={{width:'95%',color:'black'}}>Filters:</h3>
					<Divider style={{height:'2px', width:'100%', color:'black'}}/>
					<div className='d-flex flex-row' style={{width:'100%',height:'70%'}}>
						<div className='d-flex flex-column justify-content-center align-items-center' style={{height:'100%',width:'100%'}}>
							<div className='d-flex flex-column justify-content-around align-items-start' style={{height:'100%',width:'80%'}}>
								<Select 
									className='sfilterCourse' 
									label='Course:' 
									options={['BSIT','BSCS']}
									reqOnChange={e => dispatch({type: 'course', data: e.target.value})}
								/>
								<div style={{ height:'40px',width:'500px', color:'black'}} className='d-flex flex-row'>
									<label>Section: </label>
									<Field style={{ height:'25px',width:'50px', color:'black'}} reqOnChange={e => dispatch({type: 'section', data: e.target.value})}/>
								</div>
								<Select 
									className='sfilterCourse' 
									label='Sex:' 
									options={['Male','Female']}
									reqOnChange={e => dispatch({type: 'sex', data: e.target.value})}
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
					</div>
					<div className='d-flex flex-row-reverse  align-items-start' style={{height:'5%',width:'95%'}}>					
						<Button style={{width:'100px',height:'30px'}} title='Filter' click={() => {
							filter.setSFilter( state );
						}}/>
					</div>
				</div>
			</div>
		</div>
	)

	

	return(
		<>
			<Search setSearch={setSearch} list={rFilter()} placeHolder='Enter first name or last name' />
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				
				<div className="d-flex justify-content-center align-items-center" style={{height:'90%', width:'95%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'98%', width:'97%'}}>
						<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}}>
							<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<LocalLibraryIcon sx={{color:green[500],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>{name}'s Approved Researches</p>
								</div>				
							</div>
							<div className="d-flex flex-column" style={{height:'80%', width:'95%',border:'1px solid black'}}>
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

function Loading(props){
	return(
		<div>
			loading
		</div>
	);
}



function Item(props){
	const {username, studentNo} = useParams();

	const [remove, setRemove] = useState([])
	const [removeTitle, setRemoveTitle] = useState([])
	const [sendRemove, setSendRemove] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [snackOpen, setSnackOpen] =useState(false);
	const [name, setName] = useState(null);

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
		axios.get(`http://localhost:7000/student/slist/${studentNo}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, [])

	useEffect(()=>{
		if( sendRemove ){
			setRemove((remove) => [...remove, props.object._id]);
			setRemoveTitle((removeTitle) => [...removeTitle, props.object.title]);
		}
	}, [sendRemove]);

	useEffect(() => {
		if( remove ){
			axios.put(`http://localhost:7000/coordinator/clist/remove-approved/${studentNo}/${[...removeTitle]}`, remove) 
			.then( res => {
				setAlertMes( res.data.message );
				setAlertStatus(200)
				setSendRemove( false );
			})
			.catch((err) =>{
				if(err?.response?.data?.message){
					setAlertMes(`${ err?.response?.data?.message}`)
					setAlertStatus(200) 
				} 
			});
		}
	}, [remove])

	const sender = () =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setSendRemove(true);
	}

	const cancelOp =() =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}


	return(
		<div className="d-flex flex-row justify-content-around" style={{border:'1px solid black',backgroundColor: '#E2F0D9',borderRadius:'10px'}}>
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
				<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
					{alertMes}
				</Alert>				
			</Snackbar>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<div className="col-2 text-center">{props.object.dateApproved}</div>
			<div className="col-1 text-center">	
				<IconButton
					size="small"
					edge="end"
					color="inherit"
					aria-label="menu"
					sx={{ color:green[500],mr: 2 }}
					>
	           	 		<RemoveCircleIcon style={{height: '25px',width:'25px'}} onClick={handleDialog}/>
	           	 	</IconButton>
				<Dialog
					open={dialogOpen}
			        onClose={handleDialogClose}
			        aria-labelledby="alert-dialog-title"
			        aria-describedby="alert-dialog-description"
				>
					<DialogTitle>
						{"Remove Permission"}
					</DialogTitle>
					<DialogContent>
						Do you want to remove {name}'s permission to view {props.object.title}?
					</DialogContent>
					<DialogActions>
						<Button title='Cancel' click={cancelOp}/>
						<Button title='Yes' click={sender}/>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}


function RListHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#385723',color:'white'}} className='d-flex flex-row justify-content-around'>
			<div className='col-2 text-center'>
				Title
			</div>
			<div className='col-1 text-center'>
				Course
			</div>
			<div className='col-4 text-center'>
				ResearchCategories
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-2 text-center'>
				Date Approved
			</div>
			<div className='col-1 text-center'>
				Remove
			</div>
		</div>
	);
}
