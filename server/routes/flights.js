// /routes/flights.js
const router = require("express").Router();
const { Flight, validateFlight } = require("../models/flight");

// Tworzenie nowego lotu
router.post("/", async (req, res) => {
    try {
        const { error } = validateFlight(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const flight = new Flight(req.body);
        console.log(flight);
        await flight.save();
        res.status(201).send({ message: "Flight created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Pobieranie wszystkich lotów
router.get("/", async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).send({ data: flights });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Pobieranie unikalnych wartości dla pól filtrowania
router.get("/filters", async (req, res) => {
    try {
        const destCityNames = await Flight.distinct("DestCityName");
        const originCityNames = await Flight.distinct("OriginCityName");
        const flightDelayTypes = await Flight.distinct("FlightDelayType");
        res.status(200).send({ destCityNames, originCityNames, flightDelayTypes });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Pobieranie jednego lotu według ID
router.get("/:id", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        console.log(flight)
        if (!flight) return res.status(404).send({ message: "Flight not found" });
        res.status(200).send({ data: flight });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Aktualizowanie lotu według ID
router.put("/:id", async (req, res) => {
    try {
        const { error } = validateFlight(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!flight) return res.status(404).send({ message: "Flight not found" });

        res.status(200).send({ message: "Flight updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Usuwanie lotu według ID
router.delete("/:id", async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if (!flight) return res.status(404).send({ message: "Flight not found" });

        res.status(200).send({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;



// // /routes/flights.js
// const router = require("express").Router();
// const {Recipe, validateRecipe} = require("../models/recipe");
//
// // Tworzenie nowego przepisu
// router.post("/", async (req, res) => {
//     try {
//         const {error} = validateRecipe(req.body);
//         if (error) return res.status(400).send({message: error.details[0].message});
//
//         const recipe = new Recipe(req.body);
//         console.log(recipe)
//         await recipe.save();
//         res.status(201).send({message: "Recipe created successfully"});
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// });
//
// // Pobieranie wszystkich przepisów
// router.get("/", async (req, res) => {
//     try {
//         const recipes = await Recipe.find();
//         res.status(200).send({data: recipes});
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// });
//
// // Pobieranie jednego przepisu według ID
// router.get("/:id", async (req, res) => {
//     try {
//         const recipe = await Recipe.findById(req.params.id);
//         if (!recipe) return res.status(404).send({message: "Recipe not found"});
//
//         res.status(200).send({data: recipe});
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// });
//
// // Aktualizowanie przepisu według ID
// router.put("/:id", async (req, res) => {
//     try {
//         const {error} = validateRecipe(req.body);
//         if (error) return res.status(400).send({message: error.details[0].message});
//
//         const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         if (!recipe) return res.status(404).send({message: "Recipe not found"});
//
//         res.status(200).send({message: "Recipe updated successfully"});
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// });
//
// // Usuwanie przepisu według ID
// router.delete("/:id", async (req, res) => {
//     try {
//         const recipe = await Recipe.findByIdAndDelete(req.params.id);
//         if (!recipe) return res.status(404).send({message: "Recipe not found"});
//
//         res.status(200).send({message: "Recipe deleted successfully"});
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// });
//
// module.exports = router;
