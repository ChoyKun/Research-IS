import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"
import drawer from "../images/drawer.png"
import rlist from "../images/rlist.png"

//style
import '../styles/button.css'

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';
import IconBtn from '../components/buttons/iconbtn';

export default function MFrame(props){
	const [isMenuOpen, setIsMenuOpen] = useState( false );

	const reqOpenMenu = () => {
		setIsMenuOpen( !isMenuOpen );
	}

	return(
		<div style={{width: '100%', height: '100%', color:'white'}} className="main-container">
			<div style={{width: '100%', height: '10%', backgroundColor:'#385723',color:'white'}} className="main-banner text-center d-flex justify-content-center align-items-center">
				<h1>SCS RESEARCH PORTAL</h1>
			</div>

			<div style={{width: '100%', height: '10%'}} className="menu-bar d-flex flex-row">
				<div style={{backgroundColor:'#70AD47', height: '100%', width: '100%'}} className="d-flex flex-row justify-content-between align-items-center"> 
					<div style={{backgroundColor:'#548235', height: '70%', width: '100%'}} className="d-flex flex-row align-items-center" >
						<IconBtn style={{height:'25px',width:'40px'}} icon={drawer} onClick={reqOpenMenu} className="col-3 ml-3"/>
						<div className="col-4 text-center"> JUDY MAUNAHAN </div>
					</div>
				</div>
			</div>
			
			
			<div style={{width: '100%', height: '83%'}} className="d-flex flex-row">
				<div style={{width:'100%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-row">

					{ isMenuOpen ? <OpenedMenu /> : <ClosedMenu />}

					<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center flex-column'>
						{ props.children }
					</div>
				</div>	
			</div>
		</div>
	);
}


function OpenedMenu( props ){
	return(
		<div style={{backgroundColor:'#404040',width: '50%',height:"100%"}}className="side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"80%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
				<img style={{height:'130px',width:'150px'}} src={scslogo}/>
				<div style={{height:'3px',width:'250px',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center'></div>
				<Link to='/student-rlist'>
					<div style={{width:'100%'}} className='d-flex justify-content-around flex-row'>
						<img style={{height:'30px',width:'30px'}} src={rlist}/>
						<h6 style={{fontSize:'16px'}}>Research Lists</h6>
					</div>
				</Link>
				<Link to="/student-changepass">
					<div className='d-flex justify-content-around align-items-center'>
						<img style={{height:'30px',width:'30px'}} src={lock}/>
						<h6 style={{fontSize:'16px'}}>Change Password</h6>
					</div>
				</Link>
				<Link to="/sign-in">
					<div className='d-flex justify-content-around align-items-center'>
						<h6 style={{fontSize:'16px'}}>Log out</h6>
					</div>
				</Link>
			</div>
		</div>
	);
}

function ClosedMenu( props ){
	return(
		<div style={{backgroundColor:'#404040',width: '0%',height:"100%"}}className="side-panel d-flex flex-column align-items-center">
			<div style={{backgroundColor:'#404040',width:'100%',height:"50%"}}className="side-panel d-flex flex-column justify-content-around align-items-center">
			</div>
		</div>
	);
}