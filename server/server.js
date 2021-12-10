require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const cors = require('cors');
const mongoose = require('mongoose');
const CircularJSON = require('circular-json');

const port = process.env.PORT || 7000;

const dbUri = 'mongodb://localhost/Research-ISdb'


// Model
const Student = require('./model/student');
const Research = require('./model/research');
const Faculty = require('./model/faculty');
const Coordinator = require('./model/coordinator');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology:true})
.then((result)=>{
	console.log(`Database is running on port: ${result.connections[0].port}`)
	app.listen(port,()=>{
		console.log(`Listening on port:${port}`)
	})
})
.catch((err)=>{
	throw err
})

// paths
const images_path = path.join(__dirname, '../front-end/public/images');
const pdfs_path = path.join(__dirname, '../front-end/public/pdfs');
const token_path = path.join(__dirname, '/data/tokens.json');
const req_view_path = path.join(__dirname, 'data/view-requests.json');

const requestAccessToken = ( user ) => {
	return jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' }); // wait check ko
}


const authentication = ( req, res, next ) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[ 1 ];

	if( !token ) return res.sendStatus( 401 );

	jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if( err ) return res.sendStatus( 401 );

		req.user = user;
		next();
	})
}
//  paps palagyan ng "authentication" lahat ng requests except sa sign in reguster at refresh

app.get('/verify-me', authentication, async(req, res, next) => {
	return res.json({ user: req.user });
});

