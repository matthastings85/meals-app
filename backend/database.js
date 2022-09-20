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
  recipies: [],
  list: [],
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
          console.log(data);
          const { firstName, lastName, email, id } = data;

          done(null, { firstName, lastName, email, id });
        }
      });
    });
  });
};

const findUserById = async (id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err, null);
    if (user) console.log("user exists: ", true);
    done(null, user);
  });
};

// findUserById("63299a5fa0cb726d740a6e00", (err, data) => {
//   if (err) return console.error(err);
//   console.log("found: ", data);
// });

const findUserByEmail = async (email, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err, null);
    if (user) console.log("user exists: ", true);
    done(null, user);
  });
};

// findUserByEmail("matthastings85@gmail.com", (err, data) => {
//   if (err) return console.error(err);
//   console.log("found: ", data);
// });

const authenticateUser = async (email, password, done) => {
  await findUserByEmail(email, (err, data) => {
    if (err) return console.error(err);

    if (!data)
      return done({ message: "A user with this email does not exists" }, null);

    // compare password
    bcrypt.compare(password, data.password, function (err, result) {
      if (err) return console.error(err);
      console.log(data);
      const { firstName, lastName, email, id } = data;
      result
        ? done(null, { firstName, lastName, email, id })
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

removeUserByEmail("matthastings85@gmail.com", (err, data) => {
  if (err) return console.error(err);
  console.log("removed: ", data);
});

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
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
