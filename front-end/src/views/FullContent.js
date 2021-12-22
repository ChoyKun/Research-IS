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
		<div style={{height:'100%', width:'100%',backgroundColor:'#385723',fontSize:'100px'}} className="d-flex main justify-content-center align-item-center flex-row	">
			{researchData?.map?.(object =>(
		        <div style={{height:'100%', width:'100%',backgroundColor:'white',fontSize:'100px'}} className="d-flex justify-content-center align-items-center overflow-auto flex-column">
					<div className="d-flex flex-column align-items-center justify-content-around" style={{height:'95%',width:'50%',border:'1px solid black',backgroundColor:'#e2f0d9'}}>					
						<div className="d-flex justify-content-center align-items-center" style={{width:'400px',height:'80%'}}>	
							<Document
								className="noselect"
								file={object.PDFFile}
								onLoadSuccess={onDocumentLoadSuccess}

							>
								<Page
									height='600'
									pageNumber={pageNumber}
								/>
							</Document>
						</div>
						<div className="d-flex flex-row justify-content-center align-items-center" style={{width:'400px',height:'10%'}}>	
							<Button
							style={{height:'40px',width:'120px',fontSize:'20px',color:'black'}}
							type="button"
							disabled={pageNumber <= 1}
							click={previousPage}
							title='Previous'
							>

							</Button>
							<div style={{fontSize:'20px'}} className="pagec">
								Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
							</div>
							<Button
							style={{height:'40px',width:'120px',fontSize:'20px',color:'black'}}
							type="button"
							disabled={pageNumber >= numPages}
							click={nextPage}
							title='Next'
							>

							</Button>
						</div>
					</div>
		        </div>
	   		))}
		</div>
		</>
	);
}

{/*
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