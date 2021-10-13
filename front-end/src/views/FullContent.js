import React, { useState,useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from 'axios';


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
		<div className="d-flex main justify-content-center align-item-center flex-row	">
		{researchData?.map?.(object =>(
	        <div style={{height:'90%', width:'100%',backgroundColor:'gray',fontSize:'100px'}} className="d-flex justify-content-center align-items-center overflow-auto flex-column">
				<div className="d-flex flex-row">
					<div style={{fontSize:'20px'}} className="pagec">
					Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
					</div>
					<div className="buttonc">
					<button
					style={{height:'70px',width:'150px',fontSize:'20px'}}
					type="button"
					disabled={pageNumber <= 1}
					onClick={previousPage}
					className="Pre"
						
					>
					Previous
					</button>
					<Document
						file={object.PDFFile}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} />
					</Document>
					<button
					style={{height:'70px',width:'150px',fontSize:'20px'}}
					type="button"
					disabled={pageNumber >= numPages}
					onClick={nextPage}
					>
					Next
					</button>
					</div>
				</div>
			        </div>
	       ))}
		</div>
		</>
	);
}
