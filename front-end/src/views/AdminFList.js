import React,{useState, useEffect, Suspense, useRef, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

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


export default function AdminRList(props){

	const [facultyData, setFacultyData] = useState([]);
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch] = useState(null);
	

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

	useEffect(()=>{
		axios.get('http://localhost:7000/faculty/flist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.status === 'inactive' ){
					setFacultyData((facultyData) => [...facultyData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])

	useEffect(()=>{
		setFilteredData(facultyData?.map?.(object =>{
			if(search){
					for( let key of Object.keys(object)){
							if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
								return <Item key={object.id} {...object} dispatch={selectedDispatch}/>
							}
					}
			}
			else{
					return<Item key={object.id}{...object} dispatch={selectedDispatch}/>
			}
		}))
	}, [search, facultyData])

	const handler = ()=>{
		const send = window.confirm("Do you want to change current officer?");
		if(send == true){
			axios.put('http://localhost:7000/faculty/flist/new-officer')
			.then((res)=>{
				axios.put(`http://localhost:7000/faculty/flist/changeofficer/${selected?.data?.username}`)
				.then((res)=>{
					alert(res.data.message);
				})
				.catch((err)=>{
					if( err?.response?.data?.message ){
						alert( err.response.data.message );
					}
				})
			})
			.catch((err)=>{
				alert(err.data.message);
			})
		}
		else{
			alert("Operation canceled")
		}
	}


	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Inactive MIS Officer List</h2>				
			</div>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='rlist-filter' setSearch={setSearch} className='Search'/>
				<div style={{height:'20%', width:'30%'}}className="d-flex flex-row justify-content-between flex-row-reverse">
					<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Activate' click={handler}/>
					<Button style={{height: '30px',width:'100px',backgroundColor:'white',color: 'black'}} click={()=>window.history.back()}title='Cancel'/>		
				</div>	
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black',overflowY:'auto',overflowX:'auto'}}>
					<Suspense fallback={<Loading/>}>
						<FListHeader/>
						{ filteredData }
					</Suspense>
				</div>
			</div>
		</>
	);
}




function Item(props){
	const item = useRef();
	
	const handleClick = () => {
		if( !item.current ) return;

		props.dispatch({ item: item.current, data: props });


	}

	const getDateFrom = ( dateString ) => {
    	const date = new Date( dateString );

		const year = date.getFullYear();

		// console.log( date.getMonth() );
		const m = date.getMonth() + 1;

		const month = m.toString().length < 2 ? `0${m.toString()}` : m;
		const day = date.getDate().toString().length < 2 ? `0${date.getDate().toString()}` : date.getDate();

		const formated = `${year}-${month}-${day}`;

		return formated;
    }

	return(
		<div onClick={handleClick} ref={item} className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-1 text-center">{props.username}</div>
			<div className="col-1 text-center">{props.password}</div>
			<div className="col-1 text-center">{props.firstName}</div>
			<div className="col-1 text-center">{props.middleInitial}</div>
			<div className="col-1 text-center">{props.lastName}</div>
			<div className="col-1 text-center">{props.extentionName ?? "N/A"}</div>
			<div className="col-1 text-center">{getDateFrom(props.birthdate)}</div>
			<div className="col-1 text-center">{getDateFrom(props.dateRegistered)}</div>
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

function FListHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#4472c4'}} className='d-flex flex-row justify-content-around'>
			<div className='col-1 text-center'>
				Username
			</div>
			<div className='col-1 text-center'>
				Password
			</div>
			<div className='col-1 text-center'>
				First Name
			</div>
			<div className='col-1 text-center'>
				Middile Initial
			</div>
			<div className='col-1 text-center'>
				Last Name
			</div>
			<div className='col-1 text-center'>
				Name Extention
			</div>
			<div className='col-1 text-center'>
				Birthday
			</div>
			<div className='col-1 text-center'>
				Day Registered
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