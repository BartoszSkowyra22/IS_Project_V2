// /models/AddRecipe.js
const mongoose = require("mongoose");
const Joi = require("joi");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {type: String, required: true},
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const validateRecipe = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        category: Joi.string().required().label("Category"),
        ingredients: Joi.string().required().label("Ingredients"),
        instructions: Joi.string().required().label("Instructions"),
    });
    return schema.validate(data);
};

module.exports = { Recipe, validateRecipe };
