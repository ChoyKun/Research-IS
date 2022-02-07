import React, { useState,useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from '../modules/config.js';

import "../styles/txt.css"
import Button from '../components/buttons/button'


export default function Test() {

	const {id} =useParams();

  	const [researchData, setResearchData] = useState([]);


	useEffect(()=>{
	  axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/research/rlist`)
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
	
	pdfjs.GlobalWorkerOptions.workerSrc =
	`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	/*To Prevent right click on screen*/
	document.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
		
	/*When document gets loaded successfully*/
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber(prevPageNumber => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	return (
		<>
		<div style={{height:'100%', width:'100%',backgroundColor:'#385723',fontSize:'100px'}} className="d-flex main justify-content-start align-item-start flex-row	">
			{researchData?.map?.(object =>(
		        <div style={{height:'100%', width:'100%',backgroundColor:'white',fontSize:'100px'}} className="d-flex justify-content-start align-items-start overflow-auto flex-column">
					<div className="d-flex justify-content-center align-items-start" style={{width:'100%',height:'80%'}}>	
						<Document
							className="noselect d-flex justify-content-start flex-column"
							file={object.PDFFile}
							onLoadSuccess={({ numPages })=>setNumPages(numPages)}

						>
							{Array.apply(null, Array(numPages))
						    .map((x, i)=>i+1)
						    .map(page => <Page className="d-flex justify-content-start flex-column" height='400' pageNumber={page}/>)}
						</Document>
					</div>
		        </div>
	   		))}
		</div>
		</>
	);
}

{/*
	height='600'
						<button
						style={{height:'70px',width:'150px',fontSize:'20px'}}
						type="button"
						disabled={pageNumber >= numPages}
						onClick={nextPage}
						>
						Next
						</button>	

<button
						style={{height:'70px',width:'150px',fontSize:'20px'}}
						type="button"
						disabled={pageNumber <= 1}
						onClick={previousPage}
						className="Pre"
							
						>
						Previous
						</button>

<div style={{fontSize:'20px'}} className="pagec">
						Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
					</div>

*/}