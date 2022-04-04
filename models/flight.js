const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema ({
    meal: {type: String, 
        enum: ['none', 'breakfast', 'lunch', 'dinner', 'vegetarian', 'kosher', 'halal'], 
        default: 'none'}
});

const destinationSchema = new Schema ({
    airport: {type: String, 
                enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
                default: 'AUS'},
    arrivals: {type: Date, 
                default: Date(new Date().setFullYear(new Date().getFullYear() + 1))}
});

const flightSchema = new Schema({
    airline: {type: String, 
                enum: ['American', 'Delta', 'Southwest', 'United'],
                default: 'American'},
    airport: {type: String, 
                enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN']},
    flightNo: {type: Number, 
                min: 10, 
                max: 9999},
    departs: {type: Date, 
                default: new Date(new Date().setFullYear(new Date().getFullYear() + 1))},
    destinations: [destinationSchema],
    meals: [mealSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema)