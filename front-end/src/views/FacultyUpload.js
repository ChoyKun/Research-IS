import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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
	const {username} = useParams();

	const state = {
		title: null,
		course: 'BSIT',
		researchCategories: [],
		yearSubmitted: null,
		PDFFile:null,
		status:'public',
		favorites:'false'
	}

	function reducer(state, action){
		console.log(state);
		switch(action.type){
			case 'title':
				state.title = action.data;
				return state;
			case 'course':
				state.course = action.data;
				return state;
			case 'researchCategories':
				if(action.data){
					state.researchCategories.push(action.name);
				}
				else{
					state.researchCategories.splice(state.researchCategories.indexOf(action.name), 1);
				}
				
				return state;
			case 'yearSubmitted':
				state.yearSubmitted = action.data;
				return state;
			case 'PDFFile':
				state.PDFFile = action.data;
				return state;
		}
	}

	const [data,dispatch] = useReducer(reducer,state);

	const handler = ()=>{
		data.researchCategories = JSON.stringify( data.researchCategories );

		axios.post('http://localhost:7000/research/rlist/upload',data)
		.then(() => {
			data.researchCategories = JSON.parse( data.researchCategories )
		})
		.catch((err)=>{
			console.log(err);
		})


	}

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/faculty-slist/${username}`}><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to={`/faculty-upload/${username}`}><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to={`/faculty-reg/${username}`}><Button className='AdminMenu' title='Register new Student'/></Link>
				<Link to={`/admin-access/${username}`}><Button className='AdminMenu' title='Archived'/></Link>					
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color: 'black'}} className='d-flex justify-content-center align-items-center flex-column'>
					<div style={{height:'95%',width:'95%'}} className='d-flex align-items-center flex-column'>
						<div style={{height:'60%',width:'100%'}} className='d-flex justify-content-around flex-column'>
							<label style={{fontSize:'20px'}}>Add new research</label>
							<div style={{width:'60%'}} className='d-flex flex-row justify-content-around'>
								<label style={{fontSize:'20px'}}>Title: </label>
								<Field reqOnChange={(e)=>(dispatch({type:'title', data: e.target.value }))}/>
							</div>
							<div style={{width:'30%'}}>
								<Select className='aUpload' label='Select Course:' options={['BSIT','BSCS']} reqOnChange={(e)=>(dispatch({type:'course', data: e.target.value }))} />
							</div>
							<div style={{height:'20%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'50%', width:'30%'}} className='d-flex align-items-center'>
										<label>Research Categories</label>
									</div>
									<div style={{height:'100%', width:'70%'}} className='d-flex justify-content-around align-items-center flex-column'>
										<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Hardware' value='Hardware' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Hardware', data: e.target.checked }))}/>
											<Checkbox cLabel='Software' value='Software' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Software', data: e.target.checked }))}/>
											<Checkbox cLabel='Web System' value='Web System' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Web System', data: e.target.checked }))}/>

										</div>
										<div style={{height:'20%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Game Dev' value='Game Dev' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Game Dev', data: e.target.checked }))}/>
											<Checkbox cLabel='Augmented Reality' value='Augmented Reality' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Augmented Reality', data: e.target.checked }))}/>
											<Checkbox cLabel='Mobile App'value='Mobile App' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Mobile App', data: e.target.checked }))} />
										</div>
									</div>
							</div>
							<div style={{width:'40%', color:'black'}} className='d-flex flex-row'>
								<label style={{width:'300px'}}>Year Submitted:</label>
								<Field placeHolder='ex. 2001' reqOnChange={(e)=>(dispatch({type:'yearSubmitted', data: e.target.value }))}/>
							</div>
						</div>
						<div style={{height:'15%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
							<div style={{width:'80%'}} className='d-flex justify-content-around flex-row'>
								<Field type='file' title='Attach File'/>
							</div>
						</div>
						<div style={{height:'15%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row'>
							<div style={{width:'75%'}} className='d-flex flex-row'>
								<Button className='aMore' title='Add More Files'/>
							</div>
						</div>
						<div style={{height:'10%',width:'100%'}} className='d-flex justify-content-around align-items-center flex-row-reverse'>
							<div style={{width:'30%'}} className='d-flex  justify-content-around flex-row-reverse'>
								<Button click={handler} className='aBatchBtn' title='Upload'/>
								<Button className='aBatchBtn' title='Batch Upload'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}



