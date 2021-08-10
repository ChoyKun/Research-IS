import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png";



//style
import '../styles/button.css'
import '../styles/login.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function AdminLogin(props){
	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
										
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', background:'linear-gradient( to bottom, #a1c7f6, #ffffff)', border:'1px solid black',color:'black'}} className='d-flex justify-content-center align-items-center'>
						<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
							<div style={{height:'50%',width:'100%'}} className="p-3 d-flex justify-content-around align-items-center flex-column">
								<img src={lock} style={{height:"150px"}}/>
								<h1 style={{fontSize:'40px'}}>Research Coordinator Login</h1>
							</div>
							<div style={{height:'100%',width:'100%'}} className="d-flex flex-column justify-content-around">
								<div style={{height:'70%',width:'100%'}} className="login-field d-flex flex-column align-items-center justify-content-around flex-column">
									<Field className='txt' placeHolder="username"/>
									<Field className='txt' placeHolder="password"/>
									<Button className="login-button" title="Sign me in" />
									<Link to='/admin-access' style={{width:'80%'}}><Button className="GoBack" title="Go Back" /></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


