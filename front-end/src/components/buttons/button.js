import React, {useState, useEffect} from 'react';

export default function Button(props){
	return(
		<button className={props.className} onClick={props.click || null }>{props.title}</button>
	);
}