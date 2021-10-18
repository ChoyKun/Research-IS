import React,{useState, useRef, useEffect, Suspense, useReducer} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"

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

	const [studentData, setStudentData] = useState( [] );
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch]=useState(null);
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
		console.log(action.data);
		return {item: action.item, data: action.data};		
	}

	const [selected, selectedDispatch] = useReducer(reducer, {item: null, data: null});

	useEffect(() => {
		axios.get('http://localhost:7000/student/slist')
		.then( res => {
			res.data.forEach( elem => {
				if( elem.status === 'active' ){
					setStudentData((studentData) => [...studentData, elem]);
				}
			})
		})
		.catch( err => {
			console.log( err );
		})
	}, [])

	useEffect(()=>{
		if( studentData.length	){
			console.log( studentData );
			setFilteredData(studentData.map(object =>{
				if(search){
					for(let key of Object.keys(object)){
						if(object[key]?.toLowerCase?.()?.startsWith?.(search?.charAt?.(0).toLowerCase?.())){
							console.log(object);
							return<Item key={object._id} object={object} dispatch={selectedDispatch}/>
						}
					}
				}
				else{
					return <Item key={object._id} object={object} dispatch={selectedDispatch}/>
				}
			}))
		}
	},[search, studentData])

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
			<div style={{height:'8%', width:'100%', backgroundColor:'#385723', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Active Students</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/MIS-slist/${username}`}><Button className='AdminMenu' title='Active Students'/></Link>
				<Link to={`/MIS-inactive-slist/${username}`}><Button className='AdminMenu' title='Inactive Students'/></Link>
				<Link to={`/MIS-reg/${username}`}><Button className='AdminMenu' title='Register New Student'/></Link>					
			</div>
			<div style={{height:'15%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='/slist-filter'/>
				<div style={{height:'20%', width:'30%'}}className="d-flex flex-row justify-content-between flex-row-reverse">
					<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Deactivate' click={sender}/>
					<Link to ={`/MIS-edit-student/${username}/${selected?.data?.studentNo}`}><Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Edit'/></Link>		
				</div>		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
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
	// 
	const item = useRef();

	const handleClick = () => {
		if( !item.current ) return;

		props.dispatch({ item: item.current, data: props.object });


	}
	

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'inactive' : 'active';

	}

	return(
		<div onClick={handleClick} ref={item} style={{border:'1px solid black'}} className={'d-flex bg-secondary flex-row justify-content-around'}>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange}/></div>
			<div className="col-1 text-center">{props.object.studentNo}</div>
			<div className="col-1 text-center">{props.object.password}</div>
			<div className="col-1 text-center">{props.object.firstName}</div>
			<div className="col-1 text-center">{props.object.middleInitial}</div>
			<div className="col-1 text-center">{props.object.lastName}</div>
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