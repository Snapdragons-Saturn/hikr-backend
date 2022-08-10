//Basic Config
const express = require('express');
const app = express();

const cors = require('cors');
const PORT = process.env.PORT || 8080;
require('./connection')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes 


const hikeController = require('./controllers/HikeController')
app.use('/api/hikes', hikeController)


const userController = require('./controllers/UserController');
app.use('/api', userController);



//Listener 
app.listen(PORT, () => {
	console.log('Connection made on ' + PORT);
});

