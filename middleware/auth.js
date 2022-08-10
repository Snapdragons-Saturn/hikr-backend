const passport = require('passport'); //this is for tokenization
const bcrypt = require('bcrypt'); //this is for hashing
const jwt = require('jsonwebtoken'); //this is a "strategy" for user state

const User = require('../models/User'); //dependency for association

// Defines our hashing keyword, this is the "scrambler"
//Should be kept in process. Very important this is private
//Note: We have to define this by passing to Heroku, I did this for other stuff, not doing it yet but message me if here
const secret = process.env.JWT_SECRET;

// Require the specific `strategy` we'll use to authenticate
// Defines method that will handle extracting the token
const { Strategy, ExtractJwt } = require('passport-jwt');

// Describes how passport should "get" the token
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

// strategies are method from passport module
//have to pass some args to define middleware
const strategy = new Strategy(opts, function (jwt_payload, done) {

    //note this is the user id (the token gave us this information)
    //we are finding this particular homie in our database
	User.findById(jwt_payload.id) 
        // Note user to request object becomes request.user (Don't understand, just noting that I don't)
        //null is because first param to done is error, 
		.then((user) => done(null, user))
        //errors get thrown to express
		.catch((err) => done(err));
});

//We are "registering" our strategy here for passport, the big dog, to use
passport.use(strategy);

//Fire up passport
passport.initialize();

// requiretoken holds the authenticate method that we can export to use in our routes
const requireToken = passport.authenticate('jwt', { session: false });

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
    //For success, we check:
    //1) That we have received an email that matches a user in our database
    //2) That we have received a password that correlates (post b-crypt hashing) with the password of that user in database
    //Quick note: We don't say whether or not an email exists or not, or just password error, keeps it safer
	
    if ( //the below wants to believe you shouldn't be able to log in if these are met
		!user ||
		!req.body.password ||
		!bcrypt.compareSync(req.body.password, user.password) //this is bcrypt hashing the passed password then comparing
	) {
		const err = new Error('Your submitted credentials appear to be insufficient.');
		err.statusCode = 422; //Signifies that it was a well-formed request (e.g. good format), but not much more
		throw err;
	}
    //otherwise, we will return a token. Notice it expires in 36k, which I believe is one hour
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

//we need to export both:
//1) A requiretoken that plays bouncer on controller action functions (put, post, get, delte, etc.)
//2) A way of creating a user token for their use during their sesh
module.exports = {
	requireToken,
	createUserToken,
};

