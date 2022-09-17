const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  marketing: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

const createAndSaveUser = async (userObj, done) => {
  await findUserByEmail(userObj.email, (err, data) => {
    if (err) return console.error(err);
    if (data) {
      return done({ message: "A user with this email already exists" }, null);
    }

    bcrypt.hash(userObj.password, 10, function (err, hash) {
      if (err) return console.error(err);

      // Store hash in your password DB.
      const newUser = new User({
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        password: hash,
        marketing: userObj.marketing,
      });

      newUser.save((err, data) => {
        if (err) {
          done(err, null);
        } else {
          done(null, data);
        }
      });
    });
  });
};

const findUserByEmail = async (email, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err, null);
    console.log("user exists: ", true);
    done(null, user);
  });
};

// findUserByEmail("test@gmail.com", (err, data) => {
//   if (err) return console.error(err);
//   console.log("found: ", data);
// });

const authenticateUser = async (email, password, done) => {
  await findUserByEmail(email, (err, data) => {
    if (err) return console.error(err);

    // compare password
    bcrypt.compare(password, data.password, function (err, result) {
      if (err) return console.error(err);
      const { firstName, lastName, email } = data;
      result
        ? done(null, { firstName, lastName, email })
        : done({ message: "Password doesn't match" }, null);
    });
  });
};

const removeUserByEmail = (email, done) => {
  User.deleteOne({ email: email }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// removeUserByEmail("test@test.com", (err, data) => {
//   if (err) return console.error(err);
//   console.log("removed: ", data);
// });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connected to mongoDB");
    },
    (err) => {
      console.log(err);
    }
  );

exports.createAndSaveUser = createAndSaveUser;
exports.authenticateUser = authenticateUser;
