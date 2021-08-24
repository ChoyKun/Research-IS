import React,{useState, useEffect, Suspense} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import lock from "../images/lock.png"


//styles
import '../styles/button.css';
import '../styles/txt.css';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';


export default function AdminRList(props){

	const [researchData, setResearchData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState('');

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
	},[])

	useEffect(()=>{
		setFilteredData(researchData?.map?.(object =>{
			if(search){
					for( let key of Object.keys(object)){
							if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
								return <Item key={object._id} {...object}/>
							}
					}
			}
			else{
				return <Item key={object._id} {...object}/>
			}
		}))
	}, [search, researchData])
	
	//useEffect(() => {
	//	if( researchData ){
	//		const data = researchData?.map?.( object => {
	//						if(search){
	//							for( let key of Object.keys(object)){
	//									if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
	//										return <Item key={object.id} {...object}/>
	//									}
	//							}
	//						}
	//						else{
	//							console.log('else')	
	//							return <Item key={object.id}{...object}/>
	//						}
	//					});
	//		console.log(data)
	//		setFilteredData( data );
	//	}
	//}, [researchData])

	return(
		<>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to="/admin-slist"><Button className='AdminMenu' title='List of Students'/></Link>
				<Link to='/admin-rlist'><Button className='AdminMenu' title='List of Research'/></Link>
				<Link to='/admin-flist'><Button className='AdminMenu' title='List of Faculties'/></Link>
				<Link to="/admin-upload"><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to="/admin-reg"><Button className='AdminMenu' title='Register new Adviser'/></Link>
				<Link to="/admin-archive"><Button className='AdminMenu' title='Archived'/></Link>				
			</div>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='rlist-filter' setSearch={setSearch} className='Search'/>
				<div style={{height:'20%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} title='Archive'/>		
				</div>	
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black',overflowY:'auto',overflowX:'auto'}}>
					<Suspense fallback={<Loading/>}>
						<RListHeader/>
						{ console.log( filteredData ) }
						{ filteredData }
					</Suspense>
				</div>
			</div>
		</>
	);
}




function Item(props){
	return(
		<div onClick={() => console.log('clicked')} className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-1 text-center"><Checkbox/></div>
			<div className="col-2 text-center">{props.title}</div>
			<div className="col-1 text-center">{props.course??'N/A'}</div>
			<div className="col-4 text-center">{props.researchCategories === '[]' ? 'N/A' : ()=> JSON.parse(props.researchCategories).join(', ')}</div>
			<div className="col-2 text-center">{props.yearSubmitted}</div>
			<Button className='col-1 text-center' style={{backgroundColor:'#385723', color:'white'}} title='View'/>
			<Button className='col-1 text-center' style={{backgroundColor:'#385723', color:'white'}} title='Edit'/>
		</div>
	);
}
function Loading(props){
	return(
		<div>
			loading
		</div>
	);
}

function RListHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#4472c4'}} className='d-flex flex-row justify-content-around'>
			<div className='col-1 text-center'>
				<Checkbox/>
			</div>
			<div className='col-2 text-center'>
				Title
			</div>
			<div className='col-1 text-center'>
				Course
			</div>
			<div className='col-4 text-center'>
				ResearchCategories
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-1 text-center'>
				
			</div>
			<div className='col-1 text-center'>
				
			</div>
		</div>
	);
}