import React,{useState, useEffect, Suspense, useContext, useReducer} from 'react';
import { Link, Redirect,useParams} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import uniqid from 'uniqid';

import "../styles/button.css";


//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import FilterContext from '../contexts/filter-context';
import Selection from '../components/fields/Selection';

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
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';



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
	const [categ, setCateg] = useState( [] );

	useEffect(()=>{
		axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/rlist/category`)
		.then( res => {
			console.log( res.data );
			setCateg( res.data );
		})
		.catch( err => {
			throw err;
		});
	},[]);

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
		category: '',
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
				state.category = action.data;
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
		<div style={{height:'400px',width:'350px',border:'1px solid black',backgroundColor:'white',borderRadius:'15px',boxShadow:"10px 10px 20px 10px grey"}} className='d-flex justify-content-center flex-column'>
			<h3 style={{width:'95%',color:'black'}}>Filters:</h3>
			<Divider style={{height:'2px', width:'100%', color:'black'}}/>
			<div className='d-flex flex-row' style={{width:'100%',height:'70%'}}>
				<div className='d-flex flex-column justify-content-center align-items-center' style={{height:'100%',width:'50%'}}>
					<div className='d-flex flex-column justify-content-around align-items-start' style={{height:'100%',width:'80%'}}>
						<Select 
							className='sfilterCourse' 
							label='Course:' 
							options={['all','BSIT','BSCS']}
							reqOnChange={e => dispatch({type: 'course', data: e.target.value})}
						/>
						<div style={{ height:'40px',width:'100px', color:'black'}} className='d-flex flex-row'>
							<label style={{height:'40px',width:'300px'}}>Year: </label>
							<Field style={{ height:'25px',width:'100px', color:'black'}} type="number" placeHolder='ex. 2001' reqOnChange={e => dispatch({type: 'yearSubmitted', data: e.target.value})}/>
						</div>
						<Selection 
							width="200px" 
							label="Categories" 
							options={[...categ]} 
							onChange={(value) => dispatch({type:'category', data: value })}
							placeholder="Select or Add Category"
						/>
						<Select width='55px' className='sfilterAlphabetical' label='Sort from:' options={['A-Z','Z-A']}reqOnChange={e => dispatch({type: 'order', data: e.target.value})}/>
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
					// console.log( elem.status );
					if( elem.status === 'public' ){
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
				axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/filter-query/${course}/${category}/${yearSubmitted}/${order}/${year}`)
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
				if(elem.status === 'archive') {
					
					setPubAccum((pubAccum) => [...pubAccum, elem])
				}
				else{
					newArchiveElems.push( elem );
				}
				
			});
			setResearchData(() => [...newArchiveElems])			
		}

	}, [sendPublic])


	useEffect(() => {
		// console.log(pubAccum.length)
		if( pubAccum.length ){
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/research/rlist/update`, pubAccum)
			.then( res => {
				console.log('here')
				setAlertMes( res.data.message );
				setAlertStatus('good');
				setSendPublic( false );

				axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/research/rlist/student/update`, pubAccum)
				.then( res =>{
					console.log(res)
				})
				.catch((err)=>{
					console.log(err)
				});
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
									<p style={{fontSize:'30px', textAlign:'center',height:'24px'}}>Published Researches</p>
								</div>
								<div className="d-flex flex-row align-items-center justify-content-center">
									<Button style={{width:'100px',height:'30px'}} click={handleDialog} title="Hide"/>
									<Dialog
										open={dialogOpen}
								        onClose={handleDialogClose}
								        aria-labelledby="alert-dialog-title"
								        aria-describedby="alert-dialog-description"
									>
										<DialogTitle>
											{"Hide Researches"}
										</DialogTitle>
										<DialogContent>
											Do you want to update the list and hide selected researches?
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

	const [remAccum, setRemAccum]= useState([])
	const [pending, setPending] = useState([])
	const [studentPerm, setStudentPerm] = useState([])
	const [sendPend, setSendPend] = useState(false);
	const [sendRem, setSendRem] = useState(false);
	const [url, setUrl] = useState(null)
	const [name, setName] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [open, setOpen] = useState(false);
	const [permOpen, setPermOpen] = useState(false);
	const [alertMes, setAlertMes] = useState(null);
	const [alertStatus, setAlertStatus] = useState(null);
	const [snackOpen, setSnackOpen] =useState(false);
	const [permDialogOpen, setPermDialogOpen] = useState(false);

	const handleDialog = () =>{
		setPermDialogOpen(true)
	}

	const handleDialogClose = () =>{
		setPermDialogOpen(false)
	}


	const toggleDrawer = (open) => (event) => {
		setOpen( open );
	}

	const togglePermission = (open) => (event) => {
		setPermOpen( open );
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

	const cancelPerm =() =>{
		setPermDialogOpen(false);
		setSnackOpen(true);
		setAlertMes("Operation canceled")
		setAlertStatus(403)
	}
	

	useEffect(()=>{
		axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/permissions/${props.object._id}`)
		.then((res)=>{
			res.data.data.forEach( item => {
				setStudentPerm((studentPerm)=>[...studentPerm, item])	
			});
		})
		.catch((err)=>{
			console.log(err);
		})
	},[])

	// console.log([...studentPerm]);

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
							<div className="col-4 text-center">{ props.object.researchCategories}</div>
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

	// const permissions=()=>(
	// 	<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'1000px',backgroundColor:"#E2F0D9"}}>
	// 		<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'95%',width:'90%',border:'1px solid black',backgroundColor:'white',borderRadius:'10px'}}>
	// 			<div className="d-flex justify-content-around align-items-center flex-column" style={{height:'100%',width:'100%'}}>
	// 				<div className="d-flex justify-content-start align-items-center" style={{height:'10%',width:'90%'}}>
	// 					<p style={{fontSize:'30px',textAlign:'center',height:'24px'}}>{props.object.title}</p>
	// 				</div>
	// 				<Divider style={{height:'2px', width:'100%', color:'black'}}/>
	// 				<div className="d-flex flex-column justify-content-start align-items-start" style={{height:'75%',width:'90%',border:'1px solid black'}}>
	// 					<div className="d-flex flex-column" style={{height:'90%', width:'100%',backgroundColor:'white',overflowY:'overlay',overflowX:'overlay'}}>
	// 						<div style={{height:'30px',width:'100%',border:'1px solid black',color:"white", backgroundColor:'#385723'}} className='d-flex flex-row justify-content-around'>			
	// 							<div className="col-1 text-center"></div>
	// 							<div className='col-4 text-center'>
	// 								Student Name
	// 							</div>
	// 							<div className='col-4 text-center'>
	// 								Date Approved
	// 							</div>
	// 						</div>
	// 						<PermList studentPerm={studentPerm} title={props.object.title} handleOnChange={handlePermissions} rID={props.object._id}/>
	// 					</div>
	// 				</div>
	// 				<div className="d-flex flex-row-reverse justify-content-start" style={{height:'10%',width:'90%'}}>
	// 					<Button title="Remove Permission" click={ handleDialog } style={{height:'40px'}}/>
	// 					
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// )

	useEffect(()=>{
		if( sendRem ){
			const newArchiveElems = []
			console.log( studentPerm );
			studentPerm.forEach((elem) => {
				if(elem.status === 'archive') {
					setRemAccum((remAccum) => [...remAccum, elem])
				}
				else{
					newArchiveElems.push( elem );
				}
			});
			setStudentPerm(() => [...newArchiveElems])			
		}
	}, [sendRem]);

	useEffect(()=>{
		// console.log(studentPerm?.map?.(elem => elem.studentNo))
		if( sendRem ){
			setRemAccum((remAccum) => [...remAccum, ...studentPerm?.filter(elem => elem.status === 'archive').map( elem => elem.studentNo)]);
		}
	}, [sendRem]);

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
				// console.log( err.response );
				if(err?.response?.data?.message) alert(`${ err?.response?.data?.message}`) 
			});
		}
	}, [pending])

	

	useEffect(() => {
		// console.log(remAccum)
		if( remAccum.length ){
			axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/remove-perm/${props.object._id}`, remAccum)
			.then( res => {
				console.log('here')
				setAlertMes( res.data.message );
				setAlertStatus('good');
				setSendRem( false );
			})
			.catch((err)=>{
				setAlertMes(JSON.parse(err.request.response).message);
				setAlertStatus(403);
			});
		}
	}, [remAccum])



	const requestForView = async () => {

		const today = new Date();

		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		// console.log(date);

		const data = {
			id: props.object._id,
			studentID: username,
			studentName: name,
			title: props.object.title,
			state: 'pending',
			dateRequested: date
		};

		setAlertMes(`You requested "${data.title}" for full content viewing,\nApproval of admin is required for full content.\nThank you for your patience`);

		axios.post('http://localhost:7000/request-view', {data})
		.catch( err => {
			console.log( err );
		});

		setSendPend(true);

		handleSnack();
	}

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'archive' : 'public';
	}

	// const handlePermissions = (e) => {
	// 	// console.log(studentPerm?.map?.(elem=> elem.status))
	// 	props.object.status = e.target.checked ? 'archive' : 'public';
	// }

	const handlePermissions = (id) => {
		setStudentPerm( studentPerm => [...studentPerm.map( sp => {
			console.log( id, sp._id );
			console.log( id === sp._id );
			if( sp._id === id )
				sp.status = 'archive';

			return sp;
		})]);

		setPermDialogOpen(false);
		setSnackOpen(true);
		setSendRem(true);
	}

	React.useEffect(() => console.log( studentPerm ), [studentPerm]);
	
	return(
		<div style={{height:'30px',width:'100%',backgroundColor:'#E2F0D9',border:'1px solid black',borderRadius:'10px'}} className="d-flex flex-row justify-content-around">
			<Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={snackOpen} autoHideDuration={2000} onClose={handleSnackClose}>
				<Alert variant='filled' severity={alertStatus == 403 ? "error" : "success"} sx={{width:'500px'}}>
					{alertMes}
				</Alert>				
			</Snackbar>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange} name='chk'/></div>
			<div className="col-4 text-center">{props.object.title}</div>
			{/*<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>*/}
			<div className="col-4 text-center">{ props.object.researchCategories}</div>
			<div className="col-1 text-center">{props.object.yearSubmitted}</div>			
			<div className="col-1 d-flex justify-content-center align-items-center text-center">
				<Tooltip title="View Document" arrow>
					<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 ,color:'#385723'}}
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
			<div className="col-1 d-flex justify-content-center align-items-center text-center">
				<Tooltip title="View Document" arrow>
					<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 ,color:'#385723'}}
					>
	           	 		<RecentActorsIcon style={{height: '25px',width:'25px'}} onClick={togglePermission(true)}/>
	           	 	</IconButton>
				</Tooltip>
           	 	<Drawer
	            	anchor={'right'}
	            	open={permOpen}
	            	onClose={togglePermission(false)}
	            >
	            	<Permissions
	            		studentPerm={studentPerm} 
	            		title={props.object.title} 
	            		handlePermissions={handlePermissions} 
	            		id={props.object._id}
	            		handleDialog={handleDialog}
	            		dialogOpen={permDialogOpen}
						handleDialogClose={handleDialogClose}
						cancelOp={cancelPerm}
						sender={handlePermissions}
	            	>
	            	</Permissions>
            	</Drawer>
				{/*<Button style={{width:'90px'}} click={requestForView} disabled={disabled} className={`col-1 text-center`} title='Request'/>*/}
			</div>
		</div>
	);
}

