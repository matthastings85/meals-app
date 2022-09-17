const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const port = 8000;

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
