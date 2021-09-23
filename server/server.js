const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const cors = require('cors');
const mongoose = require('mongoose');
const CircularJSON = require('circular-json');

const port = process.env.PORT || 7000;

const dbUri = 'mongodb://localhost/Research-ISdb'

// Models
const Student = require('./model/student');
const Research = require('./model/research');
const Faculty = require('./model/faculty');
const Coordinator = require('./model/coordinator');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

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



//Login

app.post('/sign-in', async(req,res,next)=>{
	const { _username, _password, _label } = req.body;

	console.log( _username, _password, _label );

	switch( _label ){
		case 'Student':
			Student.findOne({studentNo: _username, password:_password }, (err, doc) => {
				if( err ){
					console.log( err );
					return res.status( 401 ).json({ message: 'Unauthorized' });
				}

				console.log( doc );

				if( doc ){
					return res.status( 200 ).json({message: 'logged-in successfuly'});
				}
				return res.status( 401 ).json({message: 'Unauthorized'});					
			});
			break;
		case 'Adviser':
			Faculty.findOne({username:_username, password:_password, status: 'active'},  (err, doc) => {
				if( err ){
					console.log( err );
					return res.status( 401 ).json({ message: 'Unauthorized' });
				}

				if( doc ){
					return res.status( 200 ).json({message: 'logged-in successfuly'});
				}
				return res.status( 401 ).json({message: 'Unauthorized'});				
			});
			break;

		default:
			return res.status( 401 ).json({message: 'Unauthorized'});

	}
})

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
			console.log(doc);
			return res.status(200).json({data:`${doc.firstName} ${doc.middleInitial} ${doc.lastName}`, message:'user logged-in'})
		}
	})
})

// Student List
app.get('/student/slist', async (req, res, next) =>{
	const circularData = await Student.find({});
	const data = CircularJSON.stringify( circularData );

	return res.status( 200 ).json( JSON.parse(data) );
})


app.post('/student/slist/login', async (req, res, next)=>{

	Student.findOne({studentNo: _username, password: _password}, ( err, doc ) => {
		if( err ){
			console.log( err );
			return res.status( 401 ).json({message: 'Unauthorized'});
		}

		console.log( doc );



		return res.status( 200 ).json({message: 'logged-in successfuly'});

	})
})

app.put('/student/slist/update',async(req,res,next)=>{
	const editData = req.body;

	// console.log(  );
	console.log( editData );

	editData.forEach(async (elem) => {
		Student.findOneAndUpdate({_id: elem._id}, {status: elem.status}, null, ( err ) => {
			if( err ) {
				console.log( err );
				return res.status( 503 ).json({ message: 'Server Error' });
			}
		})
	})

	return res.status( 200 ).json({message: 'Updated successfully'});
})

app.put('/student/slist/changepassword/:studentNo',async(req,res,next)=>{
	const studentNo = req.params.studentNo;

	const data = await Student.findOne({studentNo: studentNo});
	console.log( data );

	const { password } = data;



	const { _currPassword, _newPassword, _verNewPassword} = req.body;

	if(match(password, _currPassword)){
		if(match(_newPassword, _verNewPassword)){
			Student.findOneAndUpdate({studentNo: data.studentNo}, {password: _newPassword}, {useFindAndModify : false}, ( err ) => {
				if( err ) {
					console.log( err );
					return res.status( 503 ).json({ message: 'Server Error' });
				}

				return res.status( 200 ).json({ message: 'Changed successfully' });

			})
		}
		else{
			return res.status(400).json({ message: 'Password does not match' })
		}
	}
	else{
		return res.status(400).json({ message: 'Password is incorrect' })
	}

		
})

app.put('/student/slist/favorites/:username',async(req,res,next)=>{ //san mo to tinatwag? StudentRlist
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

						console.log( favList );
					}

					if( index === data.favorites.length - 1){
						return res.status(200).json({data: favList})
					}
				})
			})


		}
	})
})



