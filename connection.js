
require('dotenv').config();
const mongoose = require('mongoose');

// Mongo URL and Connection
console.log("here")
const mongoURI = process.env.DATABASE_URL;
console.log(process.env.DATABASE_URL)
console.log("there")
const db = mongoose.connection;
console.log("asdfasdf")
// Connect to Mongo
mongoose.connect(mongoURI);

// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Open the Connection
db.on('open', () => {
	console.log('✅ mongo connection made!');
});
// now, our mongoose instance has a configured connection to our local db, in addition
// to its model configuration
module.exports = mongoose;
