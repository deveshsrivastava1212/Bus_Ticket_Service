const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {admin} = require('../models/adminSchema');
const {ticket} = require('../models/ticketSchema');

// Login as Admin
router.post('/login', async(req,res) => {
    try{
        //Validate Email
        const admin_user = await admin.findOne ({email:req.body.email});
        if(!admin_user){
            return res.status(200).send("Invalid Information")
        }

        //Validate Password
        const pass_verify = await bcrypt.compare(req.body.password, admin_user.password);
        if(!pass_verify){
            return res.status(200).send("Invalid Information");
        }
        res.status(200).json({"message":"Login Successful"})

    }catch(err){
        res.status(404).send(err);
    }
});

//SignUp as Admin
router.post('/signup', async(req,res) => {
    console.log(req,res);
    try {
        //Check Admin Already Exist or not
        const email = req.body.email;
        const admin_user = await admin.findOne ({ email :email })
        if(admin_user) {
            return res.status(400).json({"message":"Admin Already Exist! "})
        }
        
        //Create a New admin
        newAdmin = new admin(req.body);

        //Converting in hashing password
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(newAdmin.password, salt);

        //Save the data
        const data = await newAdmin.save();
        return res.status(200).json({"message": "SignUp Successfully"})

    }catch (err) {
        res.status(404).send(err);
    }
});

//Free all the bookings
router.post('/reset', async(req, res) => {
    try{
        await ticket.updateMany({}, {
            $set:{
                available: false
            }
        });
        return res.status(200).json({"message": "Now all seats are available"})
    }catch(err) {
        res.status(404).send(err);
    }
});

module.exports = router;