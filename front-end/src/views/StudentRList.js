import React,{useState, useEffect, Suspense} from 'react';
import { Link, Redirect,useParams} from 'react-router-dom';
import axios from 'axios'

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';

export default function RListFilter(props){
	const {username} = useParams();

	const [researchData, setResearchData] = useState([]);
	const [filteredData, setFilteredData] = useState( [] );
	const [search, setSearch] = useState( null );
	const [favorites, setFavorites] = useState([])
	const [sendFavs, setSendFavs] = useState(false);
	

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

	useEffect(() => {
		props?.Event?.on?.('approve');
	}, []);

	const emitRequest()

	useEffect(() => {
		setFilteredData(researchData?.map?.( object => {
			if( search ){
				for( let key of Object.keys( object ) ){
					// console.log(object)									
					if(object[key]?.toLowerCase?.()?.startsWith( search?.charAt?.(0)?.toLowerCase?.() )){
						return <Item key={object.id} object={object} onClick={() => Event.emit('requestResearch', {
							studentNo: username,
							research: object
						})}/>

					}
				}
			}
			else{
				return <Item key={object.id} object={object}  onClick={() => Event.emit('requestResearch', {
					studentNo: username,
					research: object
				})}/>
			}
		}
	))
		// console.log( filteredData )
	}, [search, researchData])

	useEffect(()=>{
		if( sendFavs ){
			researchData.forEach((elem) => {
				if(elem.favorites === 'true') {
					console.log('here')
					setFavorites((favorites) => [...favorites, elem._id]);
					console.log(favorites)
				}	
			});		
			console.log( favorites );	
		}

	}, [sendFavs]);

	useEffect(() => {
		if( favorites ){
			axios.put(`http://localhost:7000/student/slist/favorites/${username}`, favorites) 
			.then( res => {
				console.log( res.data.message );
				setSendFavs( false );
			})
			.catch((err)=>{console.log(err)});
		}
	}, [favorites])
	console.log(favorites);

	return(
		<>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-column justify-content-around align-items-center">
				<SearcBar location='/rlist-filter' setSearch={setSearch}/>
				<div style={{height:'10%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Button style={{height: '30px',width:'100px',backgroundColor:'#385723',color: 'white'}} click={() => setSendFavs(true)} title='Add to Favorites'/>		
				</div>				
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black', color:'black',overflowY:'auto',overflowX:'auto'}}>
					<Suspense fallback={<Loading/>}>
						<RListHeader/>
						{ filteredData }
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
	const handleOnChange = (e) => {
		props.object.favorites = e.target.checked ? 'true' : 'false';
		console.log(props.object.favorites)
	}
	

	return(
		<div onClick={() => console.log('clicked')} className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange}/></div>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<Button click={props?.onClick} className='col-1 text-center' style={{backgroundColor:'#385723', color:'white'}} title='View'/>
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
