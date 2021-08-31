const express = require('express');
const {ticket} = require('../models/ticketSchema');
const {passenger} = require('../models/passSchema');

const router = express.Router();

//Detail of user from ticket booked
router.get('/:ticketId', async(req, res) => {
    try {
        const { ticketId } = req.params;
        if(!ticketId) { 
            return res.status(400).json({"message":"TicketId is invalid"})
        } 

        const ticketData = await ticket.findById(ticketId); 
        if(!ticketData) { 
            return res.status(404).json({"message":"No any ticket"})
        }

        //Get passenger data from ticketId
        const passengerData = await passenger.findById(ticketData.passengerObj)
        if(passengerObj){
            return res.status(200).send(passengerData);
        }

        //if passenger could not be found
        return res.status(404).json({"message": "passenger is not found"})

    } catch (err) {
        res.send(404).json({"error": "Oops! Something is wrong in your code"});
    }
})

module.exports = router