import React,{useState, useEffect} from 'react';

//images
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
		<div style={{width: '100%', height: '100%', color:'white'}} className="main-container">
			<div style={{width: '100%', height: '10%', backgroundColor:'#385723',color:'white'}} className="main-banner text-center d-flex justify-content-center align-items-center">
				<h1>SCS RESEARCH PORTAL</h1>
			</div>

			<div style={{width: '100%', height: '7%'}} className="menu-bar d-flex flex-row">
				<div style={{backgroundColor: '#385723', height: '100%', width: '8%',color:'white'}} className='text-center'><h1>SCS</h1></div>
				<div style={{backgroundColor:'#70AD47', height: '100%', width: '92%'}} className="d-flex flex-row justify-content-between align-items-center"> 
					<div className="col-2 text-center"> MENU </div>
					<div className="col-4 text-center"> JUDY MAUNAHAN </div>
				</div>
			</div>
			
			

			<div style={{width: '100%', height: '83%'}} className="d-flex flex-row">
				
				<div style={{backgroundColor:'#404040',width:'8%',height:"100%"}}className="side-panel d-flex flex-column">
					<img src={scslogo}/>
				</div>

				<div style={{width:'92%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column">
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
									<div style={{height:'50%',width:'95%'}} className="d-flex flex-column justify-content-around">
										<div className="login-field d-flex flex-column align-items-center justify-content-between">
											<Field placeHolder="username"/>
											<Field placeHolder="password"/>
											<Button className="login-button" title="Sign me in" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>

			
		</div>
	);
}


