import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";

//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function StudentCopyRight(props){
	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
				<SearcBar/>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', background:'linear-gradient( to bottom, #a1c7f6, #ffffff)', border:'1px solid black',color:'black'}} className='d-flex justify-content-center align-items-center'>
						<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
							<div style={{height:'70%',width:'100%'}} className="p-3 d-flex justify-content-around flex-column">
								<h3 style={{fontSize:'40px'}}>Copyright Agreement</h3>
								<p style={{fontSize:'30px'}}>The author’s of this thesis has all rights of this document. You are given permission ”just” to read / view this document for study. Copying anything from this document is illegal and is punishable under the law. </p>
							</div>
							<div style={{height:'30%',width:'95%'}} className="d-flex flex-row-reverse justify-content-around">
								<Button className='crAccept' title='Accept'/>
								<Button className='crDecline' title='Decline'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


