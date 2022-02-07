import React, { useState, useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from '../modules/config.js';

import "../styles/txt.css"
  
//PDFjs worker from an external cdn
  
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
    const [pageNumber, setPageNumber] = useState(5);
  
    function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(3);
  }
  return (
    <>
    <div style={{height:'100%', width:'100%',backgroundColor:'#385723',fontSize:'100px'}} className="d-flex main justify-content-center align-item-center">
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
                    height='700'
                    pageNumber={pageNumber}
                  />
                </Document>
              </div>
          </div>
        </div>
       ))}
      
     </div>
    </>
  );
}
