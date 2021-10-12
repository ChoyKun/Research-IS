import React, { useState, useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from 'axios';

  
//PDFjs worker from an external cdn
  
export default function Test() {

  const {id} =useParams();

  const [researchData, setResearchData] = useState([]);

  useEffect(()=>{
   axios.get('http://localhost:7000/research/rlist')
   .then((res)=>{
     res.data.forEach( elem => {
       console.log( elem.status );
       if( elem.status === 'public' ){
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
      const [pageNumber, setPageNumber] = useState(2);
  
    function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  return (
    <>
    <div className="d-flex main justify-content-center align-item-center">
      {researchData?.map?.(object =>(
        <div style={{height:'90%', width:'100%',backgroundColor:'gray',fontSize:'100px'}} className="d-flex justify-content-center align-items-center overflow-auto">
          <Document
            file={object.PDFFile}
            onLoadSuccess={onDocumentLoadSuccess}
            >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
       ))}
      
     </div>
    </>
  );
}



// import React,{useState, useEffect} from 'react';
// import { Link, useParams, Redirect} from 'react-router-dom';
// import axios from 'axios';

// import "../styles/object.css"

// export default function AbstractView(props) {
// 	const {id} =useParams();

// 	const [researchData, setResearchData] = useState([]);

// 	useEffect(()=>{
// 		axios.get('http://localhost:7000/research/rlist')
// 		.then((res)=>{
// 			res.data.forEach( elem => {
// 				console.log( elem.status );
// 				if( elem.status === 'public' ){
// 					setResearchData((researchData) => [...researchData, elem]);
// 				}
// 			})
// 		})
// 		.catch((err)=>{
// 			console.log(err)
// 		})
// 	},[]);

// 	return(	
// 		<div style={{height:'100%', width:'100%',backgroundColor:'gray'}} className="d-flex justify-content-center align-items-center overflow-auto">
// 			<div style={{height:'1375px', width:'1063px',backgroundColor:'white',fontSize:'100px'}} className="d-flex justify-content-center align-items-center overflow-hidden">
// 				{researchData?.map?.(object =>(
// 					<div style={{height:'100%', width:'100%'}} key={researchData.indexOf(object)}className="d-flex justify-content-center align-items-center overflow-hidden">
// 						<iframe scrolling="no" src={`${object.PDFFile}`} className="objectStyle"/>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	)
// }

