const { Recipe, Ingredient } = require("../db/models");

// fetch is not a controller just a function
exports.fetchRecipe = async (recipeId, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeId);
    return foundRecipe;
  } catch (error) {
    next(error);
  }
};

//Recipe List

exports.recipeList = async (req, res, next) => {
  try {
    const _recipes = await Recipe.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
      },
    });
    res.json(_recipes);
  } catch (error) {
    next(error);
  }
};

// exports.recipeCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }

//     const newRecipe = await Recipe.create(req.body);
//     res.status(201).json(newRecipe);
//   } catch (error) {
//     next(error);
//   }
// };