app.get('/filter-query/:course/:category/:yearSubmitted/:order/:year', async( req, res, next ) => {
	const { 
		course,
		category,
		yearSubmitted,
		order,
		year
	} = req.params;

	const result = [];

	Research.find(
		{ course: course, yearSubmitted: yearSubmitted, status: 'public' }, 
		null, 
		{ sort: { 
			title: order === 'A-Z' ? 1 : -1,
			yearSubmitted: year === 'Newest' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				docs.forEach( doc => {
					JSON.parse( doc.researchCategories )
					.forEach( categ => {
						if( category.includes( categ ) ){
							return result.push( doc );
						}
					});
				});

				return res.json({ result });
			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});



app.get('/student-filter-query/:course/:section/:yearLevel/:order', async( req, res, next ) => {
	const { 
		course,
		section,
		yearLevel,
		order
	} = req.params;

	const result = [];
	const sectionResult  = [];


	Student.find(
		{ course: course}, 
		null, 
		{ sort: { 
			lastName: order === 'A-Z' ? 1 : -1,
			yearLevel: yearLevel === '1-4' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				console.log(section);
				docs.forEach( doc => {
					if(doc.status == 'active'){
						result.push(doc);

						if(doc.section == section){
							sectionResult.push( doc );
						}
					}
				});

				if(section == 'null'){
					return res.json({ result });
				}
				else{
					return res.json({ sectionResult });
				}
			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});

app.get('/inactive-student-filter-query/:course/:section/:yearLevel/:order', async( req, res, next ) => {
	const { 
		course,
		section,
		yearLevel,
		order
	} = req.params;

	const result = [];
	const sectionResult  = [];


	Student.find(
		{ course: course}, 
		null, 
		{ sort: { 
			lastName: order === 'A-Z' ? -1 : 1,
			yearLevel: yearLevel === '4-1' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				console.log(section);
				docs.forEach( doc => {
					if(doc.status == 'inactive'){
						console.log(doc.status)
						result.push(doc);

						if(doc.section == section){
							sectionResult.push( doc );
						}
					}
				});

				if(section == 'null'){
					return res.json({ result });
				}
				else{
					return res.json({ sectionResult });
				}
			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});

//Login
app.post('/sign-in', async(req,res,next)=>{
	const { _username, _password, _label } = req.body;

	console.log(req.body)

	fs.readFile( token_path, (err, data) => {
		if( err ) return res.sendStatus( 503 );

		const token = JSON.parse( data );

		const saveTokens = ( token, cb ) => {
			fs.writeFile( token_path, JSON.stringify( token, null, 4 ), ( err ) => {
				if( err ) return res.sendStatus( 500 );

				if( cb ) cb();
			});
		}

		Student.findOne({studentNo: _username, password:_password, status: 'active'}, (err, doc) => {
			if( err ){
				return res.status( 401 ).json({ message: 'Server Error' });
			}

			const user = { name : _username, role: 'student' };
			const accessToken = requestAccessToken( user );
			const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

			token.push( refreshToken );

			if( !doc ){
				console.log(doc)
				Faculty.findOne({username:_username, password:_password, status: 'active'},  (err, doc) => {
					if( err ){

						return res.status( 401 ).json({ message: 'Server Error' });
					}

					const user = { name : _username, role: 'mis officer' };
					const accessToken = requestAccessToken( user );
					const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

					token.push( refreshToken );

					if( !doc ){
						console.log(doc)
						Coordinator.findOne({username:_username, password:_password, status: 'active'},  (errs, docs) => {
							if( errs ){
								return res.status( 401 ).json({ message: 'Server Error' });
							}

							if( docs ){
								console.log('admin');
								saveTokens( token, () => {
									return res.status( 200 ).json({
										accessToken: accessToken,
										refreshToken: refreshToken,
										message: 'Welcome mr/ms. coordinator',
										role: 'mis officer'});
									});
							}
							else{
								return res.status( 401 ).json({message: 'Unauthorized'});
							}		
						});
					}

					if( doc ){
						console.log('faculty');
						saveTokens( token, () => {
							return res.status( 200 ).json({
								accessToken: accessToken,
								refreshToken: refreshToken,
								message: 'Welcome mr/ms. officer',
								role: 'mis officer'});
						});
					}
				});
			}

			if( doc ){
				console.log('student');
				saveTokens( token, () => {
					return res.status( 200 ).json({
						accessToken: accessToken,
						refreshToken: refreshToken,
						message: 'Logged in successfuly',
						role: 'student'});
				});
			}
		});
	});
})

app.delete('/sign-out', async ( req, res ) => {
  fs.readFile( token_path, (err, data) => {
  	if( err ) return res.sendStatus( 503 );

  	if( data ){
  		data = JSON.parse( data );
  		data = data.filter( datum => datum !== req.body.token );

  		fs.writeFile( token_path, JSON.stringify( data, null, 4 ), err => {
		  	if( err ) return res.sendStatus( 503 );

		  	return res.sendStatus( 200 );
  		});
  	}
  });
});

app.get('/student/slist/:studentNo', async(req, res, next)=>{
	Student.findOne({studentNo: req.params.studentNo}, (err, doc)=>{
		if(err){
			return res.status(400).json({message:'unknown user'})
		}
		if(doc){
			return res.status(200).json({data:`${doc.firstName} ${doc.middleInitial} ${doc.lastName}`, message:'user logged-in'})
		}
	})
})

app.get('/faculty/flist/:username', async(req, res, next)=>{
	Faculty.findOne({status: 'active'}, (err, doc)=>{
		if(err){
			return res.status(400).json({message:'unknown user'})
		}

		if(doc){
			return res.status(200).json({data:`${doc.firstName} ${doc.middleInitial} ${doc.lastName}`, message:'user logged-in'})
		}
		else{
			return res.status(404).json({message:'not found'})
		}
	})
})

// Student List
app.get('/student/slist', async (req, res, next) =>{
	Student.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );


		return res.json( doc );
	})
})

app.get('/student/slist/r-count/:username', async (req, res, next) =>{
	const username = req.params.username;


	Student.findOne({studentNo:username}, (err,doc)=>{
		if (err) return res.sendStatus(503);

		if(doc){
			pCount = doc.pending.length ?? 0;
			aCount = doc.approved.length ?? 0;

			return res.status(200).json({pCount: pCount, aCount:aCount});
		}
	})
})


app.post('/student/slist/login', async (req, res, next)=>{

	Student.findOne({studentNo: _username, password: _password}, ( err, doc ) => {
		if( err ){
			return res.status( 401 ).json({message: 'Unauthorized'});
		}

		

		return res.status( 200 ).json({message: 'logged-in successfuly'});

	})
})

app.put('/student/slist/update', async(req,res,next)=>{
	const editData = req.body;

	editData.forEach(async (elem) => {
		Student.findOneAndUpdate({_id: elem._id}, {status: elem.status}, null, ( err ) => {
			if( err ) {
				return res.status( 503 ).json({ message: 'Server Error' });
			}
		})
	})

	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/student/slist/clear-logs/:username', async(req,res,next)=>{
	const studentNo = req.params.username;

	Student.findOne({studentNo: studentNo}, (err, doc)=>{
		if(err) return res.sendStatus(503);

		if(doc){
			if(doc.activity.length){
				doc.activity.splice(0,doc.activity.length);

				doc.save( err=>{
					if(err) return res.status(503).json({message:'server error'});

					return res.status(200).json({message:'cleared your logs'});
				})
			}	
			else{
				return res.sendStatus(404)
			}
		}
	})
})

app.put('/student/slist/changepassword/:studentNo/', async(req,res,next)=>{
	const studentNo = req.params.studentNo;


	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();



	const { _currPassword, _newPassword, _verNewPassword} = req.body;

	if(match(_newPassword, _verNewPassword)){
		Student.findOne({studentNo: studentNo, password: _currPassword}, ( err,doc ) => {
			if( err ) {
				return res.status( 503 ).json({ message: 'Server Error' });
			}

			if(doc){
				doc.password = _newPassword;

				doc.activity.push({message:'You changed your password', date: date})
				doc.save( err => {
					if(err)	return res.status(503).json({ message: 'Server Error' })
					
					return res.status( 200 ).json({ message: 'Saved successfully' });    
				});

				
			}

		})
	}
	else{
		return res.status(400).json({ message: 'Password does not match' })
	}
	

		
})

app.put('/student/slist/favorites/:username', async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
	const studentNo = req.params.username;

	const favorite = req.body;

	Student.findOne({studentNo:studentNo}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			data.favorites.push(...favorite);

			data.save( err => {
				if(err) return res.status( 503 ).json({ message: 'Server Error' });
			})

			return res.status(200).json({message: 'successfuly added to favorites'})
		}
	})
})

app.put('/student/slist/pending/:username', async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
	const studentNo = req.params.username;

	const pending = req.body;

	if( !pending.length ) return res.end();

	Student.findOne({studentNo:studentNo}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if( data ){
			if( data.approved.includes( pending[0] ) || data.pending.includes( pending[0] ) ){
				return res.status( 503 ).json({ message: 'You already requested this research' });		
			}

			data.pending.push( pending[0]  );
			data.save( err => {
				if( err ) return res.status( 503 ).json({  message: 'Server error' });

				return res.status( 200 ).json({message: 'successfuly added to pending'})
			});
		}
	})
})

app.post('/student/slist/disable/:username/:id',async(req,res,next)=>{
	const studentNo = req.params.username;

	const rID = req.params.id

	Student.findOne({studentNo:studentNo},(err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if( data ){
			if( data.approved.includes( rID ) || data.pending.includes( rID ) ){
				return res.status( 200 ).json({ message: 'button is diabled' });		
			}
		}

		return res.sendStatus( 404 );
	});
})

app.put('/student/slist/approved/:username/:date', async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
	const studentNo = req.params.username;
	const date = req.params.date;

	const approved = req.body;

	Student.findOne({studentNo:studentNo}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			const pending = data.pending.filter( id => id !== approved[0] );
			console.log( pending );
			data.pending = pending;

			console.log( approved[0] );
			if( approved[0] ){
				data.approved.push({ id: approved[0], dateApproved: date });
			}

			fs.readFile( req_view_path, (err, list) => {
				if(err) return res.status( 503 ).json({ message: 'Server Error' });

				const approvedList = JSON.parse(list).filter( datum => datum.id != approved[0] );

				fs.writeFile( req_view_path, JSON.stringify( approvedList, null, 4 ), err => {
					if(err) return res.status( 503 ).json({ message: 'Server Error' });

					data.save( err => {
						if(err) return res.status( 503 ).json({ message: 'Server Error' });

						return res.status(200).json({message: 'successfuly added to pending'})
					});
				});
			});
		}
	})
});

