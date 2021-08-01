import React,{useState, useEffect} from 'react';
import scslogo from "../images/scs-final.png";
import '../styles/login.css';
import Field from '../components/fields/txtfield';
import Button from '../components/buttons/button'
import Select from '../components/fields/select';


export default function Login(props){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function requestUsernameChange( e ){
		setUsername( e.target.value );
	}

	function requestPasswordChange( e ){
		setUsername( e.target.value );
	}

	return(
		<div className='Login d-flex justify-content-center align-items-center'>
			<div className='login-bg' >
				<div className='login-logo d-flex flex-column align-items-center justify-content-center' >
					<img src={scslogo}/>
					<h1>SCS Research Portal</h1>
				</div>
				<div className='login-inputs d-flex flex-column align-items-center justify-content-center'>
					<div className="login-header d-flex justify-content-center align-items-center">
						<h5>Sign in to start session</h5>
					</div>
					<div className="login-field d-flex flex-column align-items-center justify-content-between">
						<Field placeHolder="username" requestOnChange={requestUsernameChange}/>
						<Field placeHolder="password" requestOnChange={requestPasswordChange}/>
						<div style={{width:"80%"}}>
							<Select className="login-select" label='Select Position:'options={['Student','Adviser']}/>
						</div>
						<Button className="login-button" title="Sign me in" />
					</div>
				</div>
			</div>
		</div>
	);
}


