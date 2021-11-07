import React,{useState, useEffect, Suspense} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from '../modules/config.js';


//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function AdminRequest( props ){
	const {username} = useParams();

	const [approved, setApproved] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/approved-list/${username}`)
		.then((res)=>{
			setApproved( res.data.data );
		})
		.catch((err)=>{
			throw err;
		});
	},[])
	
	console.log(approved);

	useEffect(()=>{
		setFilteredData(approved?.map?.(object =>{
			if(search){
				// for( let key of Object.keys(object)){
				// 	if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
				// 		return <Item key={object._id} object={object}/>
				// 	}
				// }
				let result = [];
				if( object.title.toLowerCase().includes( search.toLowerCase() ) ){
					return <Item key={object._id} object={object}/>
				}
			}
			else{
				return <Item key={object._id} object={object}/>
			}
		}))
	}, [search, approved])

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Approved Requests</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/student-approved/${username}`}><Button style={{height:'50px',width:'200px'}} title='Approved Researches'/></Link>
				<Link to={`/student-pending/${username}`}><Button style={{height:'50px',width:'200px'}} title='Pending Requests'/></Link>				
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

function Item(props){

	return(
		<div className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<div className="col-2 text-center">{props.object.dateApproved}</div>
			<Link to={`/research-full/${props.object._id}`}><Button className='col-1 text-center' style={{height:'30px',width:'70px',backgroundColor:'#385723', color:'white'}} title='View' /></Link>
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
			<div className='col-2 text-center'>
				Title
			</div>
			<div className='col-1 text-center'>
				Course
			</div>
			<div className='col-3 text-center'>
				ResearchCategories
			</div>
			<div className='col-2 text-center'>
				Year Submitted
			</div>
			<div className='col-2 text-center'>
				Date Approved
			</div>
			<div className='col-1 text-center'>

			</div>
		</div>
	);
}
