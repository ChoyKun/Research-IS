import React,{useState, useEffect} from "react";
import '../../styles/txt.css';


export default function Field(props){
	return(
		<input className={props.className} placeHolder={props.placeHolder || null} onChange={props.requestOnChange}/>
	);
}