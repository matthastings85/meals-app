const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const cookieSession = require("cookie-session");
// const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const port = 8000;

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
//   audience: "http://meals-app.matthastings.online/",
//   issuerBaseURL: `https://dev-hy08ntuo.us.auth0.com/`,
// });

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(
  cookieSession({
    name: "meals-app-session",
    keys: ["sdhie893kx03gu8"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use("/api", routes);

app.get("/", (req, res) => {
  console.log(req.session.userId);
  res.json({ message: `hello world! This is your database speaking!` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
