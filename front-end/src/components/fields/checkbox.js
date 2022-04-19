import React,{useState, useEffect} from 'react';

export default function Checkbox(props){
	return(
		<div>
			<input 
				style={props.style} 
				type='checkbox' 
				checked={props?.checked}
				onChecked={props.onCheck} 
				onClick={props.onClick} 
				id={props.id} 
				name={props.name} 
				onChange={props.reqOnChange} 
				value={props.value??''}
			/>
			<label>{props.cLabel}</label>
		</div>
	);
}