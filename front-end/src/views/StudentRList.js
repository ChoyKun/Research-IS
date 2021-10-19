import React,{useState, useEffect, Suspense} from 'react';
import { Link, Redirect,useParams} from 'react-router-dom';
import axios from '../modules/config.js';

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
		setFilteredData(researchData?.map?.( object => {
			if( search ){
				for( let key of Object.keys( object ) ){
					// console.log(object)									
					if(object[key]?.toLowerCase?.()?.startsWith( search?.charAt?.(0)?.toLowerCase?.() )){

						return <Item key={object._id} object={object}/>

					}
				}
			}
			else{

				return <Item key={object._id} object={object} />

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
				setSendFavs( false );
			})
			.catch((err)=>{console.log(err)});
		}
	}, [favorites])

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
	const { username, id } = useParams();

	const [pending, setPending] = useState([])
	const [sendPend, setSendPend] = useState(false);

	useEffect(()=>{
		if( sendPend ){
			setPending((pending) => [...pending, props.object._id]);
		}
	}, [sendPend]);

	// wait may mali pala ako

	useEffect(() => {
		if( pending ){
			axios.put(`http://localhost:7000/student/slist/pending/${username}`, pending) 
			.then( res => {
				console.log( res.data.message );
				setSendPend( false );
			})
			.catch((err) =>{
				console.log( err.response );
				if(err?.response?.data?.message) alert(`${ err?.response?.data?.message}`) 
			});
		}
	}, [pending])


	const handleOnChange = (e) => {
		props.object.favorites = e.target.checked ? 'true' : 'false';
		console.log(props.object.favorites)
	}
	
	const [itemState, setItemState] = useState('idle');

	const requestForView = async () => {
		setItemState(() => 'pending');

		const data = {
			id: props.object._id,
			name: username,
			title: props.object.title,
			state: 'pending'
		};

		alert(`Pending to accept viewing of "${data.title}" research by admin.\nIf approved then view button will turn into green`);

		axios.post('http://localhost:7000/request-view', {data})
		.catch( err => {
			console.log( err );
		});

		setSendPend(true);
	}

	const viewer = () =>{
		axios.post(`http://localhost:7000/check-research-state/${username}/${props.object._id}`)
		.then((res)=>{
			window.open(`/research-full/${props.object._id}`)
		})
		.catch((err)=>{
			window.open(`/research-abstract/${props.object._id}`)
		})
	}

	useEffect(() => {
		const checkFile = async () => {
			axios.get(`http://localhost:7000/check-file/${props.object._id}`)
			.then( res => {
				if( res.data.itemState === 'approved' ){
					setItemState(() => res.data.itemState);
					
					axios.delete(`http://localhost:7000/delete-file-req/${props.object._id}`)
					.catch( err => {
						console.log( err );
					});
				}
				else{
					setTimeout(() => checkFile(), 10000);
				}
			})
			.catch( err => {
				console.log( err );
			});
		}

		if( itemState === 'idle' ) checkFile();
	}, [itemState]);

	

	return(
		<div className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange}/></div>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<Button click={viewer} style={{backgroundColor:'#385723', color:'white'}} title='View' />
			<Button click={requestForView} className={`col-1 ${itemState === 'approved' ? 'bg-success' : 'bg-danger'} text-center`} style={{backgroundColor:'#385723', color:'white'}} title='Request'/>
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
