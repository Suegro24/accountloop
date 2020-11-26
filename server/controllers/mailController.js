const express = require('express');
const router = express.Router();

const Mail = require('../models/mail');

router.put('/send-message', (req,res) => {
    let mail = new Mail(req.body);
    mail.status = 'Oczekujące';
    mail.save();
    res.send().status(200);
})

router.get('/user-send-messages/:id', (req,res) => {
    Mail.find({}).exec(function(error, mails) {
        if (error) console.error(error);
        else {
            mails = mails.filter(mail => {
                if (mail.senderId === req.params.id) return mail;
            })
            res.json(mails);
        }
    })
})

router.get('/user-received-messages/:id', (req,res) => {
    Mail.find({}).exec(function(error, mails) {
        if (error) console.error(error);
        else {
            mails = mails.filter(mail => {
                if (mail.recipientId === req.params.id) return mail;
            })
            res.json(mails);
        }
    })
})

router.get('/mail/:id', (req,res) => {
    Mail.findById(req.params.id).exec(function(error, mail) {
        if (error) console.error(error);
        else {
            res.json(mail);
        }
    })
})

router.get('/mails', (req,res) => {
    Mail.find({}).exec(function(error, mails) {
        if (error) console.error(error);
        else {
            res.json(mails);
        }
    })
})

router.put('/reserve-mail/:id', (req,res) => {

    Mail.findByIdAndUpdate({_id: req.body._id}, {$set: {recipientId: req.body.senderId, status: 'W trakcie'}}, (error, doc) => {
        if (error) console.error(error) 
        else {
            res.send().status(200);
        }
    })
})

router.put('/responde-mail', (req,res) => {

    Mail.findByIdAndUpdate({_id: req.body._id}, {$set: {status: 'Zakończone', message: req.body.message, recipientId: req.body.senderId}}, (error, doc) => {
        if (error) console.error(error) 
        else {
            res.send().status(200);
        }
    })
})




module.exports = router;