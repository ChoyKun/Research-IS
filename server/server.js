require('dotenv').config();

const uniqid = require('uniqid');
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
const coor_act_path = path.join(__dirname, 'data/coor-activity.json');

const requestAccessToken = ( user ) => {
	return jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' }); // wait check ko
}

function extractValue(arr, prop) {
  // extract value from property
  let extractedValue = arr.map(item => item[prop]);

  return extractedValue;
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

app.get('/verify-me', authentication, async(req, res, next) => {

	return res.json({ user: req.user });
});

app.get('/verify/admin/:username', authentication, async(req, res, next) => {
		console.log('bitch890')
	const username = req.params.username;
	console.log( username );
	Coordinator.findOne({username:username}, (err,doc)=>{
		if( err ) return res.status( 503 ).json({ message:'Server Error' });

		if(doc){
			Student.findOne({studentNo:username}, (err,doc)=>{
				if( err ) return res.status( 503 ).json({ message:'Server Error' });

				if(doc){
					return res.sendStatus(403);
				}
				else{
					// Faculty.findOne({username:username}, (err,doc)=>{
					// 	if( err ) return res.status( 503 ).json({ message:'Server Error' });

					// 	if(doc){
					// 		return res.sendStatus(403);
					// 	}
					// 	else{
					// 	}
					// });
					return res.json({ user: req.user });
				}
			});
		}
		else{
			return res.sendStatus(403);
		}
	})	
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
		{ status: 'public' }, 
		null, 
		{ sort: { 
			title: order === 'A-Z' ? 1 : -1,
			yearSubmitted: year === 'Newest' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				if(yearSubmitted == 'null'){
					if(course == 'all'){
						docs.forEach( doc => {
							JSON.parse( doc.researchCategories )
							.forEach( categ => {
								if( category.includes( categ ) ){
									return result.push( doc );
								}
							});
						});
					}
					else{
						docs.forEach( doc => {
							if(doc.course == course){
								JSON.parse( doc.researchCategories )
								.forEach( categ => {
									if( category.includes( categ ) ){
										return result.push( doc );
									}
								});
							}
						});
					}
					
				}
				else{
					if(course == 'all'){
						docs.forEach( doc => {
							if(doc.yearSubmitted == yearSubmitted){
								JSON.parse( doc.researchCategories )
								.forEach( categ => {
									if( category.includes( categ ) ){
										return result.push( doc );
									}
								});
							}
						});
					}
					else{
						docs.forEach( doc => {
							if(doc.course == course){
								if(doc.yearSubmitted == yearSubmitted){
									JSON.parse( doc.researchCategories )
									.forEach( categ => {
										if( category.includes( categ ) ){
											return result.push( doc );
										}
									});
								}
							}
						});
					}
				}
				

				return res.json({ result });
			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});

app.get('/archive-filter-query/:course/:category/:yearSubmitted/:order/:year', async( req, res, next ) => {
	const { 
		course,
		category,
		yearSubmitted,
		order,
		year
	} = req.params;

	const result = [];

	Research.find(
		{ status: 'archive' }, 
		null, 
		{ sort: { 
			title: order === 'A-Z' ? 1 : -1,
			yearSubmitted: year === 'Newest' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				if(yearSubmitted == 'null'){
					if(course == 'all'){
						docs.forEach( doc => {
							JSON.parse( doc.researchCategories )
							.forEach( categ => {
								if( category.includes( categ ) ){
									return result.push( doc );
								}
							});
						});
					}
					else{
						docs.forEach( doc => {
							if(doc.course == course){
								JSON.parse( doc.researchCategories )
								.forEach( categ => {
									if( category.includes( categ ) ){
										return result.push( doc );
									}
								});
							}
						});
					}
					
				}
				else{
					if(course == 'all'){
						docs.forEach( doc => {
							if(doc.yearSubmitted == yearSubmitted){
								JSON.parse( doc.researchCategories )
								.forEach( categ => {
									if( category.includes( categ ) ){
										return result.push( doc );
									}
								});
							}
						});
					}
					else{
						docs.forEach( doc => {
							if(doc.course == course){
								if(doc.yearSubmitted == yearSubmitted){
									JSON.parse( doc.researchCategories )
									.forEach( categ => {
										if( category.includes( categ ) ){
											return result.push( doc );
										}
									});
								}
							}
						});
					}
				}
				

				return res.json({ result });
			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});



app.get('/student-filter-query/:course/:section/:yearLevel/:order/:sex/:year', async( req, res, next ) => {
	const { 
		course,
		section,
		sex,
		yearLevel,
		order,
		year
	} = req.params;

	const result = [];
	const sectionResult  = [];
	Student.find(
		{ status:'active'}, 
		null, 
		{ sort: { 
			lastName: order === 'A-Z' ? 1 : -1,
			year: yearLevel === '1-4' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				docs.forEach( doc => {
					if(section == 'null'){
						if(sex == 'all'){
							if(course == 'all'){
								if( yearLevel =='all' ){
									result.push(doc);
								}
								else{
									if(doc.yearLevel == yearLevel){
										result.push(doc);
									}	
								}		
							}
							else{
								if(doc.course == course){
									if( yearLevel =='all' ){
										result.push(doc);
									}
									else{
										if(doc.yearLevel == yearLevel){
											result.push(doc);
										}	
									}		
								}
							}
						}
						else{
							if(doc.sex == sex){
								if(course == 'all'){
									if( yearLevel =='all' ){
										result.push(doc);
									}
									else{
										if(doc.yearLevel == yearLevel){
											result.push(doc);
										}	
									}		
								}
								else{
									if(doc.course == course){
										if( yearLevel == 'all' ){
											result.push(doc);
										}
										else{
											if(doc.yearLevel == yearLevel){
												result.push(doc);
											}	
										}		
									}
								}
							}			
						}
					}
					else{
						if(doc.section == section){
							if(sex == 'all'){
								if(course == 'all'){
									if( yearLevel =='all' ){
										result.push(doc);
									}
									else{
										if(doc.yearLevel == yearLevel){
											result.push(doc);
										}	
									}		
								}
								else{
									if(doc.course == course){
										if( yearLevel =='all' ){
											result.push(doc);
										}
										else{
											if(doc.yearLevel == yearLevel){
												result.push(doc);
											}	
										}		
									}
								}
							}
							else{
								if(doc.sex == sex){
									if(course == 'all'){
										if( yearLevel =='all' ){
											result.push(doc);
										}
										else{
											if(doc.yearLevel == yearLevel){
												result.push(doc);
											}	
										}		
									}
									else{
										if(doc.course == course){
											if( yearLevel == 'all' ){
												result.push(doc);
											}
											else{
												if(doc.yearLevel == yearLevel){
													result.push(doc);
												}	
											}		
										}
									}
								}			
							}
						}
					}		
				});

				return res.json({ result });

			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});

app.get('/inactive-student-filter-query/:course/:section/:yearLevel/:order/:sex/:year', async( req, res, next ) => {
	const { 
		course,
		section,
		sex,
		yearLevel,
		order,
		year
	} = req.params;

	const result = [];
	const sectionResult  = [];


	Student.find(
		{ status:'inactive'}, 
		null, 
		{ sort: { 
			lastName: order === 'A-Z' ? 1 : -1,
			year: yearLevel === '1-4' ? 1 : -1
		}},
		( err, docs ) => {
			if( err ) return res.status( 503 ).json({ message:'Server Error' });

			if( docs ){
				docs.forEach( doc => {
					if(section == 'null'){
						if(sex == 'all'){
							if(course == 'all'){
								if( yearLevel =='all' ){
									result.push(doc);
								}
								else{
									if(doc.yearLevel == yearLevel){
										result.push(doc);
									}	
								}		
							}
							else{
								if(doc.course == course){
									if( yearLevel =='all' ){
										result.push(doc);
									}
									else{
										if(doc.yearLevel == yearLevel){
											result.push(doc);
										}	
									}		
								}
							}
						}
						else{
							if(doc.sex == sex){
								if(course == 'all'){
									if( yearLevel =='all' ){
										result.push(doc);
									}
									else{
										if(doc.yearLevel == yearLevel){
											result.push(doc);
										}	
									}		
								}
								else{
									if(doc.course == course){
										if( yearLevel == 'all' ){
											result.push(doc);
										}
										else{
											if(doc.yearLevel == yearLevel){
												result.push(doc);
											}	
										}		
									}
								}
							}			
						}
					}
					else{
						if(doc.section == section){
							if(sex == 'all'){
								if(course == 'all'){
									if( yearLevel =='all' ){
										result.push(doc);
									}
									else{
										if(doc.yearLevel == yearLevel){
											result.push(doc);
										}	
									}		
								}
								else{
									if(doc.course == course){
										if( yearLevel =='all' ){
											result.push(doc);
										}
										else{
											if(doc.yearLevel == yearLevel){
												result.push(doc);
											}	
										}		
									}
								}
							}
							else{
								if(doc.sex == sex){
									if(course == 'all'){
										if( yearLevel =='all' ){
											result.push(doc);
										}
										else{
											if(doc.yearLevel == yearLevel){
												result.push(doc);
											}	
										}		
									}
									else{
										if(doc.course == course){
											if( yearLevel == 'all' ){
												result.push(doc);
											}
											else{
												if(doc.yearLevel == yearLevel){
													result.push(doc);
												}	
											}		
										}
									}
								}			
							}
						}
					}		
				});

				return res.json({ result });

			}
			else{
				return res.sendStatus( 403 );
			}
		}
	);
});

//Login
app.post('/sign-in', async(req,res,next)=>{
	const { _username, _password } = req.body;

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
				Faculty.findOne({username:_username, password:_password, status: 'active'},  (err, doc) => {
					if( err ){

						return res.status( 401 ).json({ message: 'Server Error' });
					}

					const user = { name : _username, role: 'mis officer' };
					const accessToken = requestAccessToken( user );
					const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

					token.push( refreshToken );

					if( !doc ){
						Coordinator.findOne({username:_username, password:_password, status: 'active'},  (errs, docs) => {
							if( errs ){
								return res.status( 401 ).json({ message: 'Server Error' });
							}

							const user = { name : _username, role: 'admin' };
							const accessToken = requestAccessToken( user );
							const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET );

							token.push( refreshToken );

							if( docs ){
								saveTokens( token, () => {
									return res.status( 200 ).json({
										accessToken: accessToken,
										refreshToken: refreshToken,
										message: 'Welcome mr/ms. coordinator',
										role: 'admin',
										_id: docs._id.toString()
									});
									});
							}
							else{
								return res.status( 401 ).json({message: 'Unauthorized'});
							}		
						});
					}

					if( doc ){
						saveTokens( token, () => {
							return res.status( 200 ).json({
								accessToken: accessToken,
								refreshToken: refreshToken,
								message: 'Welcome mr/ms. officer',
								role: 'mis officer',
								_id: doc._id.toString()
							});
						});
					}
				});
			}

			if( doc ){
				saveTokens( token, () => {
					return res.status( 200 ).json({
						accessToken: accessToken,
						refreshToken: refreshToken,
						message: 'Logged in successfuly',
						role: 'student',
						_id: doc._id.toString()
					});
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

app.get('/student/sex-count', async (req, res, next) =>{

	var Male = 0;
	var Female = 0;

	Student.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				if(docs.sex == 'Male'){
					Male=Male+1;
				}

				if(docs.sex == 'Female'){
					Female=Female+1;
				}
			})

			return res.status(200).json({
				Male:Male,
				Female: Female
			})
		}


	})
})

app.get('/rlist/archive-count', async (req, res, next) =>{

	var Public = 0;
	var Archive = 0;

	Research.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				if(docs.status== 'public'){
					Public=Public+1;
				}

				if(docs.status == 'archive'){
					Archive=Archive+1;
				}
			})

			return res.status(200).json({
				Public:Public,
				Archive: Archive
			})
		}


	})
})

app.get('/slist/status-count', async (req, res, next) =>{

	var Active = 0;
	var Inactive = 0;

	Student.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				if(docs.status== 'active'){
					Active=Active+1;
				}

				if(docs.status == 'inactive'){
					Inactive=Inactive+1;
				}
			})

			return res.status(200).json({
				Active:Active,
				Inactive: Inactive
			})
		}


	})
})

