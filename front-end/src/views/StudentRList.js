import React,{useState, useEffect, Suspense} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';

export default function RListFilter(props){
	const [researchData, setResearchData] = useState(null);
	const [filteredData, setFilteredData] = useState( null );
	const [search, setSearch] = useState( null );

	useEffect(()=>{
		axios.get('http://localhost:7000/research/rlist')
		.then((res)=>{
			setResearchData(res.data);
		})
		.catch((err)=>{
			console.log(err)
		})
	},[]);

	useEffect(() => {
		setFilteredData(researchData?.map?.( object => {
											if( search ){
												for( let key of Object.keys( object ) ){
													console.log(object[key], search)
													if(object[key]?.toLowerCase?.() === search?.toLowerCase?.()){
														return <Item key={Object.keys( object ).indexOf(key)} {...object}/>
													}
												}
											}
											else{
												return <Item key={researchData.indexOf( object )} {...object}/>
											}
										}
									))
		console.log( filteredData );
	}, [search, researchData])

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-center align-items-center">
				<SearcBar location='/rlist-filter' setSearch={setSearch}/>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black', color:'black'}}>
					<Suspense fallback={<Loading/>}>
						{ filteredData }
						{ console.log(filteredData) }

					</Suspense>
				</div>
			</div>
		</>
	);
}

function Loading(props){
	return(
		<div>
			loading
		</div>
	);
}



function Item(props){
	return (
		<div style={{fontSize:'20px'}} onClick={() => console.log('clicked')} className="d-flex flex-row justify-content-around">
			<div className="col-1 text-center">{props.title}</div>
			<div className="col-1 text-center">{props.course??'N/A'}</div>
			<div className="col-5 text-center">{props.researchCategories === '[]' ? 'N/A' : JSON.parse(props.researchCategories).join(', ')}</div>
			<div className="col-1 text-center">{props.yearSubmitted}</div>
			<Button className="col-1 text-center" style={{backgroundColor:'#385723', color:'white'}} title='View'/>
		</div>
	);
}


