const mongoose = require('mongoose');

const DeliveriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
    },
    address: {
        street: String,
        numberStreet: Number,
        district: String,
        complement: String,
        city: String,
        state: String,
        country: String,
        geolocation: {
            lat: Number,
            lg: Number
        }
    }
})

module.exports = mongoose.model('Deliveries', DeliveriesSchema)