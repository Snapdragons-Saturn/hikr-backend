const mongoose = require('../connection')
const Schema = mongoose.Schema


const HikeSchema = new Schema(
    {
        hikeID: String, //Should be unique for each unique. We may get another unique key regardless from mongo
        stateAbb: String, //Two-letter abbreviation of state, replaces region - See commentary, still going to make regions
        datetimeAdd: Number, //Unix Epoch time, will look funny as hell. Number of milliseconds since 1970ish
        hikeName: String, //Name of hike
        hikeDesc: String, //Longer string description of hike provided by user
        hikeDiff: String, //Difficulty selected from very easy to very hard, 5 values
        hikeLen: Number, //User input number of miles, should be capped at two decimal places
        img_url: String,// Provide an image of the hike to be rendered on the front end
        hkeTerrain: String, //User input on terrain, probably should be open typing, not choice between given options
        userID: Number //Included with stretch goals in mind, just a random number between 1-8 for development

        //Key notes: This will be an object, mongo should generate a unique id for user, so we should get the "__v" for user
        // userID: { //Imagine from now we should be thinking of login as necessary for C in CRUD
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true
        // }
        
    }
)

const Hike = mongoose.model("Hike", HikeSchema)

module.exports = Hike