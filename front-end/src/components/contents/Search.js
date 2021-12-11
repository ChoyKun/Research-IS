import React,{useState, useEffect} from 'react';
import Button from '../buttons/button';
import Field from '../fields/txtfield';

import { Link } from 'react-router-dom';

import '../../styles/txt.css';

//mui component
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
		<div style={{ width:'100%'}} className="search-bar d-flex flex-row justify-content-start align-item-center">
			<Box sx={{ flexGrow: 1 }}>
		      <AppBar position="static" style={{height:"40px",backgroundColor:'#70AD47'}}>
		        <Toolbar style={{minHeight:"40px"}}>
		          	<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						>
		           	 		<SearchIcon style={{height: '30px',width:'30px'}} onClick={sendRequest}/>
		           	 	</IconButton>
						<Field style={{fontSize:'18px',height:'30px',width:'300px',borderRadius:'10px'}} className={props.className} reqOnChange={linkToButton} placeHolder={props.placeHolder}/>
		          	</Typography>

			        <IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					>
	           	 		<FilterAltIcon style={{height: '30px',width:'30px'}} />
	           	 	</IconButton>

			        <IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					>
	           	 		<FilterAltOffIcon style={{height: '30px',width:'30px'}} />
	           	 	</IconButton>
		        </Toolbar>
		      </AppBar>
		    </Box>
			
		</div>
	);
}