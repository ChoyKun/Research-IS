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

export default function RListFilter(props){
	const filter = useContext( FilterContext );

	const initState = {
		course: 'BSIT',
		category: [],
		yearSubmitted: new Date().getFullYear(),
		order: 'A-Z',
		year: 'Newest'
	}

	const reducer = (state, action) => {
		switch( action.type ){
			case 'course':
				state.course = action.data;
				return state;

			case 'category':
				if( state.category.length ){
					if( state.category.includes( action.data ) ){
						state.category = state.category.filter( elem => elem !== action.data );
					}
					else{
						state.category.push( action.data );						
					}
				}
				else{
					state.category.push( action.data );						
				}

				return state;

			case 'yearSubmitted':
				state.yearSubmitted = action.data;
				return state;

			case 'order':
				state.order = action.data;
				return state;

			case 'year':
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
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'90%',width:'95%'}}>
						<div style={{height:'80%',width:'100%'}} className='d-flex justify-content-around flex-column'>
							<h3 style={{color:'black'}}>Filters:</h3>
							<div style={{width:'25%', color:'black'}}>
								<Select 
									className='sfilterCourse' 
									label='Select Course:' 
									options={['BSIT','BSCS']}
									reqOnChange={e => dispatch({type: 'course', data: e.target.value})}
								/>
							</div>
							<div style={{width:'100%', color:'black'}}>
								<div style={{height:'100%',width:'100%'}} className='d-flex flex-row'>
									<div style={{height:'100%', width:'30%'}} className='d-flex align-items-center'>
										<label>Research Categories</label>
									</div>
									<div style={{height:'100%', width:'70%'}} className='d-flex justify-content-around align-items-center flex-column'>
										<div style={{height:'50%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Hardware' value="Hardware" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
											<Checkbox cLabel='Software' value="Software" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
											<Checkbox cLabel='Web System' value="Web System" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
										</div>
										<div style={{height:'50%',width:'100%'}} className='d-flex justify-content-around flex-row'>
											<Checkbox cLabel='Game Dev' value="Game Dev" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
											<Checkbox cLabel='Augmented Reality'value="Augmented Reality" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
											<Checkbox cLabel='Mobile App' value="Mobile App" reqOnChange={e => dispatch({type: 'category', data: e.target.value})}/>
										</div>
									</div>
								</div>
							</div>
							<div style={{width:'40%', color:'black'}} className='d-flex flex-row'>
								<label style={{width:'300px'}}>Year Submitted:</label>
								<Field type="number" placeHolder='ex. 2001' reqOnChange={e => dispatch({type: 'yearSubmitted', data: e.target.value})}/>
							</div>
							<div style={{width:'20%', color:'black'}}>
								<Select className='sfilterAlphabetical' label='Sort from:' options={['A-Z','Z-A']}reqOnChange={e => dispatch({type: 'order', data: e.target.value})}/>
							</div>
							<div style={{width:'30%', color:'black'}}>
								<Select className='sfilterYear' label='Sort by year:' options={['Newest','Oldest']} reqOnChange={e => dispatch({type: 'year', data: e.target.value})}/>
							</div>
						</div>
						<div style={{height:'20%',width: '100%'}}>
							<div style={{height:'100%', width:'100%'}} className='d-flex flex-row'>
								<div style={{height:'100%',width:'20%'}} className='d-flex justify-content-around align-items-center'>
									<Button className='sfilterCancel' title='Cancel' click={() => window.history.back()}/>
								</div>
								<div style={{height:'100%',width:'80%'}} className='d-flex flex-row-reverse'>
									<div style={{height:'100%', width:'50%'}} className='d-flex justify-content-around align-items-center flex-row-reverse'>
										<Button className='sfilterShow' title='Show Result' click={() => {
											filter.setSFilter( state );
											window.history.back();
										}}/>
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


