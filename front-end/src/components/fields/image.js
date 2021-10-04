import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../styles/image.css';

const Image = ( props ) => {
	const [isVisible, setIsVisible] = useState( false );
	const [newImage, setNewImage] = useState( null );

	const handleMouseOver = () => setIsVisible( true );
	const handleMouseLeave = () => setIsVisible( false );

	const handleChangePhoto = async (e) => {
		const image = e.target.files[0];
		const formData = new FormData();

		formData.append('adminImg', image );

		axios.put(`http://localhost:7000/upload-picture/${props.username}`, formData)
		.then( res => {
			setNewImage( () => res.data.path );
		})
		.catch( err => {
			console.log( err );
		});
	}

	const getPhoto = async () => {
		await axios.get(`http://localhost:7000/picture/${props.username}`)
		.then( res => {
			setNewImage( () => res.data.path );			
		})
		.catch( err => {
			console.log( err );
		});
	}

	useEffect(() => getPhoto(), []);

	return(
		<div 
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}
			className="image d-flex justify-content-center align-items-center"
		>
			<img className="image-img loading" width="100%" height="100%" src={ newImage }/>
			{ 
				props?.active 
					? (() => (
						<div className="admin-img-l1 d-flex justify-content-center align-items-center">
							<div className="admin-img-l2 d-flex justify-content-center align-items-center">
								<input onChange={handleChangePhoto} className="admin-img-inp" name="adminImg" type="file" accept="image/*"/>
								<h5 style={{opacity: isVisible ? '1' : '0'}} className="p-2 m-0 bg-dark rounded">Change photo</h5>
							</div>
						</div>
					))() 
					: null
			}
		</div>
	);
}

export default Image;