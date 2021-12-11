import React,{useState, useEffect} from 'react';
import Button from '../buttons/button';
import Field from '../fields/txtfield';

import { Link } from 'react-router-dom';

import '../../styles/txt.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Drawer from '@mui/material/Drawer';

export default function SearchBar( props ){
	const [fieldContent, setFieldContent] = useState(null);

	const sendRequest = (e) => {
		props.setSearch(fieldContent);
	}

	const linkToButton = (e) => {
		setFieldContent( e.target.value );
	}

	const removeFilter = async () =>{	
        window.location.reload();
	}

	return(
		<div style={{height:'10%', width:'100%'}} className="search-bar d-flex flex-row justify-content-around align-items-center">
			<Box sx={{ flexGrow: 1 }}>
		      <AppBar position="static" style={{backgroundColor:'#548235'}}>
		        <Toolbar>
		          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
		           	 	<Button style={{height: '40px',width:'40px'}} click={sendRequest} title="Search"/>
						<Field style={{height:'40px',width:'700px'}} className={props.className} reqOnChange={linkToButton} placeHolder={props.placeHolder}/>
		          </Typography>
		        </Toolbar>
		      </AppBar>
		    </Box>
			
		</div>
	);
}