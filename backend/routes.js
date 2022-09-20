const express = require("express");
// const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const {
  createAndSaveUser,
  authenticateUser,
  findUserByEmail,
  findUserById,
} = require("./database");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
//   audience: "http://meals-app.matthastings.online/",
//   issuerBaseURL: `https://dev-hy08ntuo.us.auth0.com/`,
// });

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
    req.session.userId = data.id;
    res
      .status(200)
      .json({ error: false, message: "user successfully created", data });
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
    req.session.userId = data.id;
    res.status(200).json({ error: false, message: "user authenticated", data });
  });
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by Email Method
router.get("/get/:id", async (req, res) => {
  console.log("param: ", req.params.id);
  await findUserById(req.params.id, (err, data) => {
    console.log("find user: ", data);
    if (err) {
      return res.json({ error: true, message: "failed to get user info" });
    } else {
      if (data) {
        const { firstName, lastName, email, userId } = data;
        return res.status(200).json({
          error: false,
          message: "user found",
          user: { firstName, lastName, email, userId },
        });
      }
    }
  });
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
