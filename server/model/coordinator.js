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
	contactNo:String,
	emailAdd:String,
	img: String,
	activity: Array,
	inbox: Array,
	status: String
})

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);



module.exports = Coordinator;