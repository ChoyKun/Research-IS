const mongoose = require('mongoose');
const {Schema} = mongoose;

const coordinatorSchema= new Schema({
	username: String,
	password:String,
	firstName:String,
	middleInitial:String,
	lastName:String,
	extentionName:String,
	birthdate:{type:Date},
	dateRegistered:{type:Date, default:Date.now},
	img:{type:Buffer,contentType:String},
	status: String
})

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);



module.exports = Coordinator;