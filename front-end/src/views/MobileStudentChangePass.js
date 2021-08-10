import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//style
import '../styles/button.css'
import '../styles/txt.css'

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';

export default function MobileStudentChangePass(props){
	return(
		<div style={{width: '100%', height: '100%', color:'white'}} className="main-container">
			<div style={{width: '100%', height: '10%', backgroundColor:'#385723',color:'white'}} className="main-banner text-center d-flex justify-content-center align-items-center">
				<h1>SCS RESEARCH PORTAL</h1>
			</div>

			<div style={{width: '100%', height: '10%'}} className="menu-bar d-flex flex-row">
				<div style={{backgroundColor:'#70AD47', height: '100%', width: '100%'}} className="d-flex flex-row justify-content-between align-items-center"> 
					<div style={{backgroundColor:'#548235', height: '70%', width: '100%'}} className="d-flex flex-row align-items-center" >
						<div className="col-2 text-center"> MENU </div>
						<div className="col-4 text-center"> JUDY MAUNAHAN </div>
					</div>
				</div>
			</div>
			
			<div style={{width: '100%', height: '83%'}} className="d-flex flex-row">
				<div style={{width:'100%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column">
					<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
						<div style={{height:'100%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center flex-column'>
						<div style={{height:'10%', width:'100% !important', backgroundColor:'#4472c4', color:'white'}}className="d-flex flex-row justify-content-center align-items-center">
							<h2>Change Password</h2>				
						</div>
							<div style={{height:'70%', width:'100%', color:'black'}} className='d-flex justify-content-center flex-column'>
								<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
									<h4>Current Password</h4>
									<Field className='Changepasstxt' style={{width:'100%'}}/>
								</div>
								<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
									<h4 >New Password</h4>
									<Field className='Changepasstxt' style={{width:'100%'}}/>
								</div>
								<div style={{width:'100%', height:'30%'}} className='d-flex align-items-center flex-column'>
									<h4 >Re-Enter Password</h4>
									<Field className='Changepasstxt' style={{width:'100%'}}/>
								</div>
							</div>
							<div style={{height:'20%', width:'100%'}} className='d-flex align-items-center justify-content-center'>
								<Button className='changePassBtn' title='Save Changes'/>
							</div>
						</div>
					</div>
				</div>	
			</div>
		</div>
	);
}


