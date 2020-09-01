const router = require('express').Router()
const Entry = require('../models/Entry')

router.get('/', async (req,res) => {
    try {
        const listEntries = await Entry.find()
        res.json(listEntries)
    } catch (error) {
        next(error)
    }
    
})

router.post('/', async (req, res, next) => {

    try {
        if( req.get('X-PASSWORD') !== (process.env.PASSWORD || 'maper01')) {
            console.log(PASSWORD)
            res.status(401)
            throw new Error('UnAuthorized, enter valid Password Key');
        }
        const newEntry = new Entry(req.body)
        const createdEntry = await newEntry.save()
        res.json(createdEntry)

    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(422)
        }
        next(error)
    }

})

router.delete('/remove/:id', async (req, res, next) => {

    const id = req.params.id;
    
    try {
        const deletedEntry = await Entry.deleteOne({_id: id})
        res.json((deletedEntry))
    } catch (error) {
        res.status(404).json({
            error: error
        });
        next(error)
    }
  });

router.put('/update/:id', async (req,res, next) => {

    const id = req.params.id

    try {
        if( req.get('X-PASSWORD') !== (process.env.PASSWORD || 'maper01')) {
            res.status(401)
            throw new Error('UnAuthorized, enter valid Password Key');
        }
        
        const updatedEntry = await Entry.findOne({_id: id})

        req.body.description === "" ? updatedEntry.description :updatedEntry.description = req.body.description
        req.body.rating === "" ?  updatedEntry.rating : updatedEntry.rating = req.body.rating 
        req.body.visitDate === "" ?  updatedEntry.visitDate : updatedEntry.visitDate = req.body.visitDate 
        req.body.image === "" ? updatedEntry.image :updatedEntry.image = req.body.image 

        const newUpdatedEntry = await updatedEntry.save()
        res.json(newUpdatedEntry)

    } catch (error) {
        res.status(400)
        next(error)
    }
})


module.exports = router