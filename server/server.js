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

// Student List
app.get('/student/slist', async (req, res, next) =>{
	const circularData = await Student.find({});
	const data = CircularJSON.stringify( circularData );

	console.log(data);

	return res.status( 200 ).json( JSON.parse(data) );
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

	console.log(data);

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

//Faculty
app.get('/faculty/flist', async (req, res, next) =>{
	const circularData = await Faculty.find({});
	const data = CircularJSON.stringify( circularData );

	console.log(data);

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
