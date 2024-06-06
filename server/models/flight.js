// /models/flight.js
const mongoose = require("mongoose");
const Joi = require("joi");

const flightSchema = new mongoose.Schema({
    AvgTicketPrice: { type: String, required: true },
    Cancelled: { type: String, required: true },
    Dest: { type: String, required: true },
    DestAirportID: { type: String, required: true },
    DestCityName: { type: String, required: true },
    DestCountry: { type: String, required: true },
    DestLocation: {
        lat: { type: String },
        lon: { type: String }
    },
    DestRegion: { type: String },
    DestWeather: { type: String },
    DistanceKilometers: { type: String },
    DistanceMiles: { type: String },
    FlightDelay: { type: String },
    FlightDelayMin: { type: Number },
    FlightDelayType: { type: String },
    FlightNum: { type: String },
    FlightTimeHour: { type: Number },
    FlightTimeMin: { type: Number },
    Origin: { type: String },
    OriginAirportID: { type: String },
    OriginCityName: { type: String },
    OriginCountry: { type: String },
    OriginLocation: {
        lat: { type: String },
        lon: { type: String }
    },
    OriginRegion: { type: String },
    OriginWeather: { type: String },
    dayOfWeek: { type: Number },
    hour_of_day: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

const Flight = mongoose.model("Flight", flightSchema, "flights");

const validateFlight = (data) => {
    const schema = Joi.object({
        AvgTicketPrice: Joi.string().required().label("AvgTicketPrice"),
        Cancelled: Joi.string().required().label("Cancelled"),
        Dest: Joi.string().required().label("Dest"),
        DestAirportID: Joi.string().required().label("DestAirportID"),
        DestCityName: Joi.string().required().label("DestCityName"),
        DestCountry: Joi.string().required().label("DestCountry"),
        DestLocation: Joi.object({
            lat: Joi.string().label("Latitude"),
            lon: Joi.string().label("Longitude")
        }).label("DestLocation"),
        DestRegion: Joi.string().label("DestRegion"),
        DestWeather: Joi.string().label("DestWeather"),
        DistanceKilometers: Joi.string().label("DistanceKilometers"),
        DistanceMiles: Joi.string().label("DistanceMiles"),
        FlightDelay: Joi.string().label("FlightDelay"),
        FlightDelayMin: Joi.number().label("FlightDelayMin"),
        FlightDelayType: Joi.string().label("FlightDelayType"),
        FlightNum: Joi.string().label("FlightNum"),
        FlightTimeHour: Joi.number().label("FlightTimeHour"),
        FlightTimeMin: Joi.number().label("FlightTimeMin"),
        Origin: Joi.string().label("Origin"),
        OriginAirportID: Joi.string().label("OriginAirportID"),
        OriginCityName: Joi.string().label("OriginCityName"),
        OriginCountry: Joi.string().label("OriginCountry"),
        OriginLocation: Joi.object({
            lat: Joi.string().label("Latitude"),
            lon: Joi.string().label("Longitude")
        }).label("OriginLocation"),
        OriginRegion: Joi.string().label("OriginRegion"),
        OriginWeather: Joi.string().label("OriginWeather"),
        dayOfWeek: Joi.number().label("DayOfWeek"),
        hour_of_day: Joi.number().label("HourOfDay"),
    });
    return schema.validate(data);
};

module.exports = { Flight, validateFlight };




// // /models/AddRecipe.js
// const mongoose = require("mongoose");
// const Joi = require("joi");
//
// const recipeSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: {type: String, required: true},
//     ingredients: { type: String, required: true },
//     instructions: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
// });
//
// const Recipe = mongoose.model("Recipe", recipeSchema);
//
// const validateRecipe = (data) => {
//     const schema = Joi.object({
//         name: Joi.string().required().label("Name"),
//         category: Joi.string().required().label("Category"),
//         ingredients: Joi.string().required().label("Ingredients"),
//         instructions: Joi.string().required().label("Instructions"),
//     });
//     return schema.validate(data);
// };
//
// module.exports = { Recipe, validateRecipe };
