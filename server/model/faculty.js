const mongoose = require('mongoose');
const {Schema} = mongoose;

const facultySchema= new Schema({
	username: String,
	password:String,
	firstName:String,
	middleInitial:String,
	lastName:String,
	extentionName:String,
	birthdate:{type:Date},
	dateRegistered:{type:Date, default:Date.now},
	img:{type:Buffer,contentType:String}
})

const Faculty = mongoose.model('Faculty', facultySchema);



module.exports = Faculty;