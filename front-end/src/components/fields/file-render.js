import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../styles/image.css';

const FileUpload = ( props ) => {
	const [isVisible, setIsVisible] = useState( false );
	const [file, setFile] = useState( null );

	const handleMouseOver = () => setIsVisible( true );
	const handleMouseLeave = () => setIsVisible( false );

	const handleChangePhoto = async ( e ) => {
		const file = e.target.files[ 0 ];
		const formData = new FormData();

		formData.append('fileUpload', file );

		axios.post(`http://localhost:7000/upload-file`, formData)
		.then( res => {
			setFile( () => res.data.path );
			props?.fileCatcher?.( res.data.path );
		})
		.catch( err => {
			console.log( err );
		});
	}

	return(
		<div 
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}
			style={{border: '2px solid rgba(0, 0, 0, 0.5)'}}
			className="image d-flex justify-content-center align-items-center"
		>
			<object className="image-img loading" width="100%" height="100%" data={ file }/>
			{ 
				props?.active
					? (() => (
						<div style={{width: '80%'}} className="admin-img-l1 d-flex justify-content-center align-items-center">
							<div className="admin-img-l2 d-flex justify-content-center align-items-center">
								<input onChange={handleChangePhoto} className="admin-img-inp" name="fileUpload" type="file" accept="application/pdf"/>
								<h5 style={{opacity: isVisible ? '1' : '0'}} className="p-2 m-0 bg-dark rounded">Edit file</h5>
							</div>
						</div>
					))() 
					: null
			}
		</div>
	);
}

export default FileUpload;