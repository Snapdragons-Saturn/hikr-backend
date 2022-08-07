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

router.get('/regions/:region', async(req, res, next) =>{
    const region = req.params.region
    let hike = null;
    try{
        switch(region) { //does something based on what region equals, a pretty way for if/else, can scrap
            case "NE": //Northeast region
                hike = await Hike.find({"stateAbb": {$in: ["CT","ME","MD","MA","NH","NJ","NY","PA","RI","VT"]}})
                break;
            case "SA": //Southatlantic region
                hike = await Hike.find({"stateAbb": {$in: ["AL","DE","FL","GA","NC","SC","VA"]}})
                break;
            case "MW": //Midwest region
                hike = await Hike.find({"stateAbb": {$in: ["IL","IN","IA","KS","MI","MN","MS","NE","ND","OH","SD","WV","WI"]}})
                break; 
            case "SC"://South central region
                hike = await Hike.find({"stateAbb": {$in: ["AR","KY","LA","MO","OK","TN","TX"]}})
                break;
            case "M": //Mountain west region (M as MW taken, could be W for west)
                hike = await Hike.find({"stateAbb": {$in: ["AZ","CO","ID","MT","NV","NM","UT","WY"]}})
                break;
            case "PC": //Pacific region (Not PC for Pacific coast, but could be)
                hike = await Hike.find({"stateAbb": {$in: ["AK","CA","HI","OR","WA"]}})
                break;
            default:
                console.log("Bad call for region.")
                hike = await Hike.find({})
                break;
        }
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


router.put('/:id', async (req, res, next) => {
	try {
		const updatedHike = await Hike.findByIdAndUpdate(req.params.id, req.body, { new: true })

		if (updatedHike) {
			res.json(updatedHike)
		} else {
			res.sendStatus(404)
		}
	}
	catch (err) {
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