import React,{useState, useEffect} from 'react';
import Button from '../buttons/button';
import Field from '../fields/txtfield';

import { Link } from 'react-router-dom';

import '../../styles/txt.css';

export default function SearchBar( props ){
	console.log( props.location );
	return(
		<div style={{height:'10%', width:'100%'}} className="search-bar d-flex flex-row justify-content-around align-items-center">
			<Button onClick={props.onClick} title="Search"/>
			<Field className={props.className} requestOnChange={props.onChange}/>
			<Link to={props.location}>
				Add filter
			</Link>
		</div>
	);
}