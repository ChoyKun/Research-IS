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
import Checkbox from '../components/fields/checkbox';


export default function AdminRList(props){
	const {username} = useParams();


	const [studentData, setStudentData] = useState( [] );
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch]= useState(null);
	const [sendActive, setSendActive] = useState(false);
	const [activeAccum, setActiveAccum]= useState([])

	
	useEffect(() => {
		axios.get('http://localhost:7000/student/slist')
		.then( res => {
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.status === 'inactive' ){
					setStudentData((studentData) => [...studentData, elem]);
				}
			})
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
						return <Item key={object._id}object={object}/>
					}
				}
			}
			else{
				console.log(Item)
				return <Item key={object._id}object={object}/>
			}
		}))
	},[search, studentData])

	useEffect(()=>{
		if( sendActive ){
			const newInactiveElems = []
			studentData.forEach((elem) => {
				if(elem.status === 'active') {
					console.log('here')
					setActiveAccum((activeAccum) => [...activeAccum, elem])
				}
				else{
					newInactiveElems.push( elem );
				}
				
			});
			setStudentData(() => [...newInactiveElems])		
		}

	}, [sendActive])

	useEffect(() => {
		if( activeAccum.length ){
			axios.put('http://localhost:7000/student/slist/update', activeAccum)
			.then( res => {
				alert( res.data.message );
				setSendActive( false );
			})
			.catch((err)=>{
				console.log(err)
			});
		}
	}, [activeAccum])

	const sender = () =>{
		const send = window.confirm("Do you want to update the list?");
		if(send == true){
			setSendActive(true);
		}
		else{
			alert("Operation canceled")
		}
	}

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#385723', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Inactive Students</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/MIS-slist/${username}`}><Button className='AdminMenu' title='Active Students'/></Link>
				<Link to={`/MIS-inactive-slist/${username}`}><Button className='AdminMenu' title='Inactive Students'/></Link>
				<Link to={`/MIS-reg/${username}`}><Button className='AdminMenu' title='Register New Student'/></Link>			
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location="/slist-filter" setSearch={setSearch}className='Search'/>
				<div style={{height:'20%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Activate' click={sender}/>		
				</div>		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black', color:'black'}}>
					<Suspense fallback={<Loading/>}>
						<SlistHeader/>
						{filteredData}
					</Suspense>
				</div>
			</div>
		</>
	);
}


function Item(props){

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'active' : 'inactive';
	}

	return(
		<div onClick={() => console.log('clicked')}style={{border:'1px solid black'}} className="d-flex bg-secondary flex-row justify-content-around">
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
			<div className='col-1 text-center'>
				Reg. Date
			</div>
		</div>
	);
}

