import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//style
import '../styles/button.css'

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';

export default function MobileRListFilter(props){
	return(
		<>
			<div style={{width:'100%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column">
				<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
					<SearcBar className='MobileSearch'/>				
				</div>
				<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'100%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
						
					</div>
				</div>
			</div>	
		</>
	);
}