const Permissions= props => {
	const [id, setId] = React.useState( null );

	return(
		<>
			<div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100%',width:'1000px',backgroundColor:"#E2F0D9"}}>
				<div className="d-flex justify-content-start align-items-start flex-column" style={{height:'95%',width:'90%',border:'1px solid black',backgroundColor:'white',borderRadius:'10px'}}>
					<div className="d-flex justify-content-around align-items-center flex-column" style={{height:'100%',width:'100%'}}>
						<div className="d-flex justify-content-start align-items-center" style={{height:'10%',width:'90%'}}>
							<p style={{fontSize:'30px',textAlign:'center',height:'24px'}}>{props.title}</p>
						</div>
						<Divider style={{height:'2px', width:'100%', color:'black'}}/>
						<div className="d-flex flex-column justify-content-start align-items-start" style={{height:'75%',width:'90%',border:'1px solid black'}}>
							<div className="d-flex flex-column" style={{height:'90%', width:'100%',backgroundColor:'white',overflowY:'overlay',overflowX:'overlay'}}>
								<div style={{height:'30px',width:'100%',border:'1px solid black',color:"white", backgroundColor:'#385723'}} className='d-flex flex-row justify-content-around'>			
									<div className="col-1 text-center"></div>
									<div className='col-4 text-center'>
										Student Name
									</div>
									<div className='col-4 text-center'>
										Date Approved
									</div>
								</div>
								<PermList studentPerm={props.studentPerm} handleDialog={props.handleDialog} title={props.title} handleOnChange={id => setId( id )} rID={props.id}>
								</PermList>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog
				open={props.dialogOpen}
		        onClose={props.handleDialogClose}
		        aria-labelledby="alert-dialog-title"
		        aria-describedby="alert-dialog-description"
			>
				<DialogTitle>
					{"Remove Permission/s"}
				</DialogTitle>
				<DialogContent>
					Do you want to remove the permission to view full content from the selected students?
				</DialogContent>
				<DialogActions>
					<Button title='Cancel' click={props?.cancelOp}/>
					<Button title='Yes' click={() => props.sender( id )}/>
				</DialogActions>
			</Dialog>
		</>
	)
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
			// console.log(elem[i].checked)			
		}

		props.researchData?.forEach(object =>{
			const result = []

			result.push(object)

			for(var i=0;i<result.length;i++){
				if(elem[i].checked == true){
					object.status = 'archive';
				}
				else{
					object.status = 'public';
				}
				// console.log(result)					
			}
			
		})
		
	}

	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black',color:"white", backgroundColor:'#385723'}} className='d-flex flex-row justify-content-start'>
			<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-around'>
				<div className="col-1 text-center">
					<Checkbox cLabel="Select All" id='selectAll' onClick={handleSelectAll}/>
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
				<div className="col-1 text-center">
					Permissions
				</div>
			</div>
		</div>
	);
}

const PermList = (props) =>(
		<div>
			{props.studentPerm?.map?.((object)=>(
				<div key={uniqid()} style={{height:'30px',width:'100%',color:'black',backgroundColor:'#E2F0D9',border:'1px solid black',borderRadius:'10px'}} className="d-flex flex-row justify-content-around">
					<div className="col-1 text-center">
						<IconButton
							size="small"
							edge="center"
							color="inherit"
							aria-label="menu"
							sx={{ color:green[500],mr: 2 }}
							onClick={() => {
								props?.handleDialog();
								props.handleOnChange( object._id );
							}}
						>
							<RemoveCircleIcon style={{height: '20px',width:'20px'}} />
							{props.children}
						</IconButton>
					</div>
					<div className='col-4 text-center'>
						{`${object.firstName} ${object.middleInitial} ${object.lastName}`}
					</div>
					<div className='col-4 text-center'>
						{`${object.approved.filter(elem => elem.id === props?.rID).map( elem => elem.dateApproved)}`}
					</div>
				</div>
			))}				
		</div>	
	)