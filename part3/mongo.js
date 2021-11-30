const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.PHONEBOOK_DB_URI;
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
   number: Number,
 })

 const Contact = mongoose.model('Contact', contactSchema)

//  const contact = new Contact({
//      firstName: process.argv[2],
//      lastName: process.argv[3],
//     number: process.argv[4],
// })

// contact.save()
//   .then(result => {
//     console.log(`Add ${process.argv[2]} ${process.argv[3]} ${process.argv[4]} to phonebook`);
//     mongoose.connection.close();
// })
 


Contact
  .find({})
  .then(result => {
    result.forEach(contact => {
      console.log(`${contact.firstName} ${contact.lastName} ${contact.number}`);
      })
    mongoose.connection.close()
 })