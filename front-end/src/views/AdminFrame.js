import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';	
import Cookies from 'js-cookie';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"
import drawer from "../images/drawer.png"
import rlist from "../images/rlist.png"
import profileMIS from "../images/profile-MIS.png";
import profileStudent from "../images/profile-students.png";

import IconBtn from '../components/buttons/iconbtn';
import Button from '../components/buttons/button';

export default function Frame(props){
	const [isMenuOpen, setIsMenuOpen] = useState( false );

	const reqOpenMenu = () => {
		setIsMenuOpen( !isMenuOpen );
	}

	// React.useEffect(() => {
	// 	props?.authenticate?.();
	// }, []);

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

	const handleSignOut = async () => {
		const token = Cookies.get('token');

		axios.delete('http://localhost:7000/sign-out', { token })
		.then(() => {
			Cookies.remove('token');
			Cookies.remove('rtoken');
		})
		.catch( err => {
			throw err;
		});
	}

	return(
		<div style={{backgroundColor:'#404040',width: '40%',height:"100%"}}className="side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"80%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
				<img style={{height:'130px',width:'150px'}} src={scslogo}/>
				<div style={{height:'3px',width:'250px',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'></div>
				<div style={{width:'90%'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={rlist}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/admin-rlist/${username}`}><Button style={{height:'40px' , width:'100%'}} title='Research Management'/></Link>
					</div>
				</div>
				<div style={{width:'90%'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={profileMIS}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/admin-current-officer/${username}`}><Button style={{height:'40px' , width:'100%'}} title='Officer Management'/></Link>
					</div>
				</div>
				<div style={{width:'90%'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={profileStudent}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/admin-slist/${username}`}><Button style={{height:'40px' , width:'100%'}} title="Student's List"/></Link>
					</div>
				</div>
				<div style={{width:'90%'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={profile}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/admin-profile/${username}`}><Button style={{height:'40px' , width:'100%'}} title="Admin Management"/></Link>
					</div>
				</div>
				<div style={{width:'90%'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
						<img style={{height:'40px',width:'40px'}} src={lock}/>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/admin-changepass/${username}`}><Button style={{height:'40px' , width:'100%'}} title="Change Password"/></Link>
					</div>
				</div>
				<div style={{width:'90%'}} className='d-flex flex-row justify-content-around align-items-center'>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'20%'}}>
					</div>
					<div classname="d-flex justify-content-center align-items-center" style={{width:'80%'}}>
						<Link to={`/sign-in`}><Button click={handleSignOut} style={{height:'40px' , width:'100%'}} title='Log-out'/></Link>
					</div>
				</div>
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
				<img style={{height:'40px',width:'40px'}} src={rlist}/>
				<img style={{height:'40px',width:'40px'}} src={profileMIS}/>
				<img style={{height:'40px',width:'40px'}} src={profileStudent}/>
				<img style={{height:'40px',width:'40px'}} src={profile}/>
				<img style={{height:'40px',width:'40px'}} src={lock}/>
			</div>
		</div>
	);
}