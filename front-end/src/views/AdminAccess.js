import React,{useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';



//style
import '../styles/button.css'
// components
import Button from '../components/buttons/button';
import Field from '../components/fields/txtfield';
import SearcBar from '../components/contents/SearchBar';


export default function AdminAccess( props ){
	const {username} = useParams();

	return(
		<>
			<div style={{width: '100%', height: '100%'}} className='d-flex justify-content-center align-items-center'>
				<div style={{height:'90%', width:'90%', backgroundColor:'white', border:'1px solid black'}} className='d-flex justify-content-center align-items-center'>
					<div style={{height:'95%', width:'95%', background:'linear-gradient( to bottom, #a1c7f6, #ffffff)', border:'1px solid black',color:'black'}} className='d-flex justify-content-center align-items-center'>
						<div style={{height:'100%',width:'100%'}} className='d-flex flex-column'>
							<div style={{height:'70%',width:'100%'}} className="p-3 d-flex justify-content-around align-items-center flex-column">
								<h1 style={{fontSize:'35px'}}>Uh oh...</h1>
								<p style={{fontSize:'25px'}}>Looks like the page you’re trying to access is available from Research Coordinator view only. Meanwhile, let us take you back to safety. </p>
							</div>
							<div style={{height:'30%',width:'95%'}} className="d-flex flex-row-reverse justify-content-around">
								<Link to={`/admin-log-in/${username}`}><Button className='crAccept' title='Login As Admin'/></Link>
								<Button className='crDecline' title='Go Back' click={()=> window.history.back()}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


