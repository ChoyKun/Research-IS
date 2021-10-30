import React, {useState, useEffect} from 'react';
import "../../styles/button.css"

export default function Button(props){
	return(
		<button disabled={props.disabled} style={props.style} className={props.className || "button"} onClick={props.click || null }>{props.title}</button>
	);
}