app.get('/student/course-count', async (req, res, next) =>{

	var BSIT = 0;
	var BSCS = 0;

	Student.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				if(docs.course == 'BSIT'){
					BSIT=BSIT+1;
				}

				if(docs.course == 'BSCS'){
					BSCS=BSCS+1;
				}
			})

			return res.status(200).json({
				BSIT:BSIT,
				BSCS: BSCS
			})
		}


	})
})

app.get('/student/year-count', async (req, res, next) =>{

	var first = 0;
	var second = 0;
	var third = 0;
	var fourth = 0;

	Student.find({}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
				if(docs.yearLevel == '1'){
					first=first+1;
				}

				if(docs.yearLevel == '2'){
					second=second+1;
				}

				if(docs.yearLevel == '3'){
					third=third+1;
				}

				if(docs.yearLevel == '4'){
					fourth=fourth+1;
				}
			})

			return res.status(200).json({
				first:first,
				second:second,
				third:third,
				fourth:fourth
			})
		}


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

app.put('/forgetpass', async(req,res,next)=>{
	const {studentNo, email} = req.body;

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	Faculty.findOne({status:'active'}, (err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){
			doc.inbox.push({
				msg_id: uniqid(),
				message:`Student ${studentNo} has requested to reset their password, please send an email at ${email} to notify them`, 
				date: date
			})

			doc.save( err=>{
				if(err) {
					return res.status(503).json({message:'server error'});
				}

				return res.status(200).json({message:'your request for password request has been sent, please wait for an email from the MIS office'})
			})
		}
	})
})

