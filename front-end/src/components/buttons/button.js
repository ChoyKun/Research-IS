import React, {useState, useEffect} from 'react';

export default function Button(props){
	return(
		<button disabled={props.disabled} style={props.style} className={props.className} onClick={props.click || null }>{props.title}</button>
	);
}