const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//Listener 
app.listen(4000, () => {
	console.log('Connection made');
});

