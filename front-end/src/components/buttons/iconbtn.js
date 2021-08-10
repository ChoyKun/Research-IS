import React from 'react';

export default function IconBtn(props){
	return(
		<img style={props.style} className={props.className}src={props.icon} onClick={props.onClick}/>
	);
}