import React,{useState, useEffect, Suspense} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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


export default function AdminRList(props){
	const {username} = useParams();


	const [studentData, setStudentData] = useState( null );
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch]= useState(null);

	
	useEffect(() => {
		axios.get('http://localhost:7000/student/slist')
		.then( res => {
			setStudentData( res.data );
		})
		.catch( err => {
			console.log( err );
		})
	}, [])


	useEffect(()=>{
		setFilteredData(studentData?.map?.(object=>{
			if(search){
				for( let key of Object.keys(object)){
					if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
						return <Item key={object._id}{...object}/>
					}
				}
			}
			else{
				console.log(Item)
				return <Item key={object._id}{...object}/>
			}
		}))
	},[search, studentData])

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/admin-slist/${username}`}><Button className='AdminMenu' title='Active Students'/></Link>
				<Link to={`/admin-inactive-slist/${username}`}><Button className='AdminMenu' title='Inactive Students'/></Link>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location="/slist-filter" setSearch={setSearch}className='Search'/>
				<div style={{height:'20%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Deactivate'/>		
				</div>		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black', color:'black'}}>
					<Suspense fallback={<Loading/>}>
						<SlistHeader/>
						{console.log(filteredData)}
						{filteredData}
					</Suspense>
				</div>
			</div>
		</>
	);
}


function Item(props){
	return(
		<div onClick={() => console.log('clicked')}style={{border:'1px solid black'}} className="d-flex bg-secondary flex-row justify-content-around">
			<div className="col-1 text-center">{props.studentNo}</div>
			<div className="col-1 text-center">{props.password}</div>
			<div className="col-1 text-center">{props.firstName}</div>
			<div className="col-1 text-center">{props.middleInitial}</div>
			<div className="col-1 text-center">{props.lastName}</div>
			<div className="col-1 text-center">{props.extentionName ?? "N/A"}</div>
			<div className="col-1 text-center">{(() => {
											const date = new Date(props.birthdate);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
			</div>
			<div className="col-1 text-center ">{props.course}</div>
			<div className="col-1 text-center">{props.yearLevel}</div>
			<div className="col-1 text-center">{props.section}</div>
			<div className="col-2 text-center">{(() => {
											const date = new Date(props.dateRegistered);
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
				Middile Initial
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
			<div className='col-2 text-center'>
				Date Registered
			</div>
		</div>
	);
}

