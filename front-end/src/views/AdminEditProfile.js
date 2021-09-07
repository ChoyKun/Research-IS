import React,{useState, useEffect, useReducer} from 'react';
import { Link, use } from 'react-router-dom';
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


export default function AdminEditProfile(props){
	const state={
		_username : null, 
		_password : null,
		_name:null,
		_position: null,
		_birthday: null
	}
	const [adminData, setAdminData] = useState(null);

	function reducer(state,action){
		switch(action.type){
			case '_username':
				state._username=action.data;
				return state;
			case '_password':
				state._password=action.data;
				return state;
				console.log(state)
			case '_name':
				state._name=action.data;
				return state;
			case '_position':
				state._position=action.data;
				return state;
			case '_birthday':
				state._birthday=action.data;
				return state;
		}
	}

	const [data,dispatch] = useReducer(reducer, state);

	const handler =()=>{
		axios.put('http://localhost:7000/auth-admin/editprofile', data)
		.catch((err)=>{
			alert( err.response.data.message );
		})
	}

	useEffect(()=>{
		axios.get('http://localhost:7000/auth-admin/profile')
		.then(res=>{
			console.log( res.data.data );
			setAdminData(res.data.data)
		})
		.catch(err=>{
			console.log(err)
		})
	},[]);

	const getDateFrom = ( dateString ) => {
    	const date = new Date( dateString );



		const year = date.getFullYear();
		const month = date.getMonth().toString().length < 2 ? `0${date.getMonth().toString()}` : date.getMonth();
		const day = date.getDay().toString().length < 2 ? `0${date.getDay().toString()}` : date.getDay();

		const formated = `${year}-${month}-${day}`;

		return formated;
    }

	return(
		<>
			<div style={{height:'8%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to="/admin-slist"><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/admin-rlist'><Button className='AdminMenu' title='List of Research'/></Link>
				<Link to='/admin-rlist'><Button className='AdminMenu' title='List of Faculties'/></Link>
				<Link to="/admin-upload"><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to="/admin-reg"><Button className='AdminMenu' title='Register new Adviser'/></Link>
				<Link to="/admin-archive"><Button className='AdminMenu' title='Archived'/></Link>					
			</div>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Edit Profile</h2>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-around'>
					<div style={{height:'95%', width:'95%'}} className='d-flex justify-content-around flex-column'>
						<div style={{height:'40%',width:'100%'}} className='d-flex justify-content-start'>
							<div style={{height:'100%',width:'225px', border:'1px solid black'}}> </div>
						</div>
						<div style={{height:'35%',width:'100%',color:'black'}} className='d-flex justify-content-around flex-column'>
							<div style={{width:'300px'}} className='d-flex justify-content-between'>
								<label style={{fontSize:'20px'}}>Name:</label>
								<Field style={{width:'200px'}} placeHolder={adminData?.name} reqOnChange={(e)=>{dispatch({type:'_name',data: e.target.value})}}/>
							</div>
							<div style={{width:'300px'}} className='d-flex justify-content-between'>
								<label style={{fontSize:'20px'}}>Position:</label>
								<Field style={{width:'200px'}} placeHolder={adminData?.position} reqOnChange={(e)=>{dispatch({type:'_position',data: e.target.value})}}/>
							</div>
							<div style={{width:'300px'}} className='d-flex justify-content-between'>
								<label style={{fontSize:'20px'}}>Username:</label>
								<Field style={{width:'200px'}}placeHolder={adminData?.username} reqOnChange={(e)=>{dispatch({type:'_username',data: e.target.value})}}/>
							</div>
							<div style={{width:'300px'}} className='d-flex justify-content-between'>
								<label style={{fontSize:'20px'}}>Birthday:</label>
								<Field type='date' style={{width:'200px'}} value={getDateFrom(adminData?.birthday)} reqOnChange={(e)=>{dispatch({type:'_birthday',data: e.target.value})}}/>
							</div>	
						</div>
						<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-end flex-column align-items-center'>
							<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-around'>
								<Field style={{width:'200px',height:'30px'}} placeHolder='password' reqOnChange={(e)=>{dispatch({type:'_password',data: e.target.value})}}/>
							</div>
							<div style={{height:'100%',width:'30%'}} className='d-flex justify-content-around '>
								<Button style={{height:'30px',width:'100px'}} title='Cancel' click={()=>window.history.back()}/>
								<Button style={{height:'30px',width:'150px',backgroundColor:'#595959',color:'white'}} title='Save Changes' click={handler}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


