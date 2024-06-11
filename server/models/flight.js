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
            lat: { type: String, required: true },
            lon: { type: String, required: true }
        },
        DestRegion: { type: String, required: true },
        DestWeather: { type: String, required: true },
        DistanceKilometers: { type: String, required: true },
        DistanceMiles: { type: String, required: true },
        FlightDelay: { type: String, required: true },
        FlightDelayMin: { type: Number, required: true },
        FlightDelayType: { type: String, required: true },
        FlightNum: { type: String, required: true },
        FlightTimeHour: { type: Number, required: true },
        FlightTimeMin: { type: Number, required: true },
        Origin: { type: String, required: true },
        OriginAirportID: { type: String, required: true },
        OriginCityName: { type: String, required: true },
        OriginCountry: { type: String, required: true },
        OriginLocation: {
            lat: { type: String, required: true },
            lon: { type: String, required: true }
        },
        OriginRegion: { type: String, required: true },
        OriginWeather: { type: String, required: true },
        dayOfWeek: { type: Number, required: true },
        hour_of_day: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now, required: true }
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
                lat: Joi.string().required().label("Latitude"),
                lon: Joi.string().required().label("Longitude")
            }).required().label("DestLocation"),
            DestRegion: Joi.string().required().label("DestRegion"),
            DestWeather: Joi.string().required().label("DestWeather"),
            DistanceKilometers: Joi.string().required().label("DistanceKilometers"),
            DistanceMiles: Joi.string().required().label("DistanceMiles"),
            FlightDelay: Joi.string().required().label("FlightDelay"),
            FlightDelayMin: Joi.number().required().label("FlightDelayMin"),
            FlightDelayType: Joi.string().required().label("FlightDelayType"),
            FlightNum: Joi.string().required().label("FlightNum"),
            FlightTimeHour: Joi.number().required().label("FlightTimeHour"),
            FlightTimeMin: Joi.number().required().label("FlightTimeMin"),
            Origin: Joi.string().required().label("Origin"),
            OriginAirportID: Joi.string().required().label("OriginAirportID"),
            OriginCityName: Joi.string().required().label("OriginCityName"),
            OriginCountry: Joi.string().required().label("OriginCountry"),
            OriginLocation: Joi.object({
                lat: Joi.string().required().label("Latitude"),
                lon: Joi.string().required().label("Longitude")
            }).required().label("OriginLocation"),
            OriginRegion: Joi.string().required().label("OriginRegion"),
            OriginWeather: Joi.string().required().label("OriginWeather"),
            dayOfWeek: Joi.number().required().label("DayOfWeek"),
            hour_of_day: Joi.number().required().label("HourOfDay")
        });
        return schema.validate(data);
    };

module.exports = { Flight, validateFlight };