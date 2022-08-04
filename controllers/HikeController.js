const express = require('express')
const router = express.Router();
const Hike = require('../models/Hike')

router.get('/', async(req, res, next) =>{
    try{
        const hikes = await Hike.find({})
        res.json(hikes)
    }catch(err){
        next(err)
    }
})

module.exports = router