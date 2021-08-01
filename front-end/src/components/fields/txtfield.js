import React,{useState, useEffect} from "react";
import '../../styles/txt.css';


export default function Field(props){
	return(
		<input className='txt' placeHolder={props.placeHolder} onChange={props.requestOnChange}/>
	);
}