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
	sex: String,
	course:String,
	yearLevel: Number,
	section:String,
	dateRegistered:{type:Date,default:Date.now},
	img: String,
	favorites: Array,
	approved: Array,
	pending: Array,
	activity: Array,
	inbox: Array,
	status: String

})

const Student = mongoose.model('Students',studentSchema);

module.exports = Student; 