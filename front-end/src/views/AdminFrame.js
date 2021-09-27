import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"
import drawer from "../images/drawer.png"
import rlist from "../images/rlist.png"

import IconBtn from '../components/buttons/iconbtn';

export default function Frame(props){
	const [isMenuOpen, setIsMenuOpen] = useState( false );

	const reqOpenMenu = () => {
		setIsMenuOpen( !isMenuOpen );
	}

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
					<div style={{height:'100%',width:'95%'}} className='d-flex flex-row justify-content-between align-items-center'>
						<IconBtn style={{height:'25px',width:'40px'}} icon={drawer} onClick={reqOpenMenu} className="col-3 ml-3"/>
						<div className="col-2 text-center"></div>
					</div>
				</div>
			</div>
			
			

			<div style={{width: '100%', height: '83%'}} className="d-flex flex-row">
				
				{/*side panel*/}
				{ isMenuOpen ? <OpenedMenu /> : <ClosedMenu />}

				{/*rightside*/}
				<div style={{width:'92%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column">
					{ props.children }
				</div>	
			</div>
		</div>
	);
}


function OpenedMenu( props ){

	const {username} = useParams();
	return(
		<div style={{backgroundColor:'#404040',width: '40%',height:"100%"}}className="side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"80%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
				<img style={{height:'130px',width:'150px'}} src={scslogo}/>
				<div style={{height:'3px',width:'250px',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'></div>
				<Link to={`/admin-rlist/${username}`}>
					<div className='d-flex justify-content-around align-items-center'>
						<img style={{height:'40px',width:'40px'}} src={rlist}/>
						<h6 style={{fontSize:'20px'}}>Research Management</h6>
					</div>
				</Link>
				<Link to={`/admin-current-officer/${username}`}>
					<div className='d-flex justify-content-around align-items-center'>
						<img style={{height:'40px',width:'40px'}} src={lock}/>
						<h6 style={{fontSize:'20px'}}>Officer Management</h6>
					</div>
				</Link>
				<Link to={`/admin-slist/${username}`}>
					<div className='d-flex justify-content-around align-items-center'>
						<img style={{height:'40px',width:'40px'}} src={lock}/>
						<h6 style={{fontSize:'20px'}}>Student's List</h6>
					</div>
				</Link>
				<Link to={`/admin-profile/${username}`}>
					<div className='d-flex justify-content-around align-items-center'>
						<img style={{height:'40px',width:'40px'}} src={lock}/>
						<h6 style={{fontSize:'20px'}}>Change Research Coordinator</h6>
					</div>
				</Link>
				<Link to={`/admin-changepass/${username}`}>
					<div className='d-flex justify-content-around align-items-center'>
						<img style={{height:'40px',width:'40px'}} src={lock}/>
						<h6 style={{fontSize:'20px'}}>Change Password</h6>
					</div>
				</Link>
				<Link to="/sign-in">
					<div className='d-flex justify-content-around align-items-center'>
						<h6 style={{fontSize:'23px'}}>Log out</h6>
					</div>
				</Link>
			</div>
		</div>
	);
}


function ClosedMenu( props ){
	return(
		<div style={{backgroundColor:'#404040',width: '8%',height:"100%"}}className="side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"50%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
				<img style={{height:'60px',width:'70px'}} src={scslogo}/>
				<div style={{height:'3px',width:'60px',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'></div>
				<img style={{height:'50px',width:'50px'}} src={profile}/>
				<img style={{height:'50px',width:'50px'}} src={lock}/>
			</div>
		</div>
	);
}