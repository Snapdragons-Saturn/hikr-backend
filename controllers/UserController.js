const express = require('express'); //
const User = require('../models/User'); 
const router = express.Router();

//only these ~two~ aren't boilerplate for what we've done so far
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

//A couple decisions. Do we want to include signup as an option on the signin page? That seems pretty standard
//We could also just have different pages for different locations, but might be good to subsection signup on signin

//Route to signing up page. Not sure how we want to route this, will need to interface with tom
router.post('/signin/signup', async (req, res, next) => { //Note my comment above, assuming new user goes to signin then other page
	try {
		const password = await bcrypt.hash(req.body.password, 10); //creating password with specific hash
        //Note! Do not change the second argument to above once we seed. Like really, really. Relates to hashing
		const user = await User.create({ email: req.body.email, password });
        //we create our user
		return res.status(201).json(user);
	} 
	catch (error) {
		return next(error);
	}
  });

//Sign back in, NOT sign up. See line 9-10 on architecture thoughts
router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		//either we catch a juicy error or create a token
		.then((token) => res.json({ token }))
		.catch(next);
});

module.exports = router; //standard bolerplate