const mongoose = require('mongoose');

const passenger_Schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    }

});

module.exports = {
    passenger: mongoose.model('Passenger', passenger_Schema),
};