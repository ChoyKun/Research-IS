import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";

//Styles
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';

export default function StudentChangePass(props){
	return(
		<>
			<div style={{height:'100%',width:'100%'}} className='d-flex flex-column justify-content-center align-items-center'>
				<div style={{height:'10%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
					<h2>Change Password</h2>				
				</div>
				<div style={{height:'90%', width:'90%', color:'black',backgroundColor:'white', border:'1px solid black'}} className='d-flex  flex-column justify-content-center align-items-center'>
					<div style={{height:'70%', width:'100%'}} className='d-flex justify-content-center flex-column'>
						<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
							<h3 >Current Password</h3>
							<Field style={{width:'100%'}}/>
						</div>
						<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
							<h3 >New Password</h3>
							<Field style={{width:'100%'}}/>
						</div>
						<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
							<h3 >Re-Enter Password</h3>
							<Field style={{width:'100%'}}/>
						</div>
					</div>
					<div style={{height:'20%', width:'100%'}} className='d-flex align-items-center justify-content-center'>
						<Button className='changePassBtn' title='Save Changes'/>
					</div>
				</div>
			</div>

		</>
	);
}


