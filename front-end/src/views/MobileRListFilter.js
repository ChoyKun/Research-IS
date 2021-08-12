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
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'100%', width:'90%'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'90%',width:'95%'}} className='d-flex flex-column justify-content-center'>
						<div style={{height:'80%',width:'100%'}} className='d-flex justify-content-around flex-column'>
							<h6 style={{color:'black'}}>Filters:</h6>
							<div style={{width:'50%', color:'black'}}>
								<Select className='sfilterCourse' label='Select Course:' options={['BSIT','BSCS']}/>
							</div>
							<div style={{width:'100%', color:'black'}}>
								<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
									<div style={{height:'100%', width:'50%'}} className='d-flex align-items-center'>
										<label>Research Categories</label>
									</div>
									<div style={{height:'100%', width:'80%'}} className='d-flex justify-content-around align-items-center flex-column'>
										<div style={{height:'50%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Hardware'/>
											<Checkbox cLabel='Software'/>
											<Checkbox cLabel='Web System'/>
										</div>
										<div style={{height:'50%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Game Dev'/>
											<Checkbox cLabel='AR'/>
											<Checkbox cLabel='Mobile App'/>
										</div>
									</div>
								</div>
							</div>
							<div style={{width:'100%', color:'black'}} className='d-flex flex-row'>
								<label style={{width:'300px'}}>Year Submitted:</label>
								<Field placeHolder='ex. 2001'/>
							</div>
							<div style={{width:'40%', color:'black'}}>
								<Select className='sfilterAlphabetical' label='Sort from:' options={['A-Z','Z-A']}/>
							</div>
							<div style={{width:'60%', color:'black'}}>
								<Select className='sfilterYear' label='Sort by year:' options={['Newest','Oldest']}/>
							</div>
						</div>
						<div style={{height:'20%',width: '100%'}}>
							<div style={{height:'100%', width:'100%'}} className='d-flex flex-row'>
								<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-around align-items-center'>
									<Button className='sfilterCancel' title='Cancel'/>
								</div>
								<div style={{height:'100%',width:'80%'}} className='d-flex flex-row-reverse'>
									<div style={{height:'100%', width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-reverse'>
										<Button className='sfilterShow' title='Show Result'/>
										<Button className='sfilterSave' title='Save'/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


