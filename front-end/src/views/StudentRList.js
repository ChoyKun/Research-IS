import React,{useState, useEffect, Suspense, useContext} from 'react';
import { Link, Redirect,useParams} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import "../styles/button.css";

//icons
import scslogo from "../images/scs-final.png";
import favorites from "../images/heart.png";
import profile from "../images/profile.png";
import FilterContext from '../contexts/filter-context';

// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';
import Checkbox from '../components/fields/checkbox';


export default function StudentRList(props){
	const {username} = useParams();
	const filter = useContext( FilterContext );

	const [researchData, setResearchData] = useState([]);

	const [search, setSearch] = useState( '' );

	useEffect(()=>{
		const getResearchList = async () => {
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
		}
		getResearchList();

		console.log('hereee mother fucker');
	},[]);


	useEffect(() => {
		let result = [];

		const handleSearch = async () => {
			researchData.forEach( item =>{
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
							setFilteredData( filteredData => [...filteredData, <Item key={item._id} object={item}/>] );
						});
					})
				}
				else if( item.title.toLowerCase().startsWith(search?.[0]?.toLowerCase?.() ?? '') && item.title.toLowerCase().includes(search.toLowerCase())){
					result.push( <Item key={item._id} object={item}/> );
				}
			});

			if( !filter.sFilter ) setFilteredData([ ...result ]);
		}

		handleSearch();			

	}, [search, researchData, filter.sFilter]);

	return(
		<>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-column justify-content-around align-items-center">
				<SearcBar location='/rlist-filter' setSearch={setSearch}/>			
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
	const [url, setUrl] = useState(null)
	const [name, setName] = useState(null);
	const [disabled, setDisabled] = useState(false);


	useEffect(()=>{
		const token = Cookies.get('token');

		const checkFile = async () => {
			axios.post(`http://localhost:7000/student/slist/disable/${username}/${props.object._id}`, null, {
				headers: {
					authorization: `Bearer ${token}`
				},
				timeout: 5
			})
			.then((res)=>{
				setDisabled(true)
			})
			.catch((err)=>{
				console.log(err);
			});
		}

		checkFile();
	},[])

	useEffect(() => {
		const token = Cookies.get('token'); 

		axios.get(`http://localhost:7000/student/slist/${username}`,{
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		.then(res=>{
			setName(res.data.data);
		})
		.catch(err=>{
			console.log(err);
		})

		axios.post(`http://localhost:7000/check-research-state/${username}/${props.object._id}`)
		.then((res)=>{
			setUrl(`/research-full`)
		})
		.catch((err)=>{
			setUrl(`/research-abstract`)
		})	
	},[])


	useEffect(()=>{
		if( sendPend ){
			setPending((pending) => [...pending, props.object._id]);
		}
	}, [sendPend]);

	useEffect(() => {
		const token = Cookies.get('token')

		if( pending ){
			axios.put(`http://localhost:7000/student/slist/pending/${username}`, pending,{
			headers: {
				authorization: `Bearer ${token}`
			}
		}) 
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

	const requestForView = async () => {

		const today = new Date();

		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		console.log(date);

		const data = {
			id: props.object._id,
			studentID: username,
			studentName: name,
			title: props.object.title,
			state: 'pending',
			dateRequested: date
		};

		alert(`Pending to accept viewing of "${data.title}" research by admin.\nIf approved then view button will turn into green`);

		axios.post('http://localhost:7000/request-view', {data})
		.catch( err => {
			console.log( err );
		});

		setSendPend(true);
	}


	useEffect(() => {
		const token = Cookies.get('token');

		axios.post(`http://localhost:7000/check-research-state/${username}/${props.object._id}`,{
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		.then((res)=>{
			setUrl(`/research-full`)
		})
		.catch((err)=>{
			setUrl(`/research-abstract`)
		})
	}, [])


	
	return(
		<div className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<Link to={`${url}/${props.object._id}`}><Button title='View' /></Link>
			<Button click={requestForView} disabled={disabled} className={`col-1 text-center`} title='Request'/>
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