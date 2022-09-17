const express = require("express");
const { createAndSaveUser, authenticateUser } = require("./database");

const router = express.Router();

//New User
router.post("/newuser/post", async (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    marketing: req.body.marketing,
  };

  await createAndSaveUser(newUser, (err, data) => {
    if (err) return res.status(400).json({ error: true, message: err.message });
    res
      .status(200)
      .json({ error: false, message: "user successfully created" });
  });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(200)
      .json({ error: true, message: "Email & Password are required." });
  await authenticateUser(email, password, (err, data) => {
    if (err) return res.status(200).json({ error: true, message: err.message });
    res.status(200).json({ error: false, message: "user authenticated", data });
  });
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send(req.params.id);
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;
