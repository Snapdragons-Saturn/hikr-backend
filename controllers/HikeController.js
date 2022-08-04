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

router.get('/:id', async(req, res, next) =>{
    try{
        const hike = await Hike.findById(req.params.id)
        res.json(hike)
    }catch(err){
        next(err)
    }
})
router.post('/', async (req, res, next) => {
    try{
        const newHike = await Hike.create(req.body)
        res.status(201).json(newHike)
    } catch(err){
        next(err)
    }
})
router.delete('/:id', async(req, res, next) => {
    try{
        const deletedHike = await Hike.findByIdAndDelete(req.params.id)
        res.json(deletedHike)
    } catch(err){
        next(err)
    }
})
module.exports = router