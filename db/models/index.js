"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Reations

db.Category.hasMany(db.Ingredient, {
  foreignKey: "categoryId",
  as: "ingredients",
});

db.Ingredient.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "category",
});

// const ingredientRecipe = sequelize.define("ingredientRecipe", {
//   id: {
//     type: Sequelize.DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
// });
// db.Ingredient.belongsToMany(db.Recipe, {
//   foreignKey: "recipeId",
//   as: "recipes",
//   through: ingredientRecipe,
// });
// db.Recipe.belongsToMany(db.Ingredient, {
//   foreignKey: "ingredientId",
//   as: "ingredient",
//   through: ingredientRecipe,
// });
// ingredientRecipe.belongsTo(db.Recipe);
// ingredientRecipe.belongsTo(db.Ingredient);
// db.Recipe.hasMany(ingredientRecipe);
// db.Ingredient.hasMany(ingredientRecipe);

// // The Super Many-to-Many relationship
// // db.Ingredient.belongsToMany(db.Recipe, { through: "ingredientRecipe" });
// // db.Recipe.belongsToMany(db.Ingredient, { through: "ingredientRecipe" });
// // db.Ingredient.hasMany("ingredientRecipe");
// // "ingredientRecipe".belongsTo(db.Ingredient);
// // db.Recipe.hasMany("ingredientRecipe");
// // "ingredientRecipe".belongsTo(db.Recipe);

// // M-M
// // db.Ingredient.belongsToMany(
// //   db.Recipe,
// //   { foreignKey: "recipeId", as: "recipe" ,
// //   { through: "ingredientRecipe" }
// // );

// // db.Recipe.belongsToMany(
// //   db.Ingredient,
// //   { foreignKey: "ingredientId", as: "ingredient" },
// //   { through: "ingredientRecipe" }
// // );

module.exports = db;
