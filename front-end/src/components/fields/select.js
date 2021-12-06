import React,{useState, useEffect} from "react";

export default function Select(props){
	const selectedValue = props.selected;
	const options = props.options.map((val) => {
		if(val === selectedValue){
			return <option selected key={props.options.indexOf(val)} value={val}>{val}</option>
		}
		else{
			return <option key={props.options.indexOf(val)} value={val}>{val}</option>
		}
	});

	return(
		<div className={`${props.className} d-flex flex-row`}>
			<label>{props.label}</label>
			<div style={{width:`${props.width}`,backgroundColor:'#E2F0D9',borderRadius:'20px',border:'2px solid #385723'}}>
				<select style={{border:'none',borderRadius:'20px', outline:'none'}} onChange={props.reqOnChange}>
					{options}
				</select>
			</div>
			
		</div>
	);
}

