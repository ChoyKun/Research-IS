import React,{useState, useEffect, useReducer} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../modules/config.js';

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
import FileUpload from '../components/fields/file-render';
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
		lead: null,
		mem1: null,
		mem2: null,
		mem3: null,
		mem4: null,
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
			case 'lead':
				state.lead = action.data;
				return state;
			case 'mem1':
				state.mem1 = action.data;
				return state;
			case 'mem2':
				state.mem2 = action.data;
				return state;
			case 'mem3':
				state.mem3 = action.data;
				return state;
			case 'mem4':
				state.mem4 = action.data;
				return state;
			case 'PDFFile':
				state.PDFFile = action.data;
				return state;
		}
	}

	const [data,dispatch] = useReducer(reducer,state);

	const handler = ()=>{
		const send = window.confirm("Uploaded researches will not be editable do you want to continue");
		if(send == true){
			data.researchCategories = JSON.stringify( data.researchCategories );

			axios.post('http://localhost:7000/research/rlist/upload',data)
			.then((res) => {
				alert( res.data.message );
				data.researchCategories = JSON.parse( data.researchCategories )
			})
			.catch((err)=>{
				alert( err.response.data.message );
			})
		}
		else{
			alert("Operation canceled")
		}
	}

	const handlePdfUpload = ( path ) => {
		dispatch({ type: 'PDFFile', data: path });
	}

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Upload new Research</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/admin-rlist/${username}`}><Button style={{height:'50px',width:'200px'}} title='Public Research'/></Link>
				<Link to={`/admin-archive/${username}`}><Button style={{height:'50px',width:'200px'}} title='Archived'/></Link>
				<Link to={`/admin-upload/${username}`}><Button style={{height:'50px',width:'200px'}} title='Upload new Research'/></Link>
				<Link to={`/admin-request/${username}`}><Button style={{height:'50px',width:'200px'}} title='Research Requests'/></Link>					
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'95%', width:'95%', backgroundColor:'white', border:'1px solid black', color: 'black'}} className='d-flex justify-content-center align-items-center flex-column'>
					<div style={{height:'95%',width:'95%'}} className='d-flex align-items-center flex-row'>
						<div style={{height:'95%',width:'50%'}}>
								<label style={{fontSize:'20px'}}>Add new research</label>
								<div style={{height:'10%',width:'400px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'20px'}}>Title: </label>
									<Field style={{width:'300px'}} reqOnChange={(e)=>(dispatch({type:'title', data: e.target.value }))}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<Select style={{width:'300px'}} label='Select Course:' options={['BSIT','BSCS']} reqOnChange={(e)=>(dispatch({type:'course', data: e.target.value }))} />
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{width:'300px'}}>Year Submitted:</label>
									<Field style={{width:'300px'}} placeHolder='ex. 2001' reqOnChange={(e)=>(dispatch({type:'yearSubmitted', data: e.target.value }))}/>
								</div>
								<label style={{fontSize:'20px'}}>Group Members</label>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Leader:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'lead', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Member 1:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem1', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Member 2:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem2', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Member 3:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem3', data: e.target.value});}}/>
								</div>
								<div style={{height:'10%',width:'300px'}} className='d-flex justify-content-between align-items-center flex-row'>
									<label style={{fontSize:'18px'}}>Member 4:</label>
									<Field className='fName' reqOnChange={(e) => {dispatch({type: 'mem4', data: e.target.value});}}/>
								</div>
							</div>
							<div style={{height:'95%',width:'50%'}} className="d-flex flex-column justify-content-around align-items-center">
								<div style={{height: '90%', width: '100%'}} className="py-4 d-flex flex-row justify-content-around align-items-center">
									<div style={{height:'100%',width:'200px'}} className="d-flex flex-column justify-content-center align-items-center">
										<label style={{fontSize:'18px'}}>Research Categories</label>
										<div style={{height:'90%',width:'100%',backgroundColor:'white',border:'1px solid black'}} className='px-3 d-flex flex-column justify-content-around'>
											<Checkbox cLabel='Hardware' value='Hardware' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Hardware', data: e.target.checked }))}/>
											<Checkbox cLabel='Software' value='Software' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Software', data: e.target.checked }))}/>
											<Checkbox cLabel='Web System' value='Web System' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Web System', data: e.target.checked }))}/>
											<Checkbox cLabel='Game Dev' value='Game Dev' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Game Dev', data: e.target.checked }))}/>
											<Checkbox cLabel='Augmented Reality' value='Augmented Reality' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Augmented Reality', data: e.target.checked }))}/>
											<Checkbox cLabel='Mobile App'value='Mobile App' reqOnChange={(e)=>(dispatch({type:'researchCategories',name:'Mobile App', data: e.target.checked }))} />
										</div>
									</div>
									<div style={{height:'100%',width:'200px'}} className='d-flex flex-column'>
										<FileUpload active={true} title={data.title} fileCatcher={handlePdfUpload}/>
									</div>
								</div>
								<div style={{height:'10%',width:'200px'}} className='d-flex flex-column'>
									<Button click={handler} style={{height:'30px',width:'130px'}} title='Upload'/>
								</div>
							</div>	
					</div>
				</div>
			</div>
		</>
	);
}



{/*
















*/}