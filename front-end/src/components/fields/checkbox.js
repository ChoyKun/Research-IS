import React,{useState, useEffect} from 'react';

export default function Checkbox(props){
	return(
		<div>
			<input type='checkbox'/>
			<label>{props.cLabel}</label>
		</div>
	);
}