app.put('/student/slist/declined/:username', async(req,res,next)=>{
	const studentNo = req.params.username;

	const { date } = req.body;

	const declined = req.body;

	Student.findOne({studentNo:studentNo}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			const ind = data.pending.indexOf(declined)
			data.pending.splice(ind,1);
			data.declined.push(declined);

			data.save( err => {
				if(err) return res.status( 503 ).json({ message: 'Server Error' });

				return res.status(200).json({message: 'successfuly declined request'})
			})
			
		}
	})
})

app.get('/student/slist/favlist/:username', async(req,res,next)=>{
	const studentNo= req.params.username;

	Student.findOne({studentNo: studentNo}, (err, data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			const favList = [];

			data.favorites.forEach(async (_id, index) => {
				await Research.findOne({_id: _id}, (err,doc)=>{
					if(err) return res.status(503).json({message: 'Server Error' })

					if(doc){
						favList.push(doc);
					}

					if( index === data.favorites.length - 1){
						return res.status(200).json({data: favList})
					}
				})
			})


		}
	})
})

app.get('/student/slist/activity/:username', async(req,res,next)=>{
	studentNo = req.params.username

	const activity = []

	Student.findOne({studentNo: studentNo}, (err,doc)=>{
		if(err) return res.status(503).json({message: 'Server Error' })

		if(doc){
			if(doc.activity.length){
				doc.activity.forEach( async (act) =>{
					activity.unshift(act);
				})

				return res.status(200).json({data:activity})
			}
			else{
				return res.sendStatus(404)
			}
		}
	})
})

app.get('/student/slist/pending-list/:username', async(req,res,next)=>{
	const studentNo= req.params.username;

	const pendList = [];

	Student.findOne({studentNo: studentNo}, async (err, data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){

			if(data.pending.length){
				console.log(data.pending)

				try{
					const result = await Research.find().where('_id').in(data.pending);

					console.log( result );
					return res.json({ data: result });

				}
				catch( err ){
					throw err;
				}
			}
			else{
				return res.sendStatus(404);
			}
		}
	})
})

app.get('/student/slist/approved-list/:username', async(req,res,next)=>{
	const studentNo= req.params.username;

	Student.findOne({studentNo: studentNo}, async(err, data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			const apprList = [];

			if(data.approved.length){
				try{
					const result = await Research.find().where('_id').in( data.approved.map( elem => elem.id ) );

					if( result.length ){
						result.map( (rslt, index) => {
							rslt._doc.dateApproved = data.approved.map( elem => elem.dateApproved )[ index ];
							return rslt; 
						});
					}

					console.log( result );
					return res.json({ data: result });
				}
				catch( err ) {
					throw err;
				}
			}
			else{
				return res.sendStatus(404);
			}	
		}
		else{
			return res.sendStatus(404);
		}
	})
})



