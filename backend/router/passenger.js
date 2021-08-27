const express = require('express');
const {ticket} = require('../models/ticketSchema');
const {passenger} = require('../models/passSchema');

const router = express.Router();

//Detail of user from ticket booked
router.get('/:ticketId', async(req, res) => {
    try {
        const { ticketId } = req.params;
        if(!ticketId) { 
            return res.status(400).send('TicketId is invalid')
        } 

    } catch (err) {
        res.send(404).send(err);
    }
})

module.exports = router;