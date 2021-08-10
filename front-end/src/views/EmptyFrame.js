import React, {useState, useEffect} from 'react';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"


export default function EmptyFrame(props){
	return(
		<div style={{width: '100%', height: '100%', color:'white'}} className="main-container">

			{/*main header*/}
			<div style={{width: '100%', height: '10%', backgroundColor:'#385723',color:'white'}} className="main-banner text-center d-flex justify-content-center align-items-center">
				<h1>SCS RESEARCH PORTAL</h1>
			</div>

			{/*sub header*/}
			<div style={{width: '100%', height: '7%'}} className="menu-bar d-flex flex-row">
				<div style={{backgroundColor: '#385723', height: '100%', width: '8%',color:'white'}} className='text-center'><h1>SCS</h1></div>
				<div style={{backgroundColor:'#70AD47', height: '100%', width: '92%'}} className="d-flex flex-row justify-content-center align-items-center"> 
					<div style={{height:'100%',width:'95%'}} className='d-flex flex-row justify-content-end align-items-center'>
						
						<div className="col-2 text-center"> JUDY MAUNAHAN </div>
					</div>
				</div>
			</div>
			
			

			<div style={{width: '100%', height: '83%'}} className="d-flex flex-row">
				
				{/*side panel*/}
				<div style={{backgroundColor:'#404040',width:'8%',height:"100%"}}className="side-panel d-flex flex-column align-items-center">
					<div style={{backgroundColor:'#404040',width:'100%',height:"50%"}}className="side-panel d-flex flex-column justify-content-start align-items-center">
						<img style={{height:'70px',width:'70px'}} src={scslogo}/>
					</div>
				</div>

				{/*rightside*/}
				<div style={{width:'92%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column justify-content-center align-items-center">
					{ props.children }
				</div>	
			</div>
		</div>
	);
}

