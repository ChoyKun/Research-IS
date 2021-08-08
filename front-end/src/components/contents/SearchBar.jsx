import React,{useState, useEffect} from 'react';
import Button from '../buttons/button';
import Field from '../fields/txtfield';
import '../../styles/txt.css';

export default function SearchBar( props ){
	return(
		<div style={{height:'10%', width:'100%'}} className="search-bar d-flex flex-row justify-content-around align-items-center">
			<Button onClick={props.onClick} title="Search"/>
			<Field className='Search'requestOnChange={props.onChange}/>
			<Button onClick={props.onClick} title="Add Filter"/>
		</div>
	);
}