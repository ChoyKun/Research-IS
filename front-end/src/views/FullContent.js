import React,{useState, useEffect} from 'react';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from 'axios';

export default function AbstractView(props) {
	return(
		<div style={{height:'100%', width:'100%',backgroundColor:'gray'}} className="d-flex justify-content-center align-items-center overflow-auto">
			<div style={{height:'1375px', width:'1063px',backgroundColor:'white',fontSize:'100px'}} className="d-flex justify-content-center align-items-center overflow-auto">
				FullContent
			</div>
		</div>
	)
}