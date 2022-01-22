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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';



export default function SearchBar( props ){
	const [fieldContent, setFieldContent] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event)=>{
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () =>{
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	

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
		<div style={{width:'100%'}} className="search-bar d-flex flex-row justify-content-start align-item-center">
			<Box sx={{ flexGrow: 1 }}>
		      <AppBar position="static" style={{height:"40px",backgroundColor:'#70AD47'}}>
		        <Toolbar style={{minHeight:"40px"}}>
		          	<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Tooltip title="Search" arrow>
							<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							>
				       	 		<SearchIcon style={{height: '30px',width:'30px'}} onClick={sendRequest}/>
				       	 	</IconButton>
						</Tooltip>
						<Field style={{fontSize:'18px',height:'30px',width:'300px',borderRadius:'10px'}} className={props.className} reqOnChange={linkToButton} placeHolder={props.placeHolder}/>						
		          	</Typography>

		          	<Tooltip title="Filter" arrow>
				        <IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						>
		           	 		<FilterAltIcon onClick={handleClick} style={{height: '30px',width:'30px'}} />
		           	 		<Popover
		           	 		id={id}
		           	 		open={open}
		           	 		anchorEl={anchorEl}
		           	 		onClose={handleClose}
		           	 		anchorOrigin={{
		           	 			vertical: 'bottom',
		           	 			horizontal:'right',
		           	 		}}
		           	 		transformOrigin={{
		           	 			vertical:'top',
		           	 			horizontal:'right',
		           	 		}}
		           	 		>
				            	{props.list}
		           	 		</Popover>
		           	 	</IconButton>
		          	</Tooltip>


		          	<Tooltip title="Remove Filter" arrow>
			        <IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					>
	           	 		<FilterAltOffIcon onClick={removeFilter} style={{height: '30px',width:'30px'}} />
	           	 	</IconButton>
		          	</Tooltip>
		        </Toolbar>
		      </AppBar>
		    </Box>
			
		</div>
	);
}