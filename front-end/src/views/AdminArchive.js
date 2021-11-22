import React,{useState, useEffect, Suspense,useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../modules/config.js';
import FilterContext from '../contexts/filter-context';



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
	const {username} = useParams();
	const filter = useContext( FilterContext );

	const [archiveData, setArchiveData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState('');
	const [sendPublic, setSendPublic] = useState(false);
	const [pubAccum, setPubAccum]= useState([])

	useEffect(()=>{
		axios.get('http://localhost:7000/research/rlist')
		.then((res)=>{
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.status === 'archive' ){
					setArchiveData((archiveData) => [...archiveData, elem]);
				}
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	},[])

	useEffect(() => {
		let result = [];

		const handleSearch = async () => {
			
			if( filter.sFilter ){
				const { 
					course,
					category,
					yearSubmitted,
					order,
					year
				} = filter.sFilter;

				// ?course=${course}&category=${category}&yearSubmitted=${yearSubmitted}&order=${order}&year=${year}
				axios.get(`http://localhost:7000/filter-query/${course}/${category}/${yearSubmitted}/${order}/${year}`)
				.then( res => {
					res.data.result.forEach( item => {
						result.push(<Item key={item._id} object={item}/>);
					});

					setFilteredData([...result]);
				})
			}
			else if(!filter.sFilter){
				archiveData.forEach( item =>{
					if( item.title.toLowerCase().startsWith(search?.[0]?.toLowerCase?.() ?? '') && item.title.toLowerCase().includes(search.toLowerCase())){
						result.push( <Item key={item._id} object={item}/> );
					}
				});

				setFilteredData([...result]);
			}



		}

		handleSearch();			

	}, [search, archiveData, filter.sFilter]);
	
	useEffect(()=>{
		if( sendPublic ){
			const newArchiveElems = []
			archiveData.forEach((elem) => {
				if(elem.status === 'public') {
					console.log('here')
					setPubAccum((pubAccum) => [...pubAccum, elem])
				}
				else{
					newArchiveElems.push( elem );
				}
				
			});
			setArchiveData(() => [...newArchiveElems])		
			console.log( pubAccum );	
		}

	}, [sendPublic])


	useEffect(() => {
		if( pubAccum.length ){
			axios.put('http://localhost:7000/research/rlist/update', pubAccum)
			.then( res => {
				alert( res.data.message );
				setSendPublic( false );
			})
			.catch((err)=>{
				console.log(err)
			});
		}
	}, [pubAccum])

	const sender = () =>{
		const send = window.confirm("Do you want to update the list?");
		if(send == true){
			setSendPublic(true);
		}
		else{
			alert("Operation canceled")
		}
	}

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Archived Researches</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/admin-rlist/${username}`}><Button style={{height:'50px',width:'200px'}} title='Public Research'/></Link>
				<Link to={`/admin-archive/${username}`}><Button style={{height:'50px',width:'200px'}} title='Archived'/></Link>
				<Link to={`/admin-upload/${username}`}><Button style={{height:'50px',width:'200px'}} title='Upload new Research'/></Link>
				<Link to={`/admin-request/${username}`}><Button style={{height:'50px',width:'200px'}}	 title='Research Requests'/></Link>			
			</div>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='rlist-filter' setSearch={setSearch} className='Search'/>
				<div style={{height:'20%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Button style={{height: '30px',width:'100px'}} click={sender} title='Publish'/>		
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

	const handleOnChange = (e) => {
		props.object.status = e.target.checked ? 'public' : 'archive';
	}

	return(
		<div onClick={() => console.log('clicked')} className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-1 text-center"><Checkbox reqOnChange={handleOnChange}/></div>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<Link to={`/research-full/${props.object._id}`}><Button className='col-1 text-center' style={{width:'90px',backgroundColor:'#385723', color:'white'}} title='View'/></Link>
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