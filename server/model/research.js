const mongoose = require('mongoose');
const {Schema} = mongoose;


const researchSchema = new Schema({
	title: String,
	course: String,
	researchCategories: String,
	yearSubmitted: {type: String, required: true},
	members: String,
	PDFFile: String,
	status: String,
	favorites: String
});

const Research = mongoose.model('Research', researchSchema);

module.exports= Research;