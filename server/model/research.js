const mongoose = require('mongoose');
const {Schema} = mongoose;


const researchSchema = new Schema({
	title: String,
	course: String,
	researchCategories: String,
	yearSubmitted: String,
	lead: String,
	mem1: String,
	mem2: String,
	mem3: String,
	mem4: String,
	PDFFile: String,
	status: String,
	favorites: String
});

const Research = mongoose.model('Research', researchSchema);

module.exports= Research;