app.post('/student/slist/register', async (req, res , next) =>{
	const studentData = req.body;

	const newStudent = new Student(studentData);

	fs.readFile( token_path, (err, data) => {
		if( err ) return res.sendStatus( 503 );

		const token = JSON.parse( data );

		const saveTokens = ( token, cb ) => {
			fs.writeFile( token_path, JSON.stringify( token, null, 4 ), ( err ) => {
				if( err ) return res.sendStatus( 500 );

				if( cb ) cb();
			});
		}

		Student.find({ studentNo: studentData.studentNo}, (err, doc) => {
			if(err) return res.status( 503 ).json({ message: 'Server Error' });

			

			const user = { name : studentData.studentNo };
			const accessToken = requestAccessToken( user );
			const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

			token.push( refreshToken );

			if( doc.length > 0 ){ 
				return res.status(400).json({message:'username already used'})
			}
			else{
				newStudent.save((err) => {
					if ( err ){
					}

					saveTokens( token, () => {
						return res.status( 200 ).json({
							accessToken: accessToken,
							refreshToken: refreshToken,
							message: 'Successfuly registered'
						});
					});
				})

				
			}
			
		})
	})
})

//kasama toh? yes paps
// =====================================================================
// ============= GET PICTURE ================
// app.get('/picture/:username', async (req, res, next) => {
// 	const reqUsername = req.params.username;

// 	Coordinator.findOne({username: reqUsername}, (err, doc) => {
// 		if( err ) return res.sendStatus( 503 );

// 		if( doc ){
// 			doc.save( err => {
// 			    if( err ) return res.sendStatus( 503 );

// 				return res.status( 200 ).json({ path: doc.img });    
// 			});
// 		}
// 	});

// 	Faculty.findOne({username: reqUsername}, (err, doc) => {
// 		if( err ) return res.sendStatus( 503 );

// 		if( doc ){
// 			doc.save( err => {
// 			    if( err ) return res.sendStatus( 503 );

// 				return res.status( 200 ).json({ path: doc.img });    
// 			});
// 		}
// 	});
// });
// =====================================================================

app.get('/faculty/picture', async (req, res, next) => {


	Faculty.findOne({status: 'active'}, (err, doc) => {
		if( err ) return res.sendStatus( 503 );

		if( doc ){
			doc.save( err => {
			    if( err ) return res.sendStatus( 503 );

				return res.status( 200 ).json({ path: doc.img });    
			});
		}
	});
})

// =====================================================================
// ====== FACULTY IMAGE UPLOAD NEW CODE =======
app.put('/upload-picture/:username', async (req, res, next) => {
	if( !req.files ) return res.status( 400 ).json({ message: 'No file found'});

	const reqUsername = req.params.username;
	const image = req.files.adminImg;

	const image_name = `client-pic-${new Date().getMilliseconds()}.png`
	const destination_path = path.join( images_path, image_name );

	const updateImage = ( docu ) => {
		docu.img = `/images/${image_name}`;

		

		docu.save( err => {
		    if( err ) return res.sendStatus( 503 );

			image.mv( destination_path, async (err) => {
			    if( err ){
			    	return res.status( 503 );
			    }
			    else{
			    	return res.status( 200 ).json({ path: `/images/${image_name}` });    
			    }
			});
		});
	}

	Faculty.findOne({username: reqUsername}, (err, doc) => {
		if( err ) {
			return res.sendStatus( 503 );
		}

		if( doc ){
			if( doc.img ){
				fs.readdir( images_path, (err, files) => {
					if( err ) {
						return res.status( 503 );
					}

					files.forEach( async (file) => {
						if( doc.img === `/images/${file}` ){
							fs.unlink( path.join( images_path, '/',file), (err) => {
								if( err ) {
									return res.status( 503 );
								}

								updateImage( doc );
							});
						}
					});
				});
			}
			else{
				updateImage( doc );
			}
		}
	});

	Coordinator.findOne({username: reqUsername}, (err, doc) => {
		if( err ) return res.sendStatus( 503 );

		if( doc ){
			if( doc.img ){
				fs.readdir( images_path, (err, files) => {
					if( err ) return res.status( 503 );

					files.forEach( async (file) => {
						if( doc.img === `/images/${file}` ){
							fs.unlink( path.join( images_path, '/',file), (err) => {
								if( err ) return res.status( 503 );

								updateImage( doc );
							});
						}
					});
				});
			}
			else{
				updateImage( doc );
			}
		}
	});
});
// =====================================================================


// =====================================================================
// ====== FILE UPLOAD ========
app.post('/upload-file/', async (req, res, next) => {
	if( !req.files ) return res.status( 400 ).json({ message: 'No file found'});

	const file = req.files.fileUpload;
	
	const file_name = `${file.name}_${new Date().getMilliseconds()}.pdf`
	const destination_path = path.join( pdfs_path, file_name );

	file.mv( destination_path, async (err) => {
	    if( err ) return res.status( 503 );

		return res.status( 200 ).json({ path: `/pdfs/${file_name}` });    
	});
});


app.delete('/delete-file/:filename', async (req, res, next) => {
	const filename = req.params.filename;


	fs.readdir(pdfs_path, (err, files) => {
		if( err ) return res.status( 400 );

		if( files ){
			files.forEach( file => {
				if( `/pdfs/${file}` === filename){
					fs.unlink(path.join( pdfs_path, '/',file), (err) => {
						if( err ) return res.status( 400 );

						return res.status( 200 );    
					});
				}
			});
		}

		return res.end();
	});
});

// =====================================================================


//Research List
app.get('/research/rlist', async (req, res, next) =>{
	// const circularData = await Research.find({});
	// const data = CircularJSON.stringify( circularData );

	// return res.status( 200 ).json( JSON.parse(data) );
	Research.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		return res.json( doc );
	})
});

