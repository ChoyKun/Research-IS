import React,{useState, useEffect} from 'react';
import Button from '../buttons/button';
import Field from '../fields/txtfield';

import { Link } from 'react-router-dom';

import '../../styles/txt.css';

export default function SearchBar( props ){
	const [fieldContent, setFieldContent] = useState(null);

	const sendRequest = (e) => {
		props.setSearch(fieldContent);
	}

	const linkToButton = (e) => {
		setFieldContent( e.target.value );
	}

	return(
		<div style={{height:'10%', width:'100%'}} className="search-bar d-flex flex-row justify-content-around align-items-center">
			<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} click={sendRequest} title="Search"/>
			<Field style={{width:'700px'}} className={props.className} reqOnChange={linkToButton} placeHolder={props.placeHolder}/>
			<Link to={props.location}>
				Add filter
			</Link>
		</div>
	);
}