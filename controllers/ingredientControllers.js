const { Ingredient, Recipe } = require("../db/models");

// fetch is not a controller just a function
exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    return foundIngredient;
  } catch (error) {
    next(error);
  }
};

//Ingredient List

exports.ingredientList = async (req, res, next) => {
  try {
    const _ingredients = await Ingredient.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Recipe,
        as: "recipes",
        attributes: ["id"],
      },
    });
    res.json(_ingredients);
  } catch (error) {
    next(error);
  }
};

// exports.ingredientCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newIngredient = await Ingredient.create(req.body);
//     res.status(201).json(newIngredient);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.recipeCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     req.body.recipeId = req.Ingredient.id;
//     const newRecipe = await Recipe.create(req.body);
//     res.status(201).json(newRecipe);
//   } catch (error) {
//     next(error);
//   }
// };
