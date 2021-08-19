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

export default function SListFilter(props){
	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
				<SearcBar className='Search'/>				
			</div>
			<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%',width:'95%'}}>
					<div style={{height:'80%',width:'100%'}} className='d-flex justify-content-around flex-column'>
						<h3 style={{color:'black'}}>Filters:</h3>
						<div style={{width:'30%', color:'black'}}>
							<Select className='sfilterCourse' label='Select Course:' options={['BSIT','BSCS']}/>
						</div>
						<div style={{width:'60%', color:'black'}} className='d-flex flex-row justify-content-around'>
							<label>Section: </label>
							<Field className='aRegSection'/>
							<label>Year Registered: </label>
							<Field placeHolder='ex. 2001'/>
						</div>
						<div style={{width:'20%', color:'black'}}>
							<Select className='sfilterAlphabetical' label='Sort from:' options={['1-4','4-1']}/>
						</div>
						<div style={{width:'25%', color:'black'}}>
							<Select className='sfilterYear' label='Sort by Initials:' options={['A-Z','Z-A']}/>
						</div>
					</div>
					<div style={{height:'20%',width: '100%'}}>
						<div style={{height:'100%', width:'100%'}} className='d-flex flex-row'>
							<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-around align-items-center'>
								<Button className='sfilterCancel' title='Cancel' click={()=> window.history.back()}/>
							</div>
							<div style={{height:'100%',width:'80%'}} className='d-flex flex-row-reverse'>
								<div style={{height:'100%', width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-reverse'>
									<Button className='sfilterShow' title='Show Result'/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


