import React,{useState, useEffect} from 'react';

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

				</div>

				<div style={{width:'92%', height:'100%', backgroundColor:'#e2f0d9'}}className="content-box d-flex flex-column">
					<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
						<Button className='AdminMenu' title='List of Students'/>
						<Button className='AdminMenu' title='Upload new Research'/>
						<Button className='AdminMenu' title='Register new user'/>
						<Button className='AdminMenu' title='Archived'/>		
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
				</div>	
			</div>

			
		</div>
	);
}


