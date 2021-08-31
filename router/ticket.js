const express = require("express");

const { passenger } = require("../models/passSchema");
const { ticket } = require("../models/ticketSchema");

const router = express.Router();

//Book the ticket
router.post("/create", async (req, res) => {
  try {
    //check seatId is valid 
    const seat = parseInt(req.body.seatNo);
    if (seat > 40) {
      return res
        .status(400)
        .send("Invalid SeatNo, there is only 40 seats available");
    }

    //check seat is booked or not
    const seatbooked = await ticket.findOne({
      available: false,
      seatNo: req.body.seatNo,
    });

    if (seatbooked) {
      return res
        .status(400)
        .send("This seat is already booked, Please book another seat");
    }

    //save new passenger into DataBases

    const newPassenger = new passenger(req.body.passenger);
    const passengerData = await newPassenger.save();
    if (passengerData) {
      const newTicket = new ticket();
      newTicket.seatNo = req.body.seatNo;
      newTicket.available = false;
      newTicket.date = req.body.date;
      newTicket.passengerObj = newPassenger._id;
      const ticketData = await newTicket.save();
      if (ticketData) {
        res.status(200).send(ticketData);
      }
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

//View all open ticket
router.get("/allopen", async (req, res) => {
  try {
    const openTicket = await ticket.find({
      available: false,
    });
    return res.status(200).send(openTicket);
  } catch (err) {
    res.status(404).send(err);
  }
});

//View all Closed Ticket
router.get("/allclose", async (req, res) => {
  try {
    const closeTicket = await ticket.find({
      available: true,
    });
    res.status(200).send(closeTicket);
  } catch (err) {}
});

//View Ticket status
router.get('/:ticketId', async(req,res) => {
  try {
    //pass the parameter as the ticket _id
    const {ticketId} = req.body.params;
    const ticketData = await ticket.findById(ticketId);
    //return the status if ticket is found
    if(ticketData) {
      return res
        .status(200)
        .json({
          available: ticketData.available
        });
    }
    else {  
      return res
        .status(404)
        .json({
          "message" : "Ticket Id is wrong, page not found"
        })
    }
  } catch (err) {
      console.log(err);
      return res
        .status(404)
        .json({"error": "Something is wrong in your code"})
  }
})

//Update the status of ticket
router.put('/:ticketId', async(req, res) => {
  try {
    //pass the ticketId as a parameter
    const {ticketId} = req.params;
    //find the ticket data and up
    const ticketData = await ticket.findByIdAndUpdate(ticketId, {
      $set: { available: req.body.available }},
      {new : true}
    );
    if( !ticketData ) {
      return res
        .status(404)
        .json ({
          "message": "TicketId is incorrect, try again"
        })
    }
    //Update passenger detail by getting the PassengerId
    const passengerId = ticketData.passengerObj;
    await passenger.findByIdAndUpdate(passengerId, 
      { $set: req.body.passenger },
      {new: true}
    );
    res.status(200).json({"message": "Details updated successfully"});

  } catch (err) {
    console.log(err);
    res.status(403).send("Unkown error", err);
  }
})

module.exports = router;
