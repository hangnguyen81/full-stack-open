const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const url = process.env.PHONEBOOK_DB_URI;

mongoose.connect(url)
    .then(result =>{
        console.log('Connect to MongoDB');
    })
    .catch(error => console.log('Cannot connect to MongoDB', error.message));

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required:true},
    lastName: {
        type:String,
        minlength:3,
        required: true,
    },
    number: {
        type: Number,
        minlength: 8,
        unique:true}
})

contactSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema);
