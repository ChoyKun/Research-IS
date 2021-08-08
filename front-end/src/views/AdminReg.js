import React,{useState, useEffect} from 'react';

//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';


export default function AdminReg(props){
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
						<Button className='AdminMenu' title='List of Research'/>
						<Button className='AdminMenu' title='Upload new Research'/>
						<Button className='AdminMenu' title='Register new Adviser'/>
						<Button className='AdminMenu' title='Archived'/>					
					</div>
					<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
						<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
							<div style={{height:'95%', width:'95%', color:'black'}}>
								<div style={{height:'50%',width:'100%'}} className='d-flex justify-content-center'>
									<div style={{height:'95%',width:'95%'}} className='d-flex flex-column'>
										<div>
											<label style={{fontSize:'20px'}}>Register New Adviser</label>
										</div>
										<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-around align-items-center'>
											<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='uNametxt'/>
												<label style={{fontSize:'18px'}}>Username</label>
											</div>
											<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='Passwordtxt'/>
												<label style={{fontSize:'18px'}}>Password</label>
											</div>
											<Button className='autoGeneratebtn' title='Auto Generate'/>
										</div>
										<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
											<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='fName'/>
												<label style={{fontSize:'18px'}}>First Name</label>
											</div>
											<div style={{height:'100%',width:'10%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='mInitial'/>
												<label style={{fontSize:'18px'}}>M.I.</label>
											</div>
											<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='lName'/>
												<label style={{fontSize:'18px'}}>Last Name</label>
											</div>
											<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-center align-items-center flex-column'>
												<Field className='eName'/>
												<label style={{fontSize:'18px'}}>Name Extention</label>
											</div>
										</div>
									</div>
								</div>
								<div style={{height:'20%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
										<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-center align-items-center flex-column'>
											<Field placeHolder='Enter Date Here'/>
											<label style={{fontSize:'18px'}}>Birth Date</label>
										</div>
										<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-center align-items-center flex-column'>
													<Field placeHolder='Enter Date Here'/>
													<label>Date Registered</label>
												</div>
									</div>
								</div>
								<div style={{height:'30%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'100%',width:'100%'}} className='d-flex flex-row justify-content-center'>
										<div style={{height:'100%',width:'40%'}} className='d-flex justify-content-center align-items-center flex-row'>
											<div style={{height:'80%',width:'50%',backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'></div>
											<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-center align-items-center'>
												<Button title='Upload Photo' className='aRegUploadPhoto'/>
											</div>
										</div>
										<div style={{height:'100%',width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-revers'>
											<Button title='Edit' className='aRegEdit'/>
											<Button title='Upload' className='aRegUploadBtn'/>
										</div>
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


