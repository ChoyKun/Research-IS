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
			Faculty.findOne({username:_username, password:_password},  (err, doc) => {
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
	Faculty.findOne({username: req.params.username}, (err, doc)=>{
		if(err){
			return res.status(400).json({message:'unknown user'})
		}
		if(doc){
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

	Student.findOne({studentNo: _studentNo, password: _password}, ( err, doc ) => {
		if( err ){
			console.log( err );
			return res.status( 401 ).json({message: 'Unauthorized'});
		}

		console.log( doc );



		return res.status( 200 ).json({message: 'logged-in successfuly'});

	})
})


app.post('/student/slist/register', async (req, res , next) =>{
	console.log(req.body);
	const studentData = req.body;

	const newStudent = new Student(studentData);
	newStudent.save((err) => {
		if ( err ){
			console.log(err);
		}
	})

	res.end();
})


//Research List
app.get('/research/rlist', async (req, res, next) =>{
	const circularData = await Research.find({});
	const data = CircularJSON.stringify( circularData );

	return res.status( 200 ).json( JSON.parse(data) );
})

app.post('/research/rlist/upload', async (req, res , next) =>{
	console.log(req.body);
	const researchData = req.body;

	const newResearch = new Research(researchData);
	newResearch.save((err) => {
		if ( err ){
			console.log(err);
		}
	})

	res.end();
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
	newFaculty.save((err) => {
		if ( err ){
			console.log(err);
		}
	})

	res.end();
})


// Admin
app.get('/auth-admin/profile', async (req,res,next)=>{
	const admin_path = path.join(__dirname,'data/auth-admin.json');

	fs.readFile(admin_path,(err,data)=>{
		if(err){
			console.log(err);
			return res.status(404).json({ message: 'file not found'});
		}

		return res.status(200).json({data: JSON.parse(data) ,message:'kahit ano'})
	})
})

app.post('/auth-admin', async (req, res, next) => {
	const admin_path = path.join(__dirname, 'data/auth-admin.json');

	fs.readFile(admin_path, (err, data) => {
		if( err ){
			return res.status(401).json({message: 'file not found'});
		}

		const { username , password } = JSON.parse(data);
		const { _username, _password } = req.body;

		if(match(username, _username)){
			if(match(password, _password)){
				return res.status(200).json({ message: 'Logged in successfully' });
			}
			else{
				return res.status(400).json({ message: 'password is incorrect' })
			}
		}
		else{
			return res.status(400).json({ message: 'username is incorrect' })
		}

		// return res.status(200).json( JSON.parse(data) );
	});
});


const match = (leftOp, rightOp) => leftOp === rightOp;
