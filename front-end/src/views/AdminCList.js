import React,{useState, useRef, useEffect, Suspense, useReducer} from 'react';
import { Link, useParams, Redirect} from 'react-router-dom';
import axios from '../modules/config.js';


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


export default function AdminCList(props){
	const {username} = useParams();

	const [adminData, setAdminData] = useState( [] );
	const [filteredData, setFilteredData] = useState(null);
	const [search, setSearch]=useState(null);
	const [redirect, setRedirect] = useState( null );

	
	const reducer = (state, action)=>{
		if(!state.item){
			setColorToSelected( action.item );
		} 
		else{
			setColorToSelected( state.item, true );
			setColorToSelected( action.item );
		}
		console.log(action.data);
		return {item: action.item, data: action.data};		
	}

	const [selected, selectedDispatch] = useReducer(reducer, {item: null, data: null});

	useEffect(() => {
		axios.get('http://localhost:7000/auth-admin/data')
		.then( res => {
			res.data.forEach( elem => {
				console.log( elem.status );
				if( elem.status === 'inactive' ){
					setAdminData((adminData) => [...adminData, elem]);
				}
			})
		})
		.catch( err => {
			console.log( err );
		})
	}, [])

	useEffect(()=>{
		setFilteredData(adminData?.map?.(object =>{
			if(search){
				for(let key of Object.keys(object)){
					if(object[key]?.toLowerCase?.()?.startsWith?.(search?.charAt?.(0).toLowerCase?.())){
						return<Item key={object._id}{...object} dispatch={selectedDispatch}/>
					}
				}
			}
			else{
				return <Item key={object._id}{...object} dispatch={selectedDispatch}/>
			}
		}))
	},[search, adminData])

	const handler = async (state, action)=>{
		const send = window.confirm("Changing the coordinator will deactivate your account, do you want to continue?");
		if(send == true){
			console.log({username})
			axios.put(`http://localhost:7000/coordinator/clist/new-admin`) // set current admin to inactive to no?
			.then( async () => {
				axios.put(`http://localhost:7000/coordinator/clist/changecoor/${selected?.data?.username}`) // set selected admin to active?
				.then((res)=>{
					alert(res.data.message);
					setRedirect( <Redirect to='/sign-in'/> );
				})
				.catch((err)=>{
					console.log(err);
				});
			})
			.catch((err)=>{
				console.log(err);
			});
		}
		else{
			alert("Operation canceled")
		}

		
	}

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Inactive Coordinator List</h2>				
			</div>
			<div style={{height:'15%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center flex-column">
				<SearcBar location='/slist-filter'/>
				<div style={{height:'20%', width:'40%'}}className="d-flex flex-row justify-content-between flex-row-reverse">
					<Button style={{height: '30px',width:'200px'}} title='Change Coordinator' click={handler}/>
					<Button style={{height: '30px',width:'200px'}} title='Cancel' click={()=>window.history.back()}/>
				</div>		
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black',color:'black',overflowY:'auto',overflowX:'auto'}}>
					<Suspense fallback={<Loading/>}>
						<SlistHeader/>
						{ filteredData }
						{redirect}
					</Suspense>

				</div>
			</div>
		</>
	);
}

function Item(props){ //getData
	// 
	const item = useRef();
	
	const handleClick = () => {
		if( !item.current ) return;

		props.dispatch({ item: item.current, data: props });


	}

	return(
		<div onClick={handleClick} ref={item} style={{border:'1px solid black'}} className={'d-flex bg-secondary flex-row justify-content-around'}>
			<div className="col-1 text-center">{props.username}</div>
			<div className="col-1 text-center">{props.password}</div>
			<div className="col-1 text-center">{props.firstName}</div>
			<div className="col-1 text-center">{props.middleInitial}</div>
			<div className="col-1 text-center">{props.lastName}</div>
			<div className="col-1 text-center">{props.extentionName ?? "N/A"}</div>
			<div className="col-1 text-center">{(() => {
											const date = new Date(props.birthdate);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
			</div>
			<div className="col-2 text-center">{(() => {
											const date = new Date(props.dateRegistered);
											return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
									})()}
			</div>
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


function SlistHeader(props){
	return(
		<div style={{height:'30px',width:'100%',border:'1px solid black', backgroundColor:'#4472c4'}} className='d-flex flex-row justify-content-around'> 
			<div className='col-1 text-center'>
				Username
			</div>
			<div className='col-1 text-center'>
				Password
			</div>
			<div className='col-1 text-center'>
				First Name
			</div>
			<div className='col-1 text-center'>
				Middile Initial
			</div>
			<div className='col-1 text-center'>
				Last Name
			</div>
			<div className='col-1 text-center'>
				E. Name
			</div>
			<div className='col-1 text-center'>
				Birth Date
			</div>
			<div className='col-2 text-center'>
				Date Registered
			</div>
		</div>
	);
}



const setColorToSelected = (item, reverse = false) => {
	console.log( item );
	if( !item ) return ;

	const list = item.classList;

	if( !reverse ){
		console.log( item.classList );
		list.replace('bg-secondary', 'bg-success');
	}
	else{
		list.replace('bg-success', 'bg-secondary');
	}
	

}