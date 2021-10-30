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
	const {username, studentNo} = useParams();

	const [researchData, setResearchData] = useState([]);
	const [filteredData, setFilteredData] = useState( [] );
	const [search, setSearch] = useState( null );
	const [remove, setRemove] = useState([])
	const [sendRemove, setSendRemove] = useState(false);
	
	useEffect(()=>{
		axios.get(`http://localhost:7000/student/slist/approved-list/${studentNo}`)
		.then((res)=>{
			// console.log( res.data );
			setResearchData( res.data.data );
		})
		.catch((err)=>{
			throw err;
		});
	},[])

	useEffect(()=>{
		setFilteredData(researchData?.map?.(object =>{
			if(search){
					for( let key of Object.keys(object)){
							if(object[key]?.toLowerCase?.()?.startsWith(search?.charAt?.(0)?.toLowerCase?.())){
								return <Item key={object._id} object={object}/>
							}
					}
			}
			else{
				return <Item key={object._id} object={object}/>
			}
		}))
	}, [search, researchData])

	useEffect(()=>{
		if( sendRemove ){
			const newActiveElems = []
			researchData.forEach((elem) => {
				if(elem.status === 'inactive') {
					setRemove((remove) => [...remove, elem])
				}
				else{
					newActiveElems.push( elem );
				}
				
			});
			setResearchData(() => [...newActiveElems])		
		}

	}, [sendRemove])

	useEffect(() => {
		if( remove.length ){
			axios.put(`http://localhost:7000/coordinator/clist/remove-approved/${studentNo}`, remove) 
			.then( res => {
				console.log( res.data.message );
				setSendRemove( false );
			})
			.catch((err)=>{console.log(err)});
		}
	}, [remove])

	const sender = () =>{

		const send = window.confirm("Do you wish to remove permission from this student?");
		if(send == true){
			setSendRemove( true )
		}
		else{
			alert("Operation canceled")
		}
	}

	return(
		<>
			<div style={{height:'20%', width:'100% !important'}}className="d-flex flex-column justify-content-around align-items-center">
				<SearcBar location='/rlist-filter' setSearch={setSearch}/>
				<div style={{height:'20%', width:'90%'}}className="d-flex flex-row justify-content-start flex-row-reverse">
					<Button style={{height: '30px',width:'100px'}} title='Remove' click={sender}/>		
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
	const {username, studentNo} = useParams();

	const [remove, setRemove] = useState([])
	const [sendRemove, setSendRemove] = useState(false);

	useEffect(()=>{
		if( sendRemove ){
			setRemove((remove) => [...remove, props.object._id]);
		}
	}, [sendRemove]);

	useEffect(() => {
		if( remove ){
			axios.put(`http://localhost:7000/coordinator/clist/remove-approved/${studentNo}`, remove) 
			.then( res => {
				console.log( res.data.message );
				setSendRemove( false );
			})
			.catch((err) =>{
				console.log( err.response );
				if(err?.response?.data?.message) alert(`${ err?.response?.data?.message}`) 
			});
		}
	}, [remove])

	const sender = () =>{
		setSendRemove(true);
	}


	return(
		<div className="d-flex bg-secondary flex-row justify-content-around" style={{border:'1px solid black'}}>
			<div className="col-2 text-center">{props.object.title}</div>
			<div className="col-1 text-center">{props.object.course??'N/A'}</div>
			<div className="col-4 text-center">{props.object.researchCategories === '[]' ? 'N/A' : (()=> JSON.parse(props.object.researchCategories).join(', '))()}</div>
			<div className="col-2 text-center">{props.object.yearSubmitted}</div>
			<Button click={sender} title='Remove' />
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
		</div>
	);
}
