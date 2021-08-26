const mongoose = require('mongoose');

const Ticket_Schema = mongoose.Schema({

    available: {
        type: Boolean,
        requied: true,
    },
    seatNo: {
        type: Number,
        requied: true,
    },
    date: {
        type: Date,
        required: true,
    },
    passengerObj : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Passenger'
    }
})

module.exports = {
    ticket: mongoose.model('Ticket', Ticket_Schema),
}   