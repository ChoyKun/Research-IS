const mongoose = require('mongoose');
const {Schema} = mongoose;


const researchSchema = new Schema({
	title: String,
	course: String,
	researchCategories: String,
	yearSubmitted: String,
	PDFFile:{type:Buffer, contentType:String}
})

const Research = mongoose.model('Research', researchSchema);

module.exports= Research;