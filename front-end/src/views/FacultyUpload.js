import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"

//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';


export default function FacultyUpload(props){
	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to='/faculty-slist'><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/faculty-upload'><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to='/faculty-reg'><Button className='AdminMenu' title='Register new Student'/></Link>
				<Link to='/admin-access'><Button className='AdminMenu' title='Archived'/></Link>					
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color: 'black'}} className='d-flex justify-content-center align-items-center flex-column'>
					<div style={{height:'95%',width:'95%'}} className='d-flex align-items-center flex-column'>
						<div style={{height:'60%',width:'100%'}} className='d-flex justify-content-around flex-column'>
							<label style={{fontSize:'20px'}}>Add new research</label>
							<div style={{width:'60%'}} className='d-flex flex-row justify-content-around'>
								<label style={{fontSize:'20px'}}>Title: </label>
								<Field/>
							</div>
							<div style={{width:'30%'}}>
								<Select className='aUpload' label='Select Course:' options={['BSIT','BSCS']}/>
							</div>
							<div style={{height:'20%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'50%', width:'30%'}} className='d-flex align-items-center'>
										<label>Research Categories</label>
									</div>
									<div style={{height:'100%', width:'70%'}} className='d-flex justify-content-around align-items-center flex-column'>
										<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Hardware'/>
											<Checkbox cLabel='Software'/>
											<Checkbox cLabel='Web System'/>
										</div>
										<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Game Dev'/>
											<Checkbox cLabel='Augmented Reality'/>
											<Checkbox cLabel='Mobile App'/>
										</div>
									</div>
							</div>
							<div style={{width:'40%', color:'black'}} className='d-flex flex-row'>
								<label style={{width:'300px'}}>Year Submitted:</label>
								<Field placeHolder='ex. 2001'/>
							</div>
						</div>
						<div style={{height:'15%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
							<div style={{width:'80%'}} className='d-flex justify-content-around flex-row'>
								<Button className='aUploadBtn' title='Attach File'/>
								<Field className='aUploadTxt'/>
							</div>
						</div>
						<div style={{height:'15%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
							<div style={{width:'75%'}} className='d-flex flex-row'>
								<Button className='aMore' title='Add More Files'/>
							</div>
						</div>
						<div style={{height:'10%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
							<div style={{width:'75%'}} className='d-flex flex-row-reverse'>
								<Button className='aBatchBtn' title='Batch Upload'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