app.get('/research/rlist/course-count', async (req, res, next) =>{

	var BSIT = 0;
	var BSCS = 0; 

	Research.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				console.log(docs.course)
				if(docs.course === 'BSIT'){
						BSIT = BSIT + 1;
				}

				if(docs.course === 'BSCS'){
						BSCS = BSCS + 1;
				}

			})

			return res.json({
				BSIT:BSIT,
				BSCS:BSCS,
			})
		}
	})
});

app.get('/research/rlist/category-count', async (req, res, next) =>{
	var hardware = 0;
	var software = 0; 
	var webSys = 0;
	var gameDev = 0;
	var AR = 0;
	var mobileApp = 0;

	Research.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				JSON.parse(docs.researchCategories).forEach((categ)=>{
					if(categ === 'Hardware'){
						hardware = hardware + 1;
					}

					if(categ === 'Software'){
						software = software + 1;
					}

					if(categ === 'Web System'){
						webSys = webSys + 1;
					}

					if(categ === 'Game Dev'){
						gameDev = gameDev + 1;
					}

					if(categ === 'Augmented Reality'){
						AR = AR + 1;
					}

					if(categ === 'Mobile App'){
						mobileApp = mobileApp + 1;
					}
				})
			})

			return res.json({
				hardware:hardware,
				software:software,
				webSys:webSys,
				gameDev:gameDev,
				AR:AR,
				mobileApp:mobileApp
			})
		}
	})
});

app.post('/research/rlist/upload', async (req, res , next) =>{
	const researchData = req.body;

	const newResearch = new Research(researchData);
	newResearch.save((err) => {
		if ( err ){
			return res.status( 503 ).json({ message: 'Server Error' });
		}
	})

	return res.status( 200 ).json({message: 'Uploaded successfully'});
})


app.put('/research/rlist/update', async(req,res,next)=>{
	const editData = req.body;

	editData.forEach(async (elem) => {
		Research.findOneAndUpdate({_id: elem._id}, {status: elem.status}, null, ( err ) => {
			if( err ) {
				return res.status( 503 ).json({ message: 'Server Error' });
			}
		})
	})

	return res.status( 200 ).json({message: 'Updated successfully'});
})

//Faculty
app.get('/faculty/flist', async (req, res, next) =>{
	const circularData = await Faculty.find({});
	const data = CircularJSON.stringify( circularData );


	return res.status( 200 ).json( JSON.parse(data) );
})

app.post('/faculty/flist/register', async (req, res , next) =>{
	const facultyData = req.body;

	const newFaculty = new Faculty(facultyData);

	fs.readFile( token_path, (err, data) => {
		if( err ) return res.sendStatus( 503 );

		const token = JSON.parse( data );

		const saveTokens = ( token, cb ) => {
			fs.writeFile( token_path, JSON.stringify( token, null, 4 ), ( err ) => {
				if( err ) return res.sendStatus( 500 );

				if( cb ) cb();
			});
		}


		Faculty.find({ username: facultyData.username}, (err, doc) => {
			if(err) return res.status( 503 ).json({ message: 'Server Error' });

			const user = { name : facultyData.username };
			const accessToken = requestAccessToken( user );
			const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

			token.push( refreshToken );

			if( doc.length > 0 ){ // san yung part na nagaadd ka?
				return res.status(400).json({message:'username already used'})
			}
			else{
				newFaculty.save((err) => {
					if ( err ){
					}

					saveTokens( token, () => {
					
						return res.status( 200 ).json({
						accessToken: accessToken,
						refreshToken: refreshToken,
						message: 'Welcome mr. coordinator'});
					});
				})

				
			}
			
		})
	})

	
})

app.put('/faculty/flist/new-officer', async(req,res,next)=>{

	Faculty.findOne({status:'active'}, (err, docs) => {
		if( err ) return res.status(503).json({message:'server error'})

		if( docs ){
			docs.status = 'inactive';

			docs.save( err => { // may message ako paps
				if(err) return res.status(400).json({message:'server error'})
			}); //try mo daw pa

			return res.status(200).json({message:'New active officer created, the previous officer is now deactivated'});
		}
	});
})

app.put('/faculty/flist/changeofficer/:username', async (req,res,next)=>{



	const prevCoor = req.params.username;

	const checkMatch = ( doc , username ) => {
		
		if( doc.username == username ){
			doc.status = 'active';

			doc.save( err => { // may message ako paps
				if(err) return res.status(400).json({message:'server error'})
			});
		}
	}

	const success = () => res.status(200).json({message:'Current officer changed'});
	// try mo
	Faculty.find({}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

		//  // try ulit paps
		if( doc.length ){
			doc.forEach(doc=>{
				checkMatch( doc, prevCoor );
			}); // try paps
			success();
		}
		else{
			checkMatch( doc, prevCoor );
			success();
		}
	});
});

