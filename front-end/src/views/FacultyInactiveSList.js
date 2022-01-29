import React,{useState, useRef, useEffect, Suspense, useContext, useReducer} from 'react';
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
import SchoolIcon from '@mui/icons-material/School';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





export default function StudentRList(props){
	const {username} = useParams();
	const filter = useContext( FilterContext );

	const [studentData, setStudentData] = useState( [] );
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch]=useState('');
	const [sendInactive, setSendInactive] = useState(false);
	const [inacAccum, setInacAccum]= useState([])
	const [dialogOpen, setDialogOpen] = useState(false);
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

	const handleDialogClose = () =>{
		setDialogOpen(false)
	}
	

	const initState = {
		course: 'BSIT',
		section:'null',
		yearLevel: 'all',
		order: 'A-Z',
		sex:'Male',
		year: 'Newest'
	}

	const colorReducer = (state, action)=>{
		if(!state.item){
			setColorToSelected( action.item );
		} 
		else{
			setColorToSelected( state.item, true );
			setColorToSelected( action.item );
		}
		return {item: action.item, data: action.data};		
	}

	const [selected, selectedDispatch] = useReducer(colorReducer, {item: null, data: null});

	const reducer = (state, action) => {
		switch( action.type ){
			case 'course':
				state.course = action.data;
				return state;

			case 'section':
				state.section = action.data;
				return state;

			case 'yearLevel':
				state.yearLevel = action.data;
				return state;

			case 'sex':
				state.sex = action.data;
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
		<div className="d-flex justify-content-center align-items-center" style={{height:'400px',width:'300px',border:'1px solid black',backgroundColor:'white',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}} className='d-flex justify-content-center flex-column'>
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
									<Select className='aRegYear' label='Year: ' options={['all','1','2','3','4']} reqOnChange={(e)=>{dispatch({type:'yearLevel',data: e.target.value})}}/>
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
	)


	useEffect(()=>{
		const getStudentList = async () => {
			axios.get('http://localhost:7000/student/slist')
			.then((res)=>{
				res.data.forEach( elem => {
					console.log( elem.status );
					if( elem.status === 'inactive' ){
						setStudentData((studentData) => [...studentData, elem]);
					}
				})
			})
			.catch((err)=>{
				console.log(err)
			})
		}
		getStudentList();
	},[]);

	useEffect(() => {
		let result = [];

		const handleSearch = async () => {		
			if( filter.sFilter ){
				const { 
					course,
					section,
					sex,	
					yearLevel,
					order,
					year
				} = filter.sFilter;

				console.log(section);
				axios.get(`http://localhost:7000/inactive-student-filter-query/${course}/${section}/${yearLevel}/${order}/${sex}/${year}`)
				.then( res => {
					if(section == 'null'){
						res.data.result.forEach( item => {
							result.push(<Item key={item._id} object={item} dispatch={selectedDispatch}/>);
						});
					}
					else{
						res.data.sectionResult.forEach( item => {
							result.push(<Item key={item._id} object={item} dispatch={selectedDispatch}/>);
						});
					}
					

					setFilteredData([...result]);
				})
			}
			else if(!filter.sFilter){
				studentData.forEach( item =>{
					if( (item.firstName.toLowerCase().startsWith(search?.[0]?.toLowerCase?.() ?? '') || item.lastName.toLowerCase().startsWith(search?.[0]?.toLowerCase?.() ?? '')) && (item.firstName.toLowerCase().includes(search.toLowerCase()) || item.lastName.toLowerCase().includes(search.toLowerCase()))){
						result.push( <Item key={item._id} object={item} dispatch={selectedDispatch}/> );
					}
				});

				setFilteredData([...result]);
			}
		}

		handleSearch();			

	}, [search, studentData, filter.sFilter]);

	useEffect(()=>{
		if( sendInactive ){
			const newActiveElems = []
			studentData.forEach((elem) => {
				if(elem.status === 'active') {
					console.log('here')
					setInacAccum((inacAccum) => [...inacAccum, elem])
				}
				else{
					newActiveElems.push( elem );
				}
				
			});
			setStudentData(() => [...newActiveElems])		
		}

	}, [sendInactive])

	useEffect(() => {
		if( inacAccum.length ){
			axios.put('http://localhost:7000/student/slist/update', inacAccum)
			.then( res => {
				setAlertMes( res.data.message );
				setSendInactive( false );
			})
			.catch((err)=>{
				console.log(err)
			});
		}
	}, [inacAccum])

	const sender = () =>{
		setDialogOpen(false);
		setSnackOpen(true);
		setSendInactive(true);
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
			<Search setSearch={setSearch} list={rFilter()} placeHolder='Enter first name or last name' />			
			<div style={{width: '100%', height: '90%'}} className='d-flex justify-content-center align-items-center'>
				<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
					<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
						{alertMes}
					</Alert>				
				</Snackbar>
				<div className="d-flex justify-content-center align-items-center" style={{height:'90%', width:'95%', backgroundColor:'white',  color:'black',overflowY:'auto',overflowX:'auto'}}>
					<div className="d-flex flex-column justify-content-center align-items-center" style={{height:'98%', width:'97%'}}>
						<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%', width:'100%', backgroundColor:'white', border:'1px solid black',borderRadius:'15px',boxShadow:"5px 5px 5px 5px grey"}}>
							<div className="d-flex flex-row justify-content-between align-items-center" style={{height:'15%', width:'95%'}}>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<SchoolIcon sx={{color:green[300],height:'40px',width:'40px'}}/>
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Deactivated Student's Account</p>
								</div>
								<div style={{width:'20%'}}className="d-flex flex-row align-items-center justify-content-end">
									<Button style={{height: '30px',width:'100px'}} title='Activate' click={handleDialog}/>
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
											Do you want to update the list and activate selected accounts?
										</DialogContent>
										<DialogActions>
											<Button title='Cancel' click={cancelOp}/>
											<Button title='Yes' click={sender}/>
										</DialogActions>
									</Dialog>
								</div>							
							</div>
							<div className="d-flex flex-column" style={{height:'80%', width:'95%',border:'1px solid black'}}>
								<RListHeader studentData={studentData}/>
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

	const [name, setName] = useState(null);

	const [open, setOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		setOpen( open );
	}
	
	const item = useRef();

	const handleClick = () => {
		if( !item.current ) return;

		props.dispatch({ item: item.current, data: props.object });
		console.log(props.dispatch)
	}
	

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'active' : 'inactive';

	}
	


	
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black',borderRadius:'10px'}} className="d-flex notSelected flex-row justify-content-around">
			
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange} name='chk'/></div>
			<div className="col-1 text-center">{props.object.studentNo}</div>
			<div className="col-3 text-center">{`${props.object.lastName}, ${props.object.firstName} ${props.object.middleInitial} ${props.extentionName ?? ''}`}</div>
			<div className="col-1 text-center">{props.object.sex}</div>
			<div className="col-1 text-center">{(() => {
											const date = new Date(props.object.birthdate);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
			</div>
			<div className="col-2 text-center ">{`${props.object.course}	${props.object.yearLevel}-${props.object.section}`}</div>
			<div className="col-1 text-center">{(() => {
											const date = new Date(props.object.dateRegistered);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
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

		props.studentData?.map?.(object =>{
			for(var i=0;i<elem.length;i++){
				if(elem[i].checked == true){
					object.status = 'active';
				}
				else{
					object.status = 'inactive';
				}
				console.log(object.status)					
			}
			
		})
		
	}

	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black',color:"white", backgroundColor:'#385723'}} className='d-flex flex-row justify-content-around'>
			<div className="col-1 text-center">
				<Checkbox cLabel="Select All" id='selectAll' onClick={handleSelectAll}/>
			</div>
			<div className='col-1 text-center'>
				StudentNo
			</div>
			<div className='col-3 text-center'>
				Student Name
			</div>
			<div className='col-1 text-center'>
				Sex
			</div>
			<div className='col-1 text-center'>
				Birth Date
			</div>
			<div className='col-2 text-center'>
				Course,Year and Section
			</div>
			<div className='col-1 text-center'>
				Reg. Date
			</div>
			
		</div>
	);
}

const setColorToSelected = (item, reverse = false) => {
	console.log( item );
	if( !item ) return ;

	const list = item.classList;

	if( !reverse ){
		console.log( item.classList );
		list.replace('bg-light', 'bg-success');
	}
	else{
		list.replace('bg-success', 'bg-light');
	}
	

}