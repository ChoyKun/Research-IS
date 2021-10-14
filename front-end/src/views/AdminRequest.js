import React,{useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';


//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function AdminRequest( props ){
	const {username} = useParams();

	const [requests, setRequests] = useState([]);

	useEffect(() => {
		const getRequests = setInterval(() => {
			axios.get('http://localhost:7000/request-views')
			.then( res => {
				if( !requests.length ){
					setRequests([...res.data.reqViews]);
				}
				else{
					res.data.reqViews.forEach( req => {						
						if( !requests.map( r => r.id ).includes( req.id ) ){
							setRequests( requests => [...requests, res]);
						}
					});
				}
			})
			.catch( err => {
				console.log(err);
				clearInterval( getRequests );
			})
		}, 10000);

		return () => clearInterval( getRequests );
	}, []);

	return(
		<>
			<div style={{height:'8%', width:'100%', backgroundColor:'#595959', color:'white'}} className='d-flex justify-content-center align-items-center'>
				<h2>Student's Requests</h2>				
			</div>
			<div style={{height:'10%', width:'100% !important'}}className="d-flex flex-row justify-content-around align-items-center">
				<Link to={`/admin-rlist/${username}`}><Button className='AdminMenu' title='Public Research'/></Link>
				<Link to={`/admin-archive/${username}`}><Button className='AdminMenu' title='Archived'/></Link>
				<Link to={`/admin-upload/${username}`}><Button className='AdminMenu' title='Upload new Research'/></Link>
				<Link to={`/admin-request/${username}`}><Button className='AdminMenu' title='Research Requests'/></Link>					
			</div>
			<div style={{width: '100%', height: '100%'}} className='d-flex flex-column justify-content-center align-items-center'>
				<Header/>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black', overflowY: 'auto'}} className='d-flex flex-column justify-content-start align-items-center'>

					{
						requests?.map?.( req => <Request setRequests={setRequests} key={req.id} {...req}/>)
					}

				</div>
			</div>
		</>
	);
}


const Header = ( props ) => {
	return(
		<div 
			style={{
				width: '90%', 
				height: '35px', 
				border: '1px solid black',
				backgroundColor: 'rgba(255, 255, 25, 0.3)',
				color: 'rgba(0, 0, 0, 0.7)'
			}}

			className="d-flex flex-row justify-content-around align-items-center"
		>
			<div className="col-4 text-center"><p className="p-0 m-0"> STUDENT NO. </p></div>
			<div className="col-4 text-center"><p className="p-0 m-0"> TITLE </p></div>
			<div className="col-4 text-center"><label htmlFor="approveAll">APPROVE ALL </label><input type="checkbox" name="approveAll"/></div>
		</div>
	);
}
 
// stud num, name, title, by unique id
const Request = ( props ) => {

	const {username} = useParams();

	const [approved, setApproved] = useState([])
	const [sendApproved, setSendApproved] = useState(false);


	useEffect(()=>{
		if( sendApproved ){
			setApproved((approved) => [...approved, props._id]);
		}
	}, [sendApproved]);

	useEffect(() => {
		if( approved ){
			axios.put(`http://localhost:7000/student/slist/approved/${props.name}`, approved) 
			.then( res => {
				console.log( res.data.message );
				setSendApproved( false );
			})
			.catch((err)=>{console.log(err)});
		}
	}, [approved])


	const handleChange = async () => {
		axios.put(`http://localhost:7000/change-file-state/${ props.id }`)
		.catch( err => {
			console.log( err );
		});

		setSendApproved( true );
	}

	return(
		<div 
			style={{
				width: '100%', 
				height: '30px', 
				color: 'black',
				backgroundColor: 'rgba(0, 0, 0, 0.4)'
			}} 
			className="d-flex mb-1 flex-row justify-content-around align-items-center"
		>
			<div className="col-4 text-center"><p className="p-0 m-0"> { props.name } </p></div>
			<div className="col-4 text-center"><p className="p-0 m-0"> { props.title } </p></div>
			<div className="col-4 text-center"><input onChange={handleChange} type="checkbox" name="approve"/></div>
		</div>
	);
}

