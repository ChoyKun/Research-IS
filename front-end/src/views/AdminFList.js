import React,{useState, useEffect, Suspense} from 'react';
import { Link } from 'react-router-dom';
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

	const [facultyData, setFacultyData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch] = useState(null);

	useEffect(()=>{
		axios.get('http://localhost:7000/faculty/flist')
		.then((res)=>{
			setFacultyData(res.data);
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
								return <Item key={object.id} {...object}/>
							}
					}
			}
			else{
					return<Item key={object.id}{...object}/>
			}
		}))
	}, [search, facultyData])


	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to="/admin-slist"><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/admin-rlist'><Button className='AdminMenu' title='List of Research'/></Link>
				<Link to='/admin-flist'><Button className='AdminMenu' title='List of Faculties'/></Link>
				<Link to="/admin-upload"><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to="/admin-reg"><Button className='AdminMenu' title='Register new Adviser'/></Link>
				<Link to="/admin-archive"><Button className='AdminMenu' title='Archived'/></Link>				
			</div>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='rlist-filter' setSearch={setSearch} className='Search'/>	
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
		<div onClick={() => console.log('clicked')} className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
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