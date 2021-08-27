const express = require('express');

const {passenger} = require('../models/passSchema');
const {ticket} = require('../models/ticketSchema');

const router = express.Router();

//Book the ticket
router.post('/create', async(req, res) => {
    try {
        //check seatId is valid
        const seat = parseInt(req.body.seatNo);
        if(seat > 40) {
            return res.status(400).send("Invalid SeatNo, there is only 40 seats available"); 
        }

        //check seat is booked or not
        const seatbooked = await ticket.findOne({
            available: true,
            seatNo: req.body.seatNo
        });
        if(seatbooked) {
            return res.status(400).send("This seat is already booked, Please book another seat");
        }

        //save new passenger into DataBases
        const newPassenger = new passenger(req.body.passenger);
        const passengerData = await passenger.save();
        if(passengerData) {
            const newTicket = new ticket()
            newTicket.seatNo = req.body.seatNo
            newTicket.passengerObj = newPassenger._id;
            const ticketData = await ticket.save();
            if(ticketData) {
                res.status(200).send(ticketData);
            }
        }
    } catch (err) {
        return res.status(400).send(err);
    }
})

//View all open ticket
router.get('/allopen', async(req,res) => {
    try {
        const openTicket = await ticket.find({
            available: false
        });
        return res.status(200).send(openTicket)

    } catch (err) {
        res.status(404).send(err);
    }
})

//View all Closed Ticket
router.get('/allclose', async(req, res)=>{
    try {
        const closeTicket = await ticket.find({
            available: true
        });
        res.status(200).send(closeTicket);
    } catch (err) {
        
    }
})

//View Ticket Status
router.get('/:ticketId', async (req, res) => {
    try {
        //get ticketid from parameter
        const { ticketId } = req.params;
        const ticketData = await Ticket.findById(ticketId);
        if(ticketData) {
            res.status(200).send(ticketData);
        }
        else {
            return res.status(404).json({ 
                "message":" Ticket Id is incorrect"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(404).send(err);
    }
})

//
module.exports = router;