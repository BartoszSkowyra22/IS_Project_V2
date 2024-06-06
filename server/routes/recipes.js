// /routes/recipes.js
const router = require("express").Router();
const {Recipe, validateRecipe} = require("../models/recipe");

// Tworzenie nowego przepisu
router.post("/", async (req, res) => {
    try {
        const {error} = validateRecipe(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        const recipe = new Recipe(req.body);
        console.log(recipe)
        await recipe.save();
        res.status(201).send({message: "Recipe created successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

// Pobieranie wszystkich przepisów
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send({data: recipes});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

// Pobieranie jednego przepisu według ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send({message: "Recipe not found"});

        res.status(200).send({data: recipe});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

// Aktualizowanie przepisu według ID
router.put("/:id", async (req, res) => {
    try {
        const {error} = validateRecipe(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});

        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!recipe) return res.status(404).send({message: "Recipe not found"});

        res.status(200).send({message: "Recipe updated successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

// Usuwanie przepisu według ID
router.delete("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).send({message: "Recipe not found"});

        res.status(200).send({message: "Recipe deleted successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;
