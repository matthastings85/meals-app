const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

// User Schemas & Methods

const favoriteRecipeSchema = new Schema({
  source: { type: String, required: true },
  recipe: { type: Object, required: true },
});

const FavoriteRecipe = mongoose.model("FavoriteRecipe", favoriteRecipeSchema);

const mealPlanSchema = new Schema({
  startDate: { type: String, required: true },
  length: { type: Number, required: true },
  plan: { type: Array, required: true },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  marketing: { type: Boolean, required: true },
  recipes: [favoriteRecipeSchema],
  lists: [String],
  mealPlans: [String],
});

const User = mongoose.model("User", userSchema);

// User Methods --------------------------------------------------------------
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
          const { firstName, lastName, email, id, recipes, lists } = data;

          done(null, { firstName, lastName, email, id, recipes, lists });
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
      const { firstName, lastName, email, id, recipes, lists } = data;
      result
        ? done(null, { firstName, lastName, email, id, recipes, lists })
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

// removeUserByEmail("matthastings85@gmail.com", (err, data) => {
//   if (err) return console.error(err);
//   console.log("removed: ", data);
// });

// Recipe Schemas & Methods ----------------------------------------------------------

const ingredientSchema = new Schema({
  ingredientName: { type: String, required: true },
  quantity: Number,
  unit: String,
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

const recipeSchema = new Schema({
  recipeDetails: {
    recipeName: { type: String, required: true },
    prepTime: Number,
    cookTime: Number,
    serves: Number,
  },
  ingredients: [ingredientSchema],
  instructions: [String],
});

const linkRecipeSchema = new Schema({
  recipeName: { type: String, required: true },
  recipeLink: { type: String, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const LinkRecipe = mongoose.model("LinkRecipe", linkRecipeSchema);

const createAndSaveRecipe = async ({ recipe, userId }, done) => {
  const newRecipe = new Recipe(recipe);
  newRecipe.save(async (err, data) => {
    if (err) {
      done(err, null);
    } else {
      console.log("Recipe ID: ", data.id);

      // Add Recipe to user
      const user = await User.findById(userId);
      console.log("found: ", user);
      user.recipes.push(data.id);

      await user.save();
      console.log("upadate: ", user);
      done(null, data);
    }
  });
};
const createAndSaveLinkRecipe = async ({ recipe, userId }, done) => {
  const newRecipe = new LinkRecipe(recipe);
  newRecipe.save(async (err, data) => {
    if (err) {
      done(err, null);
    } else {
      console.log("Recipe ID: ", data.id);

      // Add Recipe to user
      const user = await User.findById(userId);
      console.log("found: ", user);
      user.recipes.push(data.id);

      await user.save();
      console.log("upadate: ", user);
      const recipes = user.recipes;
      done(null, { ...data, recipes });
    }
  });
};

const addFavoriteRecipe = async ({ recipe, source, userId }, done) => {
  const newFavorite = new FavoriteRecipe({ source, recipe });
  newFavorite.save(async (err, data) => {
    if (err) {
      done(err, null);
    } else {
      // console.log("Recipe ID: ", data.id);

      // Add Recipe to user
      const user = await User.findById(userId);
      // console.log("found: ", user);
      user.recipes.push(data);

      user.markModified("recipes");
      await user.save();
      // console.log("updated: ", user);
      const recipes = user.recipes;
      done(null, { ...data, recipes });
    }
  });
};

const removeRecipeById = (id, done) => {
  Recipe.deleteOne({ id: id }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};
const removeLinkRecipeById = (id, done) => {
  LinkRecipe.deleteOne({ id: id }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// removeRecipeById("6330d452e37cb06aa5449995", (err, data) => {
//   if (err) return console.error(err);
//   console.log("removed: ", data);
// });
// removeLinkRecipeById("6330d8df71c827bf13fc1eb2", (err, data) => {
//   if (err) return console.error(err);
//   console.log("removed: ", data);
// });

// List Schema -------------------------------------------------------------------

const listSchema = new Schema({
  mealPlanId: { type: String, required: true },
  list: [],
});

const List = mongoose.model("List", listSchema);
// List Methods -------------------------------------------------------------------
const createAndSaveList = async ({ list, userId, mealPlanId }, done) => {
  const newList = new List({ mealPlanId, list });
  newList.save(async (err, data) => {
    if (err) {
      done(err, null);
    } else {
      // Add list to user
      const user = await User.findById(userId);
      // console.log("found: ", user);
      user.lists.push(data.id);

      user.markModified("lists");
      await user.save();
      console.log("user Saved: ", user);

      const {
        firstName,
        lastName,
        email,
        marketing,
        recipes,
        lists,
        mealPlans,
      } = user;

      done(null, {
        listId: data.id,
        user: {
          firstName,
          lastName,
          email,
          marketing,
          recipes,
          lists,
          mealPlans,
        },
      });
    }
  });
};

// Meal Plan Methods --------------------------------------------------------------
const createAndSaveMealPlan = async ({ mealPlan, userId }, done) => {
  const newMealPlan = new MealPlan(mealPlan);
  newMealPlan.save(async (err, data) => {
    if (err) {
      done(err, null);
    } else {
      // console.log("meal plan: ", data);

      // Add meal plan to user
      const user = await User.findById(userId);
      // console.log("found: ", user);
      user.mealPlans.push(data.id);

      user.markModified("mealPlans");
      await user.save();
      // console.log("user Saved: ", user);

      const {
        firstName,
        lastName,
        email,
        marketing,
        recipes,
        lists,
        mealPlans,
      } = user;

      done(null, {
        mealPlanId: data.id,
        user: {
          firstName,
          lastName,
          email,
          marketing,
          recipes,
          lists,
          mealPlans,
        },
      });
    }
  });
};

const updateMealPlan = async ({ recipe, index, mealPlanId }, done) => {
  console.log("mealplanid: ", mealPlanId);
  const mealPlan = await MealPlan.findById(mealPlanId);
  console.log("found: ", mealPlan);
  mealPlan.plan[index].recipe = recipe;

  mealPlan.markModified("plan");
  await mealPlan.save();
  console.log("Meal Plan Saved: ", mealPlan);

  done(null, mealPlan);
};

const findMealPlanById = async (id, done) => {
  MealPlan.findById(id, (err, mealPlan) => {
    if (err) return done(err, null);
    if (mealPlan) console.log("mealPlan exists: ", true);
    done(null, mealPlan);
  });
};

const removeMealPlanById = (id, done) => {
  MealPlan.deleteOne({ id: id }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// findMealPlanById("63396eb4fe10f34305407e3f", (err, data) => {
//   if (err) return console.error(err);
//   console.log("found: ", data);
// });

// removeMealPlanById("6339673406f58419e1a822d2", (err, data) => {
//   if (err) return console.error(err);
//   console.log("removed: ", data);
// });

// updateMealPlan(
//   {
//     recipe: { recipe: "here you go" },
//     index: 2,
//     mealPlanId: "6339673406f58419e1a822d2",
//   },
//   (err, data) => {
//     if (err) return console.log({ error: true, message: err.message });

//     return console.log(data);
//   }
// );

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
exports.createAndSaveRecipe = createAndSaveRecipe;
exports.createAndSaveLinkRecipe = createAndSaveLinkRecipe;
exports.addFavoriteRecipe = addFavoriteRecipe;
exports.createAndSaveMealPlan = createAndSaveMealPlan;
exports.updateMealPlan = updateMealPlan;
exports.findMealPlanById = findMealPlanById;
exports.createAndSaveList = createAndSaveList;