app.put('/student/slist/update', async(req,res,next)=>{
	const editData = req.body;


	Faculty.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){

			const today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			editData.forEach(async (elem) => {
				Student.findOneAndUpdate({_id: elem._id}, {status: elem.status}, null, ( err ) => {
					if( err ) {
						return res.status( 503 ).json({ message: 'Server Error' });
					}
				})

				doc.activity.push({message:`You updated ${elem.studentNo}'s status to ${elem.status}`, date: date})
			})
			doc.save( err=>{
				if(err) {
					return res.status(503).json({message:'server error'});
				}
			})
		}
	})

	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/student/slist/update/yearLevel', async(req,res,next)=>{
	const editData = req.body;


	Faculty.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){

			const today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			editData.forEach(async (elem) => {
				Student.findOne({_id: elem._id}, ( err,docs ) => {
					if( err ) {
						return res.status( 503 ).json({ message: 'Server Error' });
					}

					if(docs){
						if(docs.yearLevel == 4){
							docs.status = 'inactive'
						}
						else{
							docs.yearLevel = docs.yearLevel+1;
						}

						docs.save( err=>{
							if(err) {
								return res.status(503).json({message:'server error'});
							}
						})
					}
				})

				doc.activity.push({message:`You advanced ${elem.studentNo}'s year level`, date: date})
			})
			doc.save( err=>{
				if(err) {
					return res.status(503).json({message:'server error'});
				}
			})
		}
	})

	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/student/slist/update/course', async(req,res,next)=>{
	const editData = req.body;


	Faculty.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){

			const today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			editData.forEach(async (elem) => {
				Student.findOne({_id: elem._id}, ( err,docs ) => {
					if( err ) {
						return res.status( 503 ).json({ message: 'Server Error' });
					}

					if(docs){
						if(docs.course == 'BSIT'){
							docs.course = 'BSCS'
						}
						else{
							docs.course = 'BSIT'
						}

						docs.save( err=>{
							if(err) {
								return res.status(503).json({message:'server error'});
							}
						})
					}
				})

				doc.activity.push({message:`You shifted ${elem.studentNo}'s course`, date: date})
			})
			doc.save( err=>{
				if(err) {
					return res.status(503).json({message:'server error'});
				}
			})
		}
	})

	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/student/slist/update/section/:section', async(req,res,next)=>{
	const editData = req.body;
	const newSection = req.params.section


	Faculty.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){

			const today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			editData.forEach(async (elem) => {
				Student.findOne({_id: elem._id}, ( err,docs ) => {
					if( err ) {
						return res.status( 503 ).json({ message: 'Server Error' });
					}

					if(docs){
						docs.section = newSection;

						docs.save( err=>{
							if(err) {
								return res.status(503).json({message:'server error'});
							}
						})
					}
				})

				doc.activity.push({message:`You changed ${elem.studentNo}'s section to ${newSection}`, date: date})
			})
			doc.save( err=>{
				if(err) {
					return res.status(503).json({message:'server error'});
				}
			})
		}
	})


	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/student/slist/clear-logs/:username', async(req,res,next)=>{
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	
	const studentNo = req.params.username;


	Student.findOne({studentNo: studentNo}, (err, doc)=>{
		if(err) return res.sendStatus(503);

		if(doc){
			if(doc.activity.length){
				doc.activity.splice(0,doc.activity.length);
				doc.activity.push({message:'You cleared your logs', date: date})

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

app.put('/student/slist/clear-message/:username', async(req,res,next)=>{
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	
	const studentNo = req.params.username;


	Student.findOne({studentNo: studentNo}, (err, doc)=>{
		if(err) return res.sendStatus(503);

		if(doc){
			if(doc.inbox.length){
				doc.inbox.splice(0,doc.inbox.length);
				doc.activity.push({message:'You cleared your messages', date: date})

				doc.save( err=>{
					if(err) return res.status(503).json({message:'server error'});

					return res.status(200).json({message:'cleared your inbox'});
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
		Student.findOne({studentNo: studentNo}, ( err,doc ) => {
			if( err ) {
				return res.status( 503 ).json({ message: 'Server Error' });
			}

			if(doc){
				if(doc.password == _currPassword){
					doc.password = _newPassword;

					doc.activity.push({message:'You changed your password', date: date})
					doc.save( err => {
						if(err)	return res.status(503).json({ message: 'Server Error' })
						
						return res.status( 200 ).json({ message: 'Saved successfully' });    
					});
				}
				else{
					return res.status( 403 ).json({ message: 'Incorrect password' });
				}				
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

app.put('/student/slist/pending/:username/:title', async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
	const studentNo = req.params.username;
	const title = req.params.title;

	const pending = req.body;

	if( !pending.length ) return res.end();

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	Student.findOne({studentNo:studentNo}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if( data ){
			if( data.approved.includes( pending[0] ) || data.pending.includes( pending[0] ) ){
				return res.status( 503 ).json({ message: 'You already requested this research' });		
			}

			data.pending.push( pending[0]  );
			data.activity.push({message:`You requested ${title} for full content viewing ` , date:date})

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
			const id = data.approved.map( elem => elem.id )
			if( id.includes(rID) || data.pending.includes( rID ) ){
				return res.status( 200 ).json({ message: 'button is diabled' });		
			}
		}

		return res.sendStatus( 404 );
	});
})

app.put('/student/slist/approved/:username/:date/:title', async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
	const studentNo = req.params.username;
	const date = req.params.date;
	const title = req.params.title;

	const today = new Date();
	var dateAct = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	const approved = req.body;


	Coordinator.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){
			Student.findOne({studentNo:studentNo}, (err,data)=>{
				if(err) return res.status( 503 ).json({ message: 'Server Error' });

				if(data){
					const pending = data.pending.filter( id => id !== approved[0] );
					data.pending = pending;

					if( approved[0] ){
						data.approved.push({ id: approved[0], dateApproved: date });
					}

					data.inbox.push({
						msg_id: uniqid(),
						message:`Your request to access ${title} has been approved, check your list of approved researches`, 
						date: dateAct
					});

					fs.readFile( req_view_path, (err, list) => {
						if(err) return res.status( 503 ).json({ message: 'Server Error' });

						const approvedList = JSON.parse(list).filter( datum => datum.id != approved[0] );

						fs.writeFile( req_view_path, JSON.stringify( approvedList, null, 4 ), err => {
							if(err) return res.status( 503 ).json({ message: 'Server Error' });

							data.save( err => {
								if(err) return res.status( 503 ).json({ message: 'Server Error' });

								
							});
						});
					});
				}
			})

			doc.activity.push({
				msg_id: uniqid(),
				message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} approved ${studentNo}'s request to access ${title}`, 
				date: dateAct
			});

			doc.save( err=>{
				if(err) return res.status(503).json({message:'server error'});

				return res.status(200).json({message: 'successfuly approved request'})
			})
		}
	})

	
});

app.put('/student/slist/declined/:username/:title', async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
	const studentNo = req.params.username;
	const title = req.params.title;

	const today = new Date();
	var dateAct = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	const declined = req.body;


	Coordinator.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){
			Student.findOne({studentNo:studentNo}, (err,data)=>{
				if(err) return res.status( 503 ).json({ message: 'Server Error' });

				if(data){
					const pending = data.pending.filter( id => id !== declined[0] );
					data.pending = pending;

					data.inbox.push({
						msg_id: uniqid(),
						message:`Sorry, your request to access ${title} has been declined by the coordinator`, 
						date: dateAct
					})

					fs.readFile( req_view_path, (err, list) => {
						if(err) return res.status( 503 ).json({ message: 'Server Error' });

						const approvedList = JSON.parse(list).filter( datum => datum.id != declined[0] );

						fs.writeFile( req_view_path, JSON.stringify( approvedList, null, 4 ), err => {
							if(err) return res.status( 503 ).json({ message: 'Server Error' });

							data.save( err => {
								if(err) return res.status( 503 ).json({ message: 'Server Error' });

								
							});
						});
					});
				}
			})

			doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} declined ${studentNo}'s request to access ${title}`, date: dateAct})

			doc.save( err=>{
				if(err) return res.status(503).json({message:'server error'});

				return res.status(200).json({message: 'successfuly declined request'})
			})
		}
	})

	
});

app.put('/remove-perm/:id', async(req,res,next)=>{
	const editData = req.body;
	const rID = req.params.id
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	console.log(editData)

	Student.find({}, (err,data)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(data){
			data.forEach(object=>{
				editData.forEach(item=>{
					if(item.studentNo === object.studentNo){
						var dataArray = extractValue(object.approved, 'id');

						if(dataArray.includes(rID)){
							const approved = object.approved.filter(function(el) { return el.id != rID; } );
							object.approved = approved;

							object.save( err => {
								if(err) return res.status( 503 ).json({ message: 'Server Error' });

								return res.status(200).json({message: 'successfuly removed permiss'})
							})
						}
					}
				})
			})
			
		}
	})
})


app.get('/student/slist/favlist/:username', async(req,res,next)=>{
	// const studentNo= req.params.username;

	// Student.findOne({studentNo: studentNo}, (err, data)=>{
	// 	if(err) return res.status( 503 ).json({ message: 'Server Error' });

	// 	if(data){
	// 		const favList = [];

	// 		data.favorites.forEach(async (_id, index) => {
	// 			await Research.findOne({_id: _id}, (err,doc)=>{
	// 				if(err) return res.status(503).json({message: 'Server Error' })

	// 				if(doc){
	// 					favList.push(doc);
	// 				}

	// 				if( index === data.favorites.length - 1){
	// 					return res.status(200).json({data: favList})
	// 				}
	// 			})
	// 		})


	// 	}
	// })
});

app.get('/messages', async(req,res,next)=>{
	// const today = new Date();
	// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	const inbox = [];
	Student.find({}, (err,students)=>{
		if(err) return res.status(503).json({message: 'Server Error' })

		Faculty.find({}, (err, faculties) => {
			if(err) return res.status(503).json({message: 'Server Error' })

			Coordinator.find({}, (err, coors) => {
				if(err) return res.status(503).json({message: 'Server Error' })

					if( coors.length ){
						coors.forEach( doc => {
							doc.inbox.forEach( inb => {
								const message = {
									...inb,
									_id: doc._id.toString()
								}

								inbox.push( message );
							});
						});

					}

					if( faculties.length ){
						faculties.forEach( doc => {
							doc.inbox.forEach( inb => {
								const message = {
									...inb,
									_id: doc._id.toString()
								}

								inbox.push( message );
							});
						});
					}

					if( students.length ){
						students.forEach( doc => {
							doc.inbox.forEach( inb => {
								const message = {
									...inb,
									_id: doc._id.toString()
								}

								inbox.push( message );
							});
						});
					}

					return res.status( 200 ).json({ data: inbox });
			});
		});
	});
});


app.get('/student/slist/activity/:username', async(req,res,next)=>{
	let studentNo = req.params.username
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


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
});

app.get('/student/slist/inbox/:username', async( req,res,next ) => {
	// studentNo = req.params.username
	// const today = new Date();
	// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	// const inbox = []

	// Student.findOne({studentNo: studentNo}, (err,doc)=>{
	// 	if(err) return res.status(503).json({message: 'Server Error' })

	// 	if(doc){
	// 		if(doc.inbox.length){
	// 			doc.inbox.forEach( async (item) =>{
	// 				inbox.unshift(item);
	// 			})

	// 			return res.status(200).json({data:inbox})
	// 		}
	// 		else{
	// 			return res.sendStatus(404)
	// 		}
	// 	}
	// })
});

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
							console.log(data.approved.map( elem => elem._id )[index])
							return rslt; 
						});
					}

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

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	console.log(studentData.password)

	fs.readFile( token_path, (err, data) => {
		if( err ) return res.sendStatus( 503 );

		const token = JSON.parse( data );

		const saveTokens = ( token, cb ) => {
			fs.writeFile( token_path, JSON.stringify( token, null, 4 ), ( err ) => {
				if( err ) return res.sendStatus( 500 );

				if( cb ) cb();
			});
		}

		Faculty.findOne({status:'active'} , (err,docs)=>{
			if(err) return res.status( 503 ).json({ message: 'Server Error' });

			if(docs){
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

						docs.activity.push({message:`You registered ${studentData.studentNo} as a new student`, date: date})
						docs.save( err => {
							if(err)	return res.status(503).json({ message: 'Server Error' })
						});
					}		
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

	Research.find({status:'public'}, (err, doc) => {
		if( err ) res.sendStatus( 503 );

		if(doc){
			doc.forEach((docs)=>{
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

	Research.find({status:'public'}, (err, doc) => {
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
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	const newResearch = new Research(researchData);

	Coordinator.findOne({status:'active'}, (err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){
			newResearch.save((err) => {
				if ( err ){
					console.log(err)
					return res.status( 503 ).json({ message: 'Server Error' });
				}
			})

			doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} uploaded a research titled ${researchData.title}`, date: date})
			doc.save( err=>{
				if(err) return res.status(503).json({message:'server error'});

				return res.status( 200 ).json({message: 'Uploaded successfully'});
			})
		}
	})
	
	

	
})


app.put('/research/rlist/update', async(req,res,next)=>{
	const editData = req.body;
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	Coordinator.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){
			editData.forEach(async (elem) => {
				Research.findOneAndUpdate({_id: elem._id}, {status: elem.status}, null, ( err ) => {
					if( err ) {
						return res.status( 503 ).json({ message: 'Server Error' });
					}
				})

				doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} updated ${elem.title}'s status to ${elem.status}`, date: date})
			})
			
			doc.save( err=>{
				if(err) return res.status(503).json({message:'server error'});
			})
		}
	})
	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/research/rlist/student/update', async(req,res,next)=>{
	const editData = req.body; // list of selected research to hide

	Student.find({}, async (err, docs) => {
		if( err ) return res.status( 503 ).json({ message: 'Server Error' });

		if( docs ){
			console.log( editData );

			for( const doc of docs ){
				try{
					editData.forEach( research => {
						console.log( doc.pending );
						doc.pending = doc.pending.filter( pnd => pnd !== research._id );
						console.log( doc.pending );
						
						doc.approved = doc.approved.filter( apprvd => apprvd.id !== research._id );
					});

					await doc.save();
				}
				catch( err ){
					return res
						.status( 503 )
						.json({
							message: err
						});
				}
			}
		}
		else{
			return res.sendStatus( 200 );
		}
	})
})


//Faculty
app.get('/faculty/flist', async (req, res, next) =>{
	const circularData = await Faculty.find({});
	const data = CircularJSON.stringify( circularData );


	return res.status( 200 ).json( JSON.parse(data) );
})

app.put('/faculty/flist/resetpass/:studentNo', async (req, res, next) =>{
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	const studentNo = req.params.studentNo

	Faculty.findOne({status:'active'}, (err,docs)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(docs){
			console.log(docs)
			docs.activity.push({message:`You reset ${studentNo}'s password to default`, date: date})

			docs.save( err=>{
				if(err) return res.status(503).json({message:'server error'});
			})
			Student.findOne({studentNo:studentNo}, (err,doc)=>{
				if(err) return res.status( 503 ).json({ message: 'Server Error' });

				if(doc){
					doc.password = doc.lastName+'123';
					doc.inbox.push({
						msg_id: uniqid(),
						message:`MIS officer had reset your password`, 
						date: date})

					doc.save( err=>{
						if(err) return res.status(503).json({message:'server error'});

						return res.status( 200 ).json({message: 'Reset to default password'});
					})
				}
			})
	}
})



	
	
})

app.put('/faculty/flist/clear-logs/:username', async(req,res,next)=>{
	const studentNo = req.params.username;

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	Faculty.findOne({status: 'active'}, (err, doc)=>{
		if(err) return res.sendStatus(503);

		if(doc){
			if(doc.activity.length){
				doc.activity.splice(0,doc.activity.length);
				doc.activity.push({message:'You cleared your logs', date: date})

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

app.get('/faculty/flist/activity/:username', async(req,res,next)=>{
	username = req.params.username

	const activity = []

	Faculty.findOne({status:'active'}, (err,doc)=>{
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

app.post('/faculty/flist/register', async (req, res , next) =>{
	const facultyData = req.body;
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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
		Coordinator.findOne({status:'active'}, (err,docs)=>{
			if(err) return res.status( 503 ).json({ message: 'Server Error' });

			if(docs){

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
								message: 'New officer added, previous officer is now inactive'});
							});
						})

						docs.activity.push({message:`${docs.firstName} ${docs.middleInitial} ${docs.lastName} ${docs.extentionName ?? ''} registered ${facultyData.username} as the new MIS officer`, date: date})
						docs.save( err => {
							if(err)	return res.status(503).json({ message: 'Server Error' })
						});
					}
					
				})

					
			}
		})

		
	})

	
})

app.put('/faculty/flist/new-officer', async(req,res,next)=>{

	Faculty.findOne({status:'active'}, (err, docs) => {
		if( err ) return res.status(503).json({message:'server error'})

		if(!docs){
			return res.status(200).json({message:'New active officer created,no previous officer is found'});
		}

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
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();



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
	
	Coordinator.findOne({status:'active'}, (err,docs)=>{
		if(err)	return res.status(503).json({ message: 'Server Error' })

		if(docs){
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

			docs.activity.push({message:`${docs.firstName} ${docs.middleInitial} ${docs.lastName} ${docs.extentionName ?? ''} set ${prevCoor} as the MIS officer`, date: date})
			docs.save( err => {
				if(err)	return res.status(503).json({ message: 'Server Error' })
			});
		}
	})

	
});

app.put('/faculty/flist/changepassword/:username', async(req,res,next)=>{
	const username = req.params.username;


	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();



	const { _currPassword, _newPassword, _verNewPassword} = req.body;

	if(match(_newPassword, _verNewPassword)){
		Faculty.findOne({username: username}, ( err,doc ) => {
			if( err ) {
				return res.status( 503 ).json({ message: 'Server Error' });
			}

			if(doc){
				if(doc.password == _currPassword){
					doc.password = _newPassword;

					doc.activity.push({message:'You changed your password', date: date})
					doc.save( err => {
						if(err)	return res.status(503).json({ message: 'Server Error' })
						
						return res.status( 200 ).json({ message: 'Saved successfully' });    
					});
				}
				else{
					return res.status( 403 ).json({ message: 'Incorrect password' }); 
				}			
			}

		})
	}
	else{
		return res.status(400).json({ message: 'Password does not match' })
	}

		
})


app.put('/faculty/flist/editprofile/:username', async (req,res,next)=>{
	const username = req.params.username;

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	const {
		_username ,
		_password,
		_firstName,
		_middleInitial,
		_lastName,
		_extentionName,
		_birthdate,
		_dateRegistered,
		_contactNo,
		_emailAdd
	} =req.body;

	Faculty.findOne({username: username}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

			
		if( doc ){
			console.log(doc.password)
			console.log(_password)
			if( doc.password == _password ){

				doc.activity.push({message:'You updated your profile details', date: date})

				doc.username  = _username ?? doc.username;
				doc.firstName = _firstName ?? doc.firstName;
				doc.middleInitial = _middleInitial ?? doc.middleInitial;
				doc.lastName = _lastName ?? doc.lastName;
				doc.extentionName = _extentionName ?? doc.extentionName;
				doc.birthdate = _birthdate ?? doc.birthdate;
				doc.dateRegistered = _dateRegistered ?? doc.dateRegistered;
				doc.contactNo = _contactNo ?? doc.contactNo;
				doc.emailAdd = _emailAdd ?? doc.emailAdd;

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

app.get('/faculty/flist/activity/:username', async(req,res,next)=>{
	username = req.params.username

	const activity = []

	Faculty.findOne({username: username}, (err,doc)=>{
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

app.put('/faculty/flist/editstudent/:username/:studentNo',async (req,res,next)=>{
	const studentNo = req.params.studentNo;
	const username = req.params.username;

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();



	const {_password,_firstName, _middleInitial,_lastName, _extentionName, _birthdate,_course,_yearLevel,_section,_img } =req.body;

	Faculty.findOne({status:'active'}, (err,docs)=>{
		if (err) return res.status(503).json({ message: 'Server Error' })

		if (docs){
			console.log(docs)
			console.log(_password)
			console.log(docs.password)
			if(docs.password == _password){

				Student.findOne({studentNo: studentNo}, (err, doc) => {
					if(err)	return res.status(503).json({ message: 'Server Error' })

						
					if( doc ){			
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
							});	
					}
				});

				docs.activity.push({message:`You updated ${studentNo}'s details`, date: date})
				docs.save( err => {
					if(err)	return res.status(503).json({ message: 'Server Error' })
					
					return res.status(200).json({message:'Saved successfully'})
				});	
			}
			else{
				return res.status(400).json({ message: 'Password is incorrect' })
			}
		}


	})


	
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

app.put('/coordinator/clist/resetpass', async (req, res, next) =>{
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	const studentNo = req.params.studentNo

	Coordinator.findOne({status:'active'}, (err,docs)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(docs){
			console.log(docs)
			Faculty.findOne({status:'active'}, (err,doc)=>{
				if(err) return res.status( 503 ).json({ message: 'Server Error' });

				if(doc){
					doc.password = 'mis12345';
					doc.inbox.push({
						msg_id: uniqid(),
						message:`Coordinator had reset your password`, 
						date: date})

					doc.save( err=>{
						if(err) return res.status(503).json({message:'server error'});

						return res.status( 200 ).json({message: 'Reset to default password'});
					})
				}

				docs.activity.push({message:`You reset ${doc.username}'s password to default`, date: date})

				docs.save( err=>{
					if(err) return res.status(503).json({message:'server error'});
				})
			})
		}
	})
})

app.put('/coordinator/clist/remove-approved/:studentNo/:title', async (req,res,next)=>{
	const studentNo = req.params.studentNo;
	const title = req.params.title

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	const removed = req.body;


	

	Coordinator.findOne({status:'active'}, (err,doc)=>{
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		if(doc){

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
						})
					}
				}
				else{
					return res.status(503).json({message: 'server error'})
				}
			})

			console.log('doc')
			doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} removed ${studentNo}'s permission to access ${title}`, date: date})

			doc.save( err=>{
				if(err) return res.status(503).json({message:'server error'});

				return res.status(200).json({message: 'successfuly removed'})
			})

		}
	})
})

app.put('/coordinator/clist/clear-logs', async(req,res,next)=>{
	const username = req.params.username;

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	const archiveList = [];


	Coordinator.findOne({status:'active'}, (err, doc)=>{
		if(err) return res.sendStatus(503);

		if(doc){
			if(doc.activity.length){
				doc.activity.forEach( item=>{
					archiveList.push({id: uniqid(), message:item.message, date:item.date});
				})

				fs.readFile( coor_act_path, ( err, reqList ) => {
					if( err ) return res.sendStatus( 503 );


					const list = JSON.parse( reqList );

					archiveList.forEach(item =>{
						list.push( item );
					})

					fs.writeFile( coor_act_path, JSON.stringify( list, null, 4 ), ( err ) => {
						if( err ) return res.sendStatus( 503 );
					});
				});

				doc.activity.splice(0,doc.activity.length);
				doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} cleared his/her logs`, date: date})

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
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	const image = req.files.MISimg;

	const image_name = `client-pic-${new Date().getMilliseconds()}.png`
	const destination_path = path.join( images_path, image_name );

	console.log(image)

	const updateImage = ( docu ) => {
		docu.img = `/images/${image_name}`;
		docu.activity.push({message:`${docu.firstName} ${docu.middleInitial} ${docu.lastName} ${docu.extentionName ?? ''} updated their profile picture`, date: date})

		docu.save( err => {
		    if( err ) return res.sendStatus( 503 );

			image.mv( destination_path, async (err) => {
			    if( err ){
			    	return res.status( 503 );
			    }
			    else{
			    	return res.status( 200 ).json({ path: `/images/${image_name}`,message: 'Profile picture updated' });    
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

app.put('/coordinator/clist/clear-message/:username', async(req,res,next)=>{
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	
	const studentNo = req.params.username;


	Coordinator.findOne({status:'active'}, (err, doc)=>{
		if(err) return res.sendStatus(503);

		if(doc){
			if(doc.inbox.length){
				doc.inbox.splice(0,doc.inbox.length);
				doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} cleared your messages`, date: date})

				doc.save( err=>{
					if(err) return res.status(503).json({message:'server error'});

					return res.status(200).json({message:'cleared your inbox'});
				})
			}	
			else{
				return res.sendStatus(404)
			}
		}
	})
})

app.get('/coordinator/clist/inbox/:username', async(req,res,next)=>{
	username = req.params.username
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	const inbox = []

	Coordinator.findOne({username: username}, (err,doc)=>{
		if(err) return res.status(503).json({message: 'Server Error' })

		if(doc){
			if(doc.inbox.length){
				doc.inbox.forEach( async (item) =>{
					inbox.unshift(item);
				})

				return res.status(200).json({data:inbox})
			}
			else{
				return res.sendStatus(404)
			}
		}
	})
})

app.post('/coordinator/clist/register', async (req, res , next) =>{
	const coorData = req.body;

	const newCoor = new Coordinator(coorData);

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


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

				fs.readFile( coor_act_path, ( err, reqList ) => {
					if( err ) return res.sendStatus( 503 );


					const list = JSON.parse( reqList );

					const log = {message:`${coorData.firstName} ${coorData.middleInitial} ${coorData.lastName} ${coorData.extentionName ?? ''} is the new Coordinator`, date: date}
					
					list.push( log );


					fs.writeFile( coor_act_path, JSON.stringify( list, null, 4 ), ( err ) => {
						if( err ) return res.sendStatus( 503 );
					});
				});


				newCoor.save((err) => {
					if ( err ){
						return res.sendStatus(503);
					}

					saveTokens( token, () => {
						return res.status( 200 ).json({
						accessToken: accessToken,
						refreshToken: refreshToken,
						message: 'New coordinator successfuly registerd, now signing out'
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
			console.log('here1')
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

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	const checkMatch = ( doc , username ) => {
		
		if( doc.username == username ){
			doc.status = 'active';

			fs.readFile( coor_act_path, ( err, reqList ) => {
				if( err ) return res.sendStatus( 503 );


				const list = JSON.parse( reqList );

				const log = {message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} returned as the new Coordinator`, date: date}
				
				list.push( log );


				fs.writeFile( coor_act_path, JSON.stringify( list, null, 4 ), ( err ) => {
					if( err ) return res.sendStatus( 503 );
				});
			});

			doc.save( err => { // may message ako paps
				if(err) return res.status(400).json({message:'server error'})
			});
		}
	}

	const success = () => res.status(200).json({message:'Welcome new coordinator please re log in'});
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

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


	const {
		_username ,
		_password,
		_firstName,
		_middleInitial,
		_lastName,
		_extentionName,
		_birthdate,
		_emailAdd,
		_contactNo,
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
				doc.contactNo = _contactNo ?? doc.contactNo;
				doc.emailAdd = _emailAdd ?? doc.emailAdd;
				doc.dateRegistered = _dateRegistered ?? doc.dateRegistered;
				doc.img = _img ?? doc.img;

				doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} updated your profile`, date: date})
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

app.get('/coordinator/clist/activity/:username', async(req,res,next)=>{
	username = req.params.username

	const activity = []

	Coordinator.findOne({username: username}, (err,doc)=>{
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

app.put('/auth-admin/changepassword/:username', async(req,res,next)=>{
	const username = req.params.username;

	const data = await Coordinator.findOne({username: username});

	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();




	const { _currPassword, _newPassword, _verPassword} = req.body;
	const {password} = data;


	if(match(_newPassword, _verPassword)){
		Coordinator.findOne({username: username}, ( err,doc ) => {
			if( err ) {
				return res.status( 503 ).json({ message: 'Server Error' });
			}

			if(doc){
				if(doc.password == _currPassword){
					doc.password = _newPassword;

					doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} changed your password`, date: date})
					doc.save( err => {
						if(err)	return res.status(503).json({ message: 'Server Error' })
						
						return res.status( 200 ).json({ message: 'Saved successfully' });    
					});
				}
				else{
					return res.status( 403 ).json({ message: 'Incorrect password' });
				}				
			}

		})
	}
	else{
		return res.status(400).json({ message: 'Password does not match' })
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

app.get('/actlog-views', async ( req, res, next ) => {
	const data = req.body.data;

	fs.readFile( coor_act_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );

		const newList = []
		const list = JSON.parse(reqList);

		list.forEach(item=>{
			newList.unshift(item)
		})

		console.log(newList)

		return res.json({ reqViews: newList });
	});
});

app.get('/permissions/:id', async ( req, res, next ) => {
	const rID = req.params.id;
	const students=[];

	Student.find({},(err, doc)=>{
		if( err ) return res.sendStatus( 503 );

		if( doc ){
			doc.forEach(item=>{
				if(item.approved.map(elem => elem.id).includes(rID)){
					students.push(item)
				}
			})

			return res.status( 200 ).json({ data: students });
		}
	});

});


app.post('/request-view', async ( req, res, next ) => {
	const data = req.body.data;
	
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();	

	fs.readFile( req_view_path, ( err, reqList ) => {
		if( err ) return res.sendStatus( 503 );


		const list = JSON.parse( reqList );

		if( 
			list.length && 
			list.map( item => item.id ).includes( data.id ) &&
			list.map( item => item.studentID ).includes( data.studentID )
		 ){
			console.log('here 1');

			return res.sendStatus( 200 );
		}
		else if( !data ){
			console.log('here 2');

			return res.sendStatus( 200 );
		}

		list.push( data );
		console.log('here 3');

		fs.writeFile( req_view_path, JSON.stringify( list, null, 4 ), ( err ) => {
			if( err ) return res.sendStatus( 503 );

			console.log('here 4');
			return res.sendStatus( 200 );
		});
	});

	Coordinator.findOne({status:'active'},(err,doc)=>{
		if( err ) return res.sendStatus( 503 );

		if(doc){
			doc.inbox.push({
				msg_id: uniqid(),
				message:`There is a new research request from ${data.studentName}, please check your request list`, 
				date: date
			})

			doc.save(err=>{
				if( err ) return res.sendStatus( 503 );
			})
		}
	})
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
	const today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	Coordinator.findOne({status:'active'},(err,doc)=>{
		if(err) return res.status(503).json({message:'Server Error'})

		if(doc){
			doc.activity.push({message:`${doc.firstName} ${doc.middleInitial} ${doc.lastName} ${doc.extentionName ?? ''} cleared all requests`, date: date})
			
			fs.writeFile( req_view_path, JSON.stringify( [] ), err => {
				if(err) return res.status( 503 ).json({ message: 'Server Error' });
			});

			doc.save( err=>{
				if(err) return res.status(503).json({message:'server error'});
			})

			Student.find({},(err,docs)=>{
				docs.forEach(item=>{
					if(item.pending.length){
						item.pending.splice(0,item.pending.length)
					}

					item.save( err=>{
						if(err) return res.status(503).json({message:'server error'});
					})

					item.inbox.push({
						msg_id: uniqid(),
						message:`The coordinator cleared all research requests, your list of pending requested researches is now empty`, 
						date: date
					})
				})

			return res.status(200).json({message:'cleared all requests from the list'});

			})
		}
	})	
});



const match = (leftOp, rightOp) => leftOp === rightOp;
