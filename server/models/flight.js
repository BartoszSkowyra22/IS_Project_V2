const mongoose = require("mongoose");
const Joi = require("joi");

const flightSchema = new mongoose.Schema({
    AvgTicketPrice: { type: String, required: true },
    Cancelled: { type: String, required: true },
    Dest: { type: String },
    DestAirportID: { type: String},
    DestCityName: { type: String, required: true },
    DestCountry: { type: String},
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
    OriginCityName: { type: String, required: true },
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
        Dest: Joi.string().label("Dest"),
        DestAirportID: Joi.string().label("DestAirportID"),
        DestCityName: Joi.string().required().label("DestCityName"),
        DestCountry: Joi.string().label("DestCountry"),
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
        OriginCityName: Joi.string().required().label("OriginCityName"),
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