app.put('/faculty/flist/changepassword/:username', async(req,res,next)=>{
	const username = req.params.username;

	const data = await Faculty.findOne({username: username});



	const { _currPassword, _newPassword, _verNewPassword} = req.body;
	const { password } = data;

	if(match(password, _currPassword)){
		if(match(_newPassword, _verNewPassword)){
			Faculty.findOneAndUpdate({username: data.username}, {password: _newPassword}, {useFindAndModify : false}, ( err ) => {
				if( err ) {
					return res.status( 503 ).json({ message: 'Server Error' });
				}

				return res.status( 200 ).json({ message: 'Changed successfully' });

			})
		}
		else{
			return res.status(400).json({ message: 'Password is incorrect' })
		}
	}
	else{
		return res.status(400).json({ message: 'Password is incorrect' })
	}

		
})


app.put('/faculty/flist/editprofile/:username', async (req,res,next)=>{
	const username = req.params.username;

	const {
		_username ,
		_password,
		_firstName,
		_middleInitial,
		_lastName,
		_extentionName,
		_birthdate,
		_dateRegistered,
	} =req.body;

	Faculty.findOne({username: username}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

			
		if( doc ){
			if( match(doc.password, _password) ){

				doc.username  = _username ?? doc.username;
				doc.firstName = _firstName ?? doc.firstName;
				doc.middleInitial = _middleInitial ?? doc.middleInitial;
				doc.lastName = _lastName ?? doc.lastName;
				doc.extentionName = _extentionName ?? doc.extentionName;
				doc.birthdate = _birthdate ?? doc.birthdate;
				doc.dateRegistered = _dateRegistered ?? doc.dateRegistered;

				doc.save( err => {
					if(err)	return res.status(503).json({ message: 'Server Error' })
					
					return res.status( 200 ).json({ message: 'Saved successfully' });    
				});
			}
			else{
				return res.status(400).json({ message: 'Password is incorrect' })
			}
		}	
	});
});

app.put('/faculty/upload-picture', async (req, res, next) => {

	const image = req.files.MISimg;

	const image_name = `client-pic-${new Date().getMilliseconds()}.png`
	const destination_path = path.join( images_path, image_name );

	const updateImage = ( docu ) => {
		docu.img = `/images/${image_name}`;

		docu.save( err => {
		    if( err ) return res.sendStatus( 503 );

			image.mv( destination_path, async (err) => {
			    if( err ){
			    	return res.status( 503 );
			    }
			    else{
			    	return res.status( 200 ).json({ path: `/images/${image_name}`,message: 'Saved successfully' });    
			    }
			});
		});
	}

	Faculty.findOne({status: 'active'}, (err, doc) => {
		if( err ) {
			return res.sendStatus( 503 );
		}

		if( doc ){
			if( doc.img ){
				fs.readdir( images_path, (err, files) => {
					if( err ) return res.status( 503 );

					files.forEach( async (file) => {
						if( doc.img === `/images/${file}` ){
							fs.unlink( path.join( images_path, '/',file), (err) => {
								if( err ) return res.status( 503 );
								
								updateImage( doc );
							});
						}
					});
				});
			}
			else{
				updateImage( doc );
			}
		}
	});
})

app.put('/faculty/flist/editstudent/:username/:studentNo',async (req,res,next)=>{
	const studentNo = req.params.studentNo;
	const username = req.params.username;

	const facultyData = Faculty.findOne({username: username})

	const {_password,_firstName, _middleInitial,_lastName, _extentionName, _birthdate,_course,_yearLevel,_section,_img } =req.body;
	const { password } = await Faculty.findOne({username: username}).exec();


	Student.findOne({studentNo: studentNo}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

			
		if( doc ){

			if( match(password, _password) ){
		
				doc.firstName = _firstName ?? doc.firstName;
				doc.middleInitial = _middleInitial ?? doc.middleInitial;
				doc.lastName = _lastName ?? doc.lastName;
				doc.extentionName = _extentionName ?? doc.extentionName;
				doc.birthdate = _birthdate ?? doc.birthdate;
				doc.course = _course ?? doc.course;
				doc.yearLevel = _yearLevel ?? doc.yearLevel;
				doc.section = _section ?? doc.section;

				doc.save( err => {
					if(err)	return res.status(503).json({ message: 'Server Error' })
					
					return res.status(200).json({message:'Saved successfully'})
				});
			}
			else{
				return res.status(400).json({ message: 'Password is incorrect' })
			}
		}	
	});
});


// Admin
app.get('/auth-admin/data', async (req,res,next)=>{
	const circularData = await Coordinator.find({});
	const data = CircularJSON.stringify( circularData );


	return res.status( 200 ).json( JSON.parse(data) );
});

app.get('/auth-admin/profile', async(req, res, next)=>{
	Coordinator.findOne({status:'active'}, (err, doc)=>{
		if(err){
			return res.status(400).json({message:'unknown user'})
		}
		if(doc){
			return res.status(200).json({data:`${doc.firstName} ${doc.middleInitial} ${doc.lastName}`, message:'user logged-in'})
		}
	});
});

app.put('/coordinator/clist/remove-approved/:studentNo', async (req,res,next)=>{
	const studentNo = req.params.studentNo;

	const removed = req.body;

	function extractValue(arr, prop) {

    // extract value from property
	    let extractedValue = arr.map(item => item[prop]);

	    return extractedValue;

	}


	Student.findOne({studentNo:studentNo}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			var dataArray = extractValue(data.approved, 'id');

			console.log(dataArray.includes(removed[0]))	

			if(dataArray.includes(removed[0])){
				const approved = data.approved.filter(function(el) { return el.id != removed[0]; } );
				data.approved = approved;

				data.save( err => {
					if(err) return res.status( 503 ).json({ message: 'Server Error' });

					return res.status(200).json({message: 'successfuly removed'})
				})
			}
		}
		else{
			return res.status(503).json({message: 'server error'})
		}
	})
})

