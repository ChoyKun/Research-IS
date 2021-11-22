import React,{useState, useEffect, useReducer, useContext} from 'react';
import { Link } from 'react-router-dom';

//style
import '../styles/button.css'

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Select from '../components/fields/select';
import Checkbox from '../components/fields/checkbox';

import FilterContext from '../contexts/filter-context';

export default function SListFilter(props){
	const filter = useContext( FilterContext );

	const initState = {
		course: 'BSIT',
		section: 'null',
		yearRegistered: new Date().getFullYear(),
		yearLevel: '1-4',
		order: 'A-Z'
	}

	const reducer = (state, action) => {
		switch( action.type ){
			case 'course':
				state.course = action.data;
				return state;
			case 'section':
				state.section = action.data;
				return state;
			case 'yearLevel':
				state.order = action.data;
				return state;

			case 'order':
				state.year = action.data;
				return state;

			default:
				throw new Error(`Action type "${action.type}" is not recognized`);
		}
	}

	const [state, dispatch] = useReducer(reducer, initState);

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
							<Select className='sfilterCourse' label='Select Course:' options={['BSIT','BSCS']} reqOnChange={e => dispatch({type: 'course', data: e.target.value})}/>
						</div>
						<div style={{width:'20%', color:'black'}} className='d-flex flex-row justify-content-around'>
							<label>Section: </label>
							<Field className='aRegSection' reqOnChange={e => dispatch({type: 'section', data: e.target.value})}/>
						</div>
						<div style={{width:'20%', color:'black'}}>
							<Select className='sfilterAlphabetical' label='Sort from:' options={['1-4','4-1']} reqOnChange={e => dispatch({type: 'yearLevel', data: e.target.value})}/>
						</div>
						<div style={{width:'25%', color:'black'}}>
							<Select className='sfilterYear' label='Sort by Initials:' options={['A-Z','Z-A']} reqOnChange={e => dispatch({type: 'order', data: e.target.value})}/>
						</div>
					</div>
					<div style={{height:'20%',width: '100%'}}>
						<div style={{height:'100%', width:'100%'}} className='d-flex flex-row'>
							<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-around align-items-center'>
								<Button className='sfilterCancel' title='Cancel' click={()=> window.history.back()}/>
							</div>
							<div style={{height:'100%',width:'80%'}} className='d-flex flex-row-reverse'>
								<div style={{height:'100%', width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-reverse'>
									<Button className='sfilterShow' title='Show Result'click={() => {
										filter.setSFilter( state );
										window.history.back();
									}}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


