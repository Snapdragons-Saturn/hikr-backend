const mongoose = require('../connection')
const Schema = mongoose.Schema


const HikesSchema = new Schema(
    {
        
    }
)

const Hike = mongoose.model("Hikes", HikesSchema)

module.exports = Hike