app.get('/clist/picture', async (req, res, next) => {


	Coordinator.findOne({status: 'active'}, (err, doc) => {
		if( err ) return res.sendStatus( 503 );

		if( doc ){
			doc.save( err => {
			    if( err ) return res.sendStatus( 503 );

				return res.status( 200 ).json({ path: doc.img });    
			});
		}
	});
})

app.put('/clist/upload-picture', async (req, res, next) => {

	const image = req.files.AdminImg;

	const image_name = `client-pic-${new Date().getMilliseconds()}.png`
	const destination_path = path.join( images_path, image_name );

	const updateImage = ( docu ) => {
		docu.img = `/images/${image_name}`;

		docu.save( err => {
		    if( err ) return res.sendStatus( 503 );

			image.mv( destination_path, async (err) => {
			    if( err ){
			    	return res.status( 503 );
			    }
			    else{
			    	return res.status( 200 ).json({ path: `/images/${image_name}`,message: 'welcome new coordinator please re log in' });    
			    }
			});
		});
	}

	Coordinator.findOne({status: 'active'}, (err, doc) => {
		if( err ) {
			return res.sendStatus( 503 );
		}

		if( doc ){
			if( doc.img ){
				fs.readdir( images_path, (err, files) => {
					if( err ) return res.status( 503 );

					files.forEach( async (file) => {
						if( doc.img === `/images/${file}` ){
							fs.unlink( path.join( images_path, '/',file), (err) => {
								if( err ) return res.status( 503 );
								
								updateImage( doc );
							});
						}
					});
				});
			}
			else{
				updateImage( doc );
			}
		}
	});
})


app.post('/coordinator/clist/register', async (req, res , next) =>{
	const coorData = req.body;

	const newCoor = new Coordinator(coorData);

	fs.readFile( token_path, (err, data) => {
		if( err ) return res.sendStatus( 503 );

		const token = JSON.parse( data );

		const saveTokens = ( token, cb ) => {
			fs.writeFile( token_path, JSON.stringify( token, null, 4 ), ( err ) => {
				if( err ) return res.sendStatus( 500 );

				if( cb ) cb();
			});
		}

		Coordinator.find({ username: coorData.username}, (err, doc) => {
			if(err) return res.status( 503 ).json({ message: 'Server Error' });

			const user = { name : coorData.username };
			const accessToken = requestAccessToken( user );
			const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

			token.push( refreshToken );

			if( doc.length > 0 ){ 
				return res.status(400).json({message:'username already used'})
			}
			else{
				newCoor.save((err) => {
					if ( err ){
						return res.sendStatus(503);
					}

					saveTokens( token, () => {
						return res.status( 200 ).json({
						accessToken: accessToken,
						refreshToken: refreshToken,
						message: 'Welcome mr. coordinator'
						});
					});
				})

				
			}
			
		})
	})
	
})

app.put('/coordinator/clist/new-admin', async(req,res,next)=>{

	Coordinator.findOne({status:'active'}, (err, docs) => {
		if( err ) return res.status(503).json({message:'server error'})

		if( docs ){
			docs.status = 'inactive';

			docs.save( err => { // may message ako paps
				if(err) return res.status(400).json({message:'server error'})
			}); //try mo daw pa

			return res.status(200).json({message:'New active officer created, the previous officer is now deactivated'});
		}
	});
})

app.post('/auth-admin', async (req, res, next) => {
	const { _username, _password } = req.body;

	Coordinator.findOne({status: 'active'}, (err, doc) => {
		if( err ){
			return res.status( 401 ).json({ message: 'Unauthorized' });
		}

		if( doc ){
			if(doc.username == _username){
				if(doc.password == _password){
					return res.status( 200 ).json({message: 'logged-in successfuly'});
				}
				else{
					return res.status( 401 ).json({message: 'Incorrect password'});	
				}
			}
			else{
				return res.status( 401 ).json({message: 'Incorrect username'});	
			}		

			return res.status( 401 ).json({message: 'Unauthorized'});			
		}
	});
});

app.put('/coordinator/clist/changecoor/:username', async (req,res,next)=>{
	const prevCoor = req.params.username;

	const checkMatch = ( doc , username ) => {
		
		if( doc.username == username ){
			doc.status = 'active';

			doc.save( err => { // may message ako paps
				if(err) return res.status(400).json({message:'server error'})
			});
		}
	}

	const success = () => res.status(200).json({message:'welcome new coordinator please re log in'});
	// try mo
	Coordinator.find({}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

		 // try ulit paps
		if( doc.length ){
			doc.forEach(doc=>{
				checkMatch( doc, prevCoor );
			}); // try paps
			success();
		}
		else{
			checkMatch( doc, prevCoor );
			success();
		}
	});
});

