const express = require('express');
const Model = require('../model/model');
const router = express.Router()

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const dataToSave =await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll',async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by Name Method
router.get('/getByName/:name', async (req, res) => {
    try{
        const data = await Model.find({name:req.params.name});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by Age Method
router.get('/getByAge/:age', async (req, res) => {
    try{
        const data = await Model.find({age:req.params.age});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:name', async(req, res) => {
    console.log("delete name: " +req.params.name)
    Model.deleteOne({name:req.params.name})
    try{
        const data = await Model.deleteOne({name:req.params.name});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})