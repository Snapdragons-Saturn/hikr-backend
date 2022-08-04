const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
require('./connection')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//Listener 
app.listen(PORT, () => {
	console.log('Connection made on ' + PORT);
});