app.put('/auth-admin/editprofile/:username', async(req,res,next)=>{
	const username = req.params.username;

	const {
		_username ,
		_password,
		_firstName,
		_middleInitial,
		_lastName,
		_extentionName,
		_birthdate,
		_dateRegistered,
		_img,
	} =req.body;

	Coordinator.findOne({username: username}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

		if( doc ){
			
			if( match(doc.password, _password) ){
		
				
				doc.username  = _username ?? doc.username;
				doc.firstName = _firstName ?? doc.firstName;
				doc.middleInitial = _middleInitial ?? doc.middleInitial;
				doc.lastName = _lastName ?? doc.lastName;
				doc.extentionName = _extentionName ?? doc.extentionName;
				doc.birthdate = _birthdate ?? doc.birthdate;
				doc.dateRegistered = _dateRegistered ?? doc.dateRegistered;
				doc.img = _img ?? doc.img;


				doc.save( err => {
					if(err)	return res.status(503).json({ message: 'Server Error' })
					
					return res.status(200).json({message:'Saved successfully'})
				});
			}
			else{
				return res.status(400).json({ message: 'Password is incorrect' })
			}
		}	
	});
})

app.put('/auth-admin/changepassword/:username', async(req,res,next)=>{
	const username = req.params.username;

	const data = await Coordinator.findOne({username: username});



	const { _currPassword, _newPassword, _verPassword} = req.body;
	const {password} = data;


	if(match(password, _currPassword)){
		if(match(_newPassword, _verPassword)){
			
			Coordinator.findOneAndUpdate({username: username}, {password: _newPassword}, {useFindAndModify : false}, ( err ) => {
				if( err ) {
					return res.status( 503 ).json({ message: 'Server Error' });
				}

				return res.status( 200 ).json({ message: 'Changed successfully' });

			})
		}
		else{
			return res.status(400).json({ message: 'Password is incorrect' })
		}
	}
	else{
		return res.status(400).json({ message: 'Password is incorrect' })
	}
});


app.delete('/delete-file-req/:id', async ( req, res, next ) => {
	const id = req.params.id;

	fs.readFile( req_view_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );

		let list = JSON.parse( reqList );

		list = list.filter( item => item.id != id );

		fs.writeFile( req_view_path, JSON.stringify(list, null, 4), err => {
			if( err ) return res.sendStatus( 503 );

			return res.sendStatus( 200 );
		});		
	});
});


app.get('/check-file/:id', async ( req, res, next ) => {
	const id = req.params.id;

	fs.readFile( req_view_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );

		const list = JSON.parse( reqList );

		list.forEach( async (item, index) => {
			if( item.id === id ){

				return res.status( 200 ).json({itemState: list[index].state});
			}
		});

		return res.end();
	});
});

app.put('declined/change-file-state/:id', async ( req, res, next ) => {
	const id = req.params.id;

	fs.readFile( req_view_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );

		const list = JSON.parse( reqList );

		list.forEach( (item, index) => {
			if( item.id === id ){
				list[index].state = 'declined';
			}
		});

		fs.writeFile( req_view_path, JSON.stringify(list, null, 4), err => {
			if( err ) return res.sendStatus( 503 );

			return res.sendStatus( 200 );
		});
	});
});

app.get('/c-views', async ( req, res, next ) => {
	const data = req.body.data;

	fs.readFile( req_view_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );

		return res.json({ reqViews: JSON.parse( reqList ) });
	});
});


app.post('/request-view', async ( req, res, next ) => {
	const data = req.body.data;	

	fs.readFile( req_view_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );


		const list = JSON.parse( reqList );

		if( list.length && list.map( item => item.id ).includes( data.id ) ) return res.sendStatus( 200 );
		else if( !data ) return res.sendStatus( 200 );
		list.push( data );


		fs.writeFile( req_view_path, JSON.stringify( list, null, 4 ), ( err ) => {
			if( err ) return res.sendStatus( 503 );


			return res.sendStatus( 200 );
		});
	});
});

// Wait mag iisip lang ako WAHAHHAAAHAH

app.post('/refresh-token', async ( req, res ) => {
	fs.readFile( token_path, ( err, tokens ) => {
		if( err ) return res.sendStatus( 500 );

		const refreshToken = req.body.token;

		if( !refreshToken ) return res.sendStatus( 401 );
		if( !tokens.includes( refreshToken ) ) return res.sendStatus( 403 );

		jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {
			if( err ) return res.sendStatus( 403 );

			const accessToken = requestAccessToken({ name: user.name });

			return res.status( 200 ).json({ 
				message: 'token has successfully received', 
				accessToken: accessToken
			});
		});
	});
});

app.post('/check-research-state/:username/:id', async (req, res , next )=>{
	const username = req.params.username;
	const rID = req.params.id;

	Student.findOne({studentNo: username}, (err,doc)=>{
		if(err) return res.status(503).json({message:'Server Error'})

		if(doc){
			if(doc.approved.map(elem => elem.id).includes(rID)){
				return res.sendStatus(200)
			}
			else{
				return res.sendStatus(403)
			}
		}
		else{
			return res.sendStatus( 404 );
		}
	});


})

app.post('/clear-requests', async(req,res,next)=>{
	fs.writeFile( req_view_path, JSON.stringify( [] ), err => {});
});



const match = (leftOp, rightOp) => leftOp === rightOp;
