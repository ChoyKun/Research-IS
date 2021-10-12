import React,{useState, useEffect} from 'react';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from 'axios';

import "../styles/object.css"

export default function AbstractView(props) {
	const {id} =useParams();

	const [researchData, setResearchData] = useState([]);

	useEffect(()=>{
		axios.get('http://localhost:7000/research/rlist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem._id === id ){
					setResearchData((researchData) => [...researchData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[]);

	return(	
		<div style={{height:'100%', width:'100%',backgroundColor:'gray'}} className="d-flex justify-content-center align-items-center overflow-auto">
			<div style={{height:'1375px', width:'1063px',backgroundColor:'white',fontSize:'100px'}} className="d-flex justify-content-center align-items-center overflow-hidden">
				{researchData?.map?.(object =>(
					<div style={{height:'100%', width:'100%'}} key={researchData.indexOf(object)}className="d-flex justify-content-center align-items-center overflow-hidden">
						<iframe scrolling="no" src={`${object.PDFFile}`} className="objectStyle"/>
					</div>
				))}
			</div>
		</div>
	)
}

