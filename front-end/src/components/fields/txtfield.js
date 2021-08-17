import React,{useState, useEffect} from "react";
import '../../styles/txt.css';


export default function Field(props){
	return(
		<input accept={props?.accepts ?? ""} type={props.type ?? 'text'} style={props.style} className={props.className} placeholder={props.placeHolder || null} onChange={props.reqOnChange}/>
	);
}