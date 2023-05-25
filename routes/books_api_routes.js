const express = require("express");
const Model = require("../model/books_model");
const AuthorModel = require("../model/author_model");
const UserModel = require("../model/user_model");
const { generateRandomString } = require("../utils/utils");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user_model = require("../model/user_model");
const { authenticateJWT } = require("../middleware/token_authentication");
const { Constants } = require("../utils/constants");
module.exports = router;

//Register User
router.post("/RegisterUser", async (req, res) => {
  const data = new UserModel({
    id: generateRandomString(20),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    pic: req.body.pic,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json({
      data: dataToSave,
      statusCode: 200,
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(400).json({ data: {}, statusCode: 400, message: error.message });
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (user) {
      const result = req.body.password === user.password;

      let token;
      try {
        //Creating jwt token
        token = jwt.sign(
          { userId: user.id, email: user.email },
          Constants.secretKey,
          { expiresIn: "2 days" }
        );
      } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
      }
      if (result) {
        res.status(200).json({
          message: "User Login Successfully",
          statusCode: 200,
          data: {
            id: user.id,
            email: user.email,
            token: token,
            name: user.name,
            pic: user.pic,
          },
        });
      } else {
        res.status(400).json({
          message: "Password doesn't match",
          statusCode: 400,
          data: {},
        });
      }
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "User doesn't exist",
        data: {},
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ statusCode: 400, message: "Error in Authentication", data: {} });
  }
});
//Post Method
router.post("/AddBook", async (req, res) => {
  const data = new Model({
    id: "" + Math.random() + Math.random(),
    title: req.body.title,
    about: req.body.about,
    url: req.body.url,
    author: req.body.author,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Add Author
router.post("/AddAuthor", async (req, res) => {
  const data = new AuthorModel({
    name: req.body.name,
    pic: req.body.pic,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get Author
router.get("/getAllAuthors", async (req, res) => {
  try {
    const data = await AuthorModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get Single Author
router.get("/getAuthor", async (req, res) => {
  try {
    const data = await AuthorModel.find({ name: req.params.name });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get all Method
router.get("/getAllBooks", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by Name Method
router.get("/getByTitle/:name", async (req, res) => {
  try {
    const data = await Model.find({ title: req.params.name });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by Author Method
router.get("/getByAuthor/:author", async (req, res) => {
  try {
    const data = await Model.find({ author: req.params.author });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by name Method
router.patch("/update/:name", async (req, res) => {
  try {
    const name = { title: req.params.name };
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findOneAndUpdate(name, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by name Method
router.delete("/delete/:name", async (req, res) => {
  try {
    const data = await Model.deleteOne({ title: req.params.name });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:author", async (req, res) => {
  try {
    const data = await Model.deleteOne({ author: req.params.author });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Verify Token
router.post("/verifyToken", async (req, res) => {
  try {
    jwt.verify(req.body.token, Constants.secretKey, function (err, decoded) {
      if (err) {
        res.status(400).json({
          success: false,
          message: "Token expired",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Token verified.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//updateProfile
router.put("/updateProfile/:id", authenticateJWT, async (req, res) => {
  try {
    let id = req.params.id;
    let email = req.body.email;
    let name = req.body.name;
    var data = {};
    if (req.body != null) {
      if (email != "" && name != "") {
        data = { email: email, name: name };
      } else if (email == "" && name != "") {
        data = { name: name };
      } else if (email != "" && name == "") {
        data = { email: email };
      }
      const options = { new: true };
      const response = await user_model.findOneAndUpdate(id, data, options);
      if (response) {
        res.status(200).json({ message: "Data Updated", data: response });
      } else if (!response) {
        res.status(400).json({ message: "Error in updating data", data: {} });
      } else {
        res.status(400).json({ message: "Error in updating data", data: {} });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/logout", authenticateJWT, (req, res) => {
  console.log(req.session);
  if (!req.session) {
    return res.status(401).json({ message: "Not logged in" });
  } else {
    req.session.destroy();
    res.status(200).json({ message: "Logout successfully" });
  }
});