app.post('/student/slist/register', async (req, res , next) =>{
	// console.log(req.body);
	const studentData = req.body;

	const newStudent = new Student(studentData);

	Student.find({ studentNo: studentData.studentNo}, (err, doc) => {
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		console.log( doc );

		if( doc.length > 1 ){ 
			return res.status(400).json({message:'username already used'})
		}
		else{
			newStudent.save((err) => {
				if ( err ){
					console.log(err);
				}
			})

			return res.status(200).json({message:'successfuly registered'});
		}
		
	})
})


//Research List
app.get('/research/rlist', async (req, res, next) =>{
	const circularData = await Research.find({});
	const data = CircularJSON.stringify( circularData );

	return res.status( 200 ).json( JSON.parse(data) );
})

app.post('/research/rlist/upload', async (req, res , next) =>{
	// console.log(req.body);
	const researchData = req.body;

	const newResearch = new Research(researchData);
	newResearch.save((err) => {
		if ( err ){
			return res.status( 503 ).json({ message: 'Server Error' });
		}
	})

	return res.status( 200 ).json({message: 'Uploaded successfully'});
})


app.put('/research/rlist/update',async(req,res,next)=>{
	const editData = req.body;

	// console.log(  );
	console.log( editData );

	editData.forEach(async (elem) => {
		Research.findOneAndUpdate({_id: elem._id}, {status: elem.status}, null, ( err ) => {
			if( err ) {
				console.log( err );
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
	console.log(req.body);
	const facultyData = req.body;

	const newFaculty = new Faculty(facultyData);

	Faculty.find({ username: facultyData.username}, (err, doc) => {
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		console.log( doc );

		if( doc.length > 0 ){ // san yung part na nagaadd ka?
			return res.status(400).json({message:'username already used'})
		}
		else{
			newFaculty.save((err) => {
				if ( err ){
					console.log(err);
				}
			})

			return res.status(200).json({message:'successfuly registered'});
		}
		
	})
})

app.put('/faculty/flist/new-officer', async(req,res,next)=>{

	Faculty.findOne({status:'active'}, (err, docs) => {
		if( err ) return res.status(503).json({message:'server error'})
		console.log(docs)
		if( docs ){
				

			docs.status = 'inactive';

			docs.save( err => { // may message ako paps
				if(err) return res.status(400).json({message:'server error'})
			}); //try mo daw pa

			return res.status(200).json({message:'New active officer created, the previous officer is now deactivated'});
		}
	});
})

app.put('/faculty/flist/changeofficer/:username',async (req,res,next)=>{
	console.log(req.params.username);

	// yung username ano yon? ung username ng current kahit ba hindi na need yon? Wait so yung current dapat yung magiging active? inactive meron na siya request sa taas

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

		console.log( doc ); // try ulit paps
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

app.put('/faculty/flist/changepassword/:username',async(req,res,next)=>{
	const username = req.params.username;

	const data = await Faculty.findOne({username: username});
	console.log( data );



	const { _currPassword, _newPassword, _verNewPassword} = req.body;
	const { password } = data;

	if(match(password, _currPassword)){
		if(match(_newPassword, _verNewPassword)){
			Faculty.findOneAndUpdate({username: data.username}, {password: _newPassword}, {useFindAndModify : false}, ( err ) => {
				if( err ) {
					console.log( err );
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


app.put('/faculty/flist/editprofile/:username',async (req,res,next)=>{
	const username = req.params.username;

	console.log( req.body );	
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


	Faculty.findOne({username: username}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

			
		if( doc ){
			console.log( doc );
			if( match(doc.password, _password) ){
		
				doc.username  = _username ?? doc.username;
				doc.firstName = _firstName ?? doc.firstName;
				doc.middleInitial = _middleInitial ?? doc.middleInitial;
				doc.lastName = _lastName ?? doc.lastName;
				doc.extentionName = _extentionName ?? doc.extentionName;
				doc.birthdate = _birthdate ?? doc.birthdate;
				doc.dateRegistered = _dateRegistered ?? doc.dateRegistered;
				doc.img = _img ?? doc.img;


				// may nakalimutan pala ako WAHAHAH
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

app.put('/faculty/flist/editstudent/:username/:studentNo',async (req,res,next)=>{
	const studentNo = req.params.studentNo;
	const username = req.params.username;

	const facultyData = Faculty.findOne({username: username})

	console.log( req.body );	
	const {_password,_firstName, _middleInitial,_lastName, _extentionName, _birthdate,_course,_yearLevel,_section,_img } =req.body;
	const { password } = await Faculty.findOne({username: username}).exec();


	Student.findOne({studentNo: studentNo}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

			
		if( doc ){
			console.log( doc );
			console.log(password, _password)
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
app.get('/auth-admin/profile', async (req,res,next)=>{
	const circularData = await Coordinator.find({});
	const data = CircularJSON.stringify( circularData );


	return res.status( 200 ).json( JSON.parse(data) );
})

app.get('/auth-admin/profile/:username', async(req, res, next)=>{
	Coordinator.findOne({username: req.params.username}, (err, doc)=>{
		if(err){
			return res.status(400).json({message:'unknown user'})
		}
		if(doc){
			return res.status(200).json({data:`${doc.firstName} ${doc.middleInitial} ${doc.lastName}`, message:'user logged-in'})
		}
	})
})


app.post('/coordinator/clist/register', async (req, res , next) =>{
	// console.log(req.body);
	const coorData = req.body;

	console.log(coorData)
	const newCoor = new Coordinator(coorData);

	Coordinator.find({ username: coorData.username}, (err, doc) => {
		if(err) return res.status( 503 ).json({ message: 'Server Error' });

		console.log( doc );

		if( doc.length > 1 ){ 
			return res.status(400).json({message:'username already used'})
		}
		else{
			newCoor.save((err) => {
				if ( err ){
					console.log(err);
				}
			})

			return res.status(200).json({message:'successfuly registered'});
		}
		
	})
})

app.put('/coordinator/clist/new-admin/:username', async (req,res,next)=>{
	const current = req.params.username

	Coordinator.find({}, (err, docs) => {
		if( err ) return res.status(503).json({message:'server error'})

		if( docs ){
			docs.forEach( doc => {
				if( doc.username == req.params.username ){
					doc.status = 'inactive';

					doc.save( err => { // may message ako paps
						if(err) return res.status(400).json({message:'server error'})
					}); //try mo daw pa
				}
			});
			return res.status(200).json({message:'welcome new coordinator please re log in'});
		}
	});

	// Dahil siguro sa pagiging async nitong mga to wait
})

app.post('/auth-admin', async (req, res, next) => {
	const {_username, _password}=req.body;


	Coordinator.findOne({status: 'active' }, (err, doc) => {
		if( err ){
			console.log( err );
			return res.status( 401 ).json({ message: 'Unauthorized' });
		}

		console.log( doc );

		if( doc ){

			if(doc.username == _username){
				if(doc.password == _password){
					return res.status( 200 ).json({message: 'logged-in successfuly'});
				}
				else{
					return res.status( 401 ).json({message: 'Incorrect Password'});	
				}
			}
			else{
				return res.status( 401 ).json({message: 'Unauthorized'});	
			}
			
		}
		return res.status( 401 ).json({message: 'Unauthorized'});					
	});
});

app.put('/coordinator/clist/changecoor/:username',async (req,res,next)=>{
	console.log(req.params.username);

	// yung username ano yon? ung username ng current kahit ba hindi na need yon? Wait so yung current dapat yung magiging active? inactive meron na siya request sa taas

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

		console.log( doc ); // try ulit paps
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
 
	console.log( username );

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

	console.log(req.body)
	Coordinator.findOne({username: username}, (err, doc) => {
		if(err)	return res.status(503).json({ message: 'Server Error' })

		console.log(doc);
		if( doc ){
			console.log( doc );
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
	console.log( data );



	const { _currPassword, _newPassword, _verPassword} = req.body;
	const {password} = data;

	console.log(req.body)

	if(match(password, _currPassword)){
		console.log(password)
		console.log(_currPassword)
		console.log(_newPassword)
		console.log(_verPassword)
		if(match(_newPassword, _verPassword)){
			
			Coordinator.findOneAndUpdate({username: username}, {password: _newPassword}, {useFindAndModify : false}, ( err ) => {
				if( err ) {
					console.log( err );
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

const match = (leftOp, rightOp) => leftOp === rightOp;
