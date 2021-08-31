const mongoose = require('mongoose');
const {Schema} = mongoose;


const researchSchema = new Schema({
	title: String,
	course: String,
	researchCategories: String,// dito gumana lol sa student hindi
	yearSubmitted: String,
	PDFFile:{type:Buffer, contentType:String},
	status:String,
	favorites:String
})

const Research = mongoose.model('Research', researchSchema);

module.exports= Research;