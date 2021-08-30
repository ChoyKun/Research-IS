import React,{useState, useEffect, useReducer} from 'react';
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


export default function FacultyEditProfile(props){

	const state={
		_newUsername: null,
		_newFirstName: null,
		_newMiddleInitial:null,
		_newLastName: null,
		_newUsername: null,
		_newBirthdate:null,
		_password:null
	}
	const {username} = useParams();
	const [facultyData, setFacultyData] = useState([]);
	const [name, setName] = useState(null);


	function reducer(state,action){
		switch(action.type){
			case '_newUsername':
				state._newUsername=action.data;
				return state;
			case '_newFirstName':
				state._newFirstName=action.data;
				return state;
				console.log(state)
			case '_newMiddleInitial':
				state._newMiddleInitial=action.data;
				return state;
			case '_newLastName':
				state._newLastName=action.data;
				return state;
			case '_newBirthdate':
				state._newBirthdate=action.data;
				return state;
			case '_password':
				state._password=action.data;
				return state;
		}
	}

	console.log(state);

	const [data,dispatch] = useReducer(reducer, state);

	useEffect(()=>{
		axios.get('http://localhost:7000/faculty/flist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.username === `${username}` ){
					setFacultyData((FacultyData) => [...FacultyData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])

	useEffect(() => {
		axios.get(`http://localhost:7000/faculty/flist/${username}`)
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})	
	}, []);

	const getDateFrom = ( dateString ) => {
    	const date = new Date( dateString );



		const year = date.getFullYear();
		const month = date.getMonth().toString().length < 2 ? `0${date.getMonth().toString()}` : date.getMonth();
		const day = date.getDay().toString().length < 2 ? `0${date.getDay().toString()}` : date.getDay();

		const formated = `${year}-${month}-${day}`;

		return formated;
    }

    const handler =()=>{
    	axios.put(`http://localhost:7000/faculty/flist/editprofile/${username}`,data)
    	.catch((err)=>{
    		console.log(err.response);
    	})
    }

    

	return(
		<>
			<div style={{height:'8%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/faculty-slist/${username}`}><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to={`/faculty-upload/${username}`}><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to={`/faculty-reg/${username}`}><Button className='AdminMenu' title='Register new Student'/></Link>
				<Link to={`/admin-access/${username}`}><Button className='AdminMenu' title='Archived'/></Link>				
			</div>
			<div style={{height:'8%', width:'100%', backgroundColor:'#385723', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Edit Profile</h2>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-around align-items-center flex-column'>
						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-start'>
							<div style={{height:'100%',width:'225px', border:'1px solid black'}}> </div>
						</div>
						<div style={{height:'40%',width:'100%',color:'black'}} className='d-flex justify-content-around flex-column'>
							{facultyData?.map?.(object =>(
								<div  style={{height:'100%',width:'100%'}} key={facultyData.indexOf(object)} className="d-flex flex-column justify-content-start">
									<div style={{height:'100%',width:'100%'}} className="d-flex flex-row justify-content-around">
									<div className='d-flex flex-column justify-content-around'>
										<div style={{width:'300px'}} className='d-flex justify-content-around'>
											<label style={{fontSize:'20px'}}>First Name:</label>
											<Field style={{width:'200px'}} placeHolder={object.firstName} reqOnChange={(e)=>{dispatch({type:'_newFirstName',data: e.target.value})}}/>
										</div>
										<div style={{width:'142px'}} className='d-flex justify-content-around'>
											<label style={{fontSize:'20px'}}>Middle Initial:</label>
											<Field style={{width:'20px'}} placeHolder={object.middleInitial} reqOnChange={(e)=>{dispatch({type:'_newMidleInitial',data: e.target.value})}}/>
										</div>
										<div style={{width:'300px'}} className='d-flex justify-content-around'>
											<label style={{fontSize:'20px'}}>Last Name:</label>
											<Field style={{width:'200px'}} placeHolder={object.lastName} reqOnChange={(e)=>{dispatch({type:'_newLastName',data: e.target.value})}}/>
										</div>
									</div>
										<div className='d-flex flex-column justify-content-around'>
											<div style={{width:'290px'}} className='d-flex justify-content-around'>
												<label style={{fontSize:'20px'}}>Username:</label>
												<Field style={{width:'200px'}} placeHolder={object.username} reqOnChange={(e)=>{dispatch({type:'_newUsername',data: e.target.value})}}/>
											</div>
											<div style={{width:'250px'}} className='d-flex justify-content-around'>
												<label style={{fontSize:'20px'}}>Birthday:</label>
												<Field type='date' style={{width:'200px'}} value={`${getDateFrom(object.birthdate)}`} reqOnChange={(e)=>{dispatch({type:'_newBirthdate',data: e.target.value})}}/>
											</div>	
										</div>
										
									</div>
								</div>
							))}
						</div>
						<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-end flex-column'>
							<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-around'>
								<Field style={{width:'200px',height:'30px'}} placeHolder='password' reqOnChange={(e)=>{dispatch({type:'_password',data: e.target.value})}}/>
							</div>
							<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-around '>
								<Button style={{height:'30px',width:'100px'}} title='Cancel' click={()=> window.history.back()}/>
								<Button style={{height:'30px',width:'150px',backgroundColor:'#385723',color:'white'}} title='Save Changes' click={handler}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


