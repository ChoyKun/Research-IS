import React,{useState, useRef, useEffect, Suspense, useReducer, useContext	} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"
import FilterContext from '../contexts/filter-context';


//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';



export default function FacultyRList(props){
	const {username} = useParams();
	const filter = useContext( FilterContext );

	const [studentData, setStudentData] = useState( [] );
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch]=useState('');
	const [sendInactive, setSendInactive] = useState(false);
	const [inacAccum, setInacAccum]= useState([])

	
	const reducer = (state, action)=>{
		if(!state.item){
			setColorToSelected( action.item );
		} 
		else{
			setColorToSelected( state.item, true );
			setColorToSelected( action.item );
		}
		return {item: action.item, data: action.data};		
	}

	const [selected, selectedDispatch] = useReducer(reducer, {item: null, data: null});

	useEffect(()=>{
		const getStudentList = async () => {
			axios.get('http://localhost:7000/student/slist')
			.then((res)=>{
				res.data.forEach( elem => {
					console.log( elem.status );
					if( elem.status === 'active' ){
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
					yearLevel,
					order
				} = filter.sFilter;

				console.log(section);
				axios.get(`http://localhost:7000/student-filter-query/${course}/${section}/${yearLevel}/${order}`)
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
				if(elem.status === 'inactive') {
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
				alert( res.data.message );
				setSendInactive( false );
			})
			.catch((err)=>{
				console.log(err)
			});
		}
	}, [inacAccum])

	const sender = () =>{
		const send = window.confirm("Do you want to update the list?");
		if(send == true){
			setSendInactive(true);
		}
		else{
			alert("Operation canceled")
		}
	}

	return(
		<>
			<div style={{height:'7%', width:'100%', backgroundColor:'#385723', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Active Students</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/MIS-slist/${username}`}><Button style={{height:'50px',width:'200px'}} title='Active Students'/></Link>
				<Link to={`/MIS-inactive-slist/${username}`}><Button style={{height:'50px',width:'200px'}} title='Inactive Students'/></Link>
				<Link to={`/MIS-reg/${username}`}><Button style={{height:'50px',width:'200px'}} title='Register New Student'/></Link>					
			</div>
			<div style={{height:'13%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='/slist-filter' setSearch={setSearch} placeHolder={'Enter First Name or Last Name'}/>
				<div style={{height:'20%', width:'30%'}}className="d-flex flex-row justify-content-between flex-row-reverse">
					<Button style={{height: '30px',width:'100px'}} title='Deactivate' click={sender}/>
					<Link to ={`/MIS-edit-student/${username}/${selected?.data?.studentNo}`}><Button style={{height: '30px',width:'100px'}} title='Edit'/></Link>		
				</div>		
			</div>
			<div style={{width: '100%', height: '75%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'80%', width:'90%', backgroundColor:'white', border:'1px solid black',color:'black'}}>
					<Suspense fallback={<Loading/>}>
						<SlistHeader/>
						{ filteredData }
					</Suspense>

				</div>
			</div>
		</>
	);
}

function Item(props){ //getData
	const item = useRef();

	const handleClick = () => {
		if( !item.current ) return;

		props.dispatch({ item: item.current, data: props.object });
		console.log(props.dispatch)
	}
	

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'inactive' : 'active';

	}

	return(
		<div onClick={handleClick} ref={item} style={{border:'1px solid black'}} className={'d-flex bg-secondary flex-row justify-content-around'}>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange}/></div>
			<div className="col-1 text-center">{props.object.studentNo}</div>
			<div className="col-1 text-center">{props.object.password}</div>
			<div className="col-1 text-center">{props.object.lastName}</div>
			<div className="col-1 text-center">{props.object.firstName}</div>
			<div className="col-1 text-center">{props.object.middleInitial}</div>
			<div className="col-1 text-center">{props.object.extentionName ?? "N/A"}</div>
			<div className="col-1 text-center">{(() => {
											const date = new Date(props.object.birthdate);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
			</div>
			<div className="col-1 text-center ">{props.object.course}</div>
			<div className="col-1 text-center">{props.object.yearLevel}</div>
			<div className="col-1 text-center">{props.object.section}</div>
			<div className="col-1 text-center">{(() => {
											const date = new Date(props.object.dateRegistered);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
			</div>
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


function SlistHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#4472c4'}} className='d-flex flex-row justify-content-around'> 
			<div className="col-1 text-center"><Checkbox/></div>
			<div className='col-1 text-center'>
				StudentNo
			</div>
			<div className='col-1 text-center'>
				Password
			</div>
			<div className='col-1 text-center'>
				First Name
			</div>
			<div className='col-1 text-center'>
				Middile In.
			</div>
			<div className='col-1 text-center'>
				Last Name
			</div>
			<div className='col-1 text-center'>
				E. Name
			</div>
			<div className='col-1 text-center'>
				Birth Date
			</div>
			<div className='col-1 text-center'>
				Course
			</div>
			<div className='col-1 text-center'>
				Year level
			</div>
			<div className='col-1 text-center'>
				Section
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
		list.replace('bg-secondary', 'bg-success');
	}
	else{
		list.replace('bg-success', 'bg-secondary');
	}
	

}