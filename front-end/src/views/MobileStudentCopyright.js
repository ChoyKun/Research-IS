import React,{useState, useEffect} from 'react';

//style
import '../styles/button.css'

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';

export default function MobileStudentCopyright(props){
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
					<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
						<SearcBar className='MobileSearch'/>				
					</div>
					<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
						<div style={{height:'100%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
							<div style={{height:'95%', width:'95%', background:'linear-gradient( to bottom, #a1c7f6, #ffffff)', border:'1px solid black',color:'black'}} className='d-flex justify-content-center align-items-center'>
								<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
									<div style={{height:'70%',width:'100%'}} className="p-3 d-flex justify-content-around flex-column">
										<h3 style={{fontSize:'25px'}}>Copyright Agreement</h3>
										<p style={{fontSize:'18px'}}>The author’s of this thesis has all rights of this document. You are given permission ”just” to read / view this document for study. Copying anything from this document is illegal and is punishable under the law. </p>
									</div>
									<div style={{height:'30%',width:'100%'}} className="d-flex flex-row-reverse justify-content-around">
										<Button className='crAcceptMobile' title='Accept'/>
										<Button className='crDeclineMobile' title='Decline'/>
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


