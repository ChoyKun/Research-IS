const mongoose = require('mongoose');
const { Schema } = mongoose;


const studentSchema = new Schema({
	studentNo: {type:String, required:true},
	password: String,
	firstName: String,
	middleInitial: String,
	lastName:String,
	extentionName:String,
	birthdate:{type: Date},
	course:String,
	yearLevel:String,
	section:String,
	dateRegistered:{type:Date,default:Date.now},
	img:{type: Buffer, contentType: String }

})

const Student = mongoose.model('Students',studentSchema);

module.exports = Student; 