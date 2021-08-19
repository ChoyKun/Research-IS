import React,{useState, useEffect} from 'react';

export default function Checkbox(props){
	return(
		<div>
			<input type='checkbox' onChange={props.reqOnChange} value={props.value??null}/>
			<label>{props.cLabel}</label>
		</div>
	);
}