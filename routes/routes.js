const express = require("express");
const Model = require("../model/model");
const router = express.Router();

module.exports = router;

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by Name Method
router.get("/getByName/:name", async (req, res) => {
  try {
    const data = await Model.find({ name: req.params.name });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by Age Method
router.get("/getByAge/:age", async (req, res) => {
  try {
    const data = await Model.find({ age: req.params.age });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by name Method
router.patch("/update/:name", async (req, res) => {
  try {
    const name = { name: req.params.name };
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findOneAndUpdate(name, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:name", async (req, res) => {
  Model.deleteOne({ name: req.params.name });
  try {
    const data = await Model.deleteOne({ name: req.params.name });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:age", async (req, res) => {
  Model.deleteOne({ name: req.params.age });
  try {
    const data = await Model.deleteOne({ name: req.params.age });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
