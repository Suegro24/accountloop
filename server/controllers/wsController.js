const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Firm = require('../models/firm');

const send = (ws, data) => {
    const message = JSON.stringify({
        jsonrpc: '2.0',
        ...data
    });
    console.log(ws);
    ws.send(message);
}

module.exports = (ws, req) => {
    ws.on('message', (msg) => {
        const data = JSON.parse(msg);
        Firm.findById(data.firmId)
        .exec(function(error, firm) {
            if (error) console.error(error);
            else {
                firm.chatMessages = data.chatMessageDto;
                firm.save();
                firm.users.forEach(user => {
                    send(user.ws, {method: 'update', params: {message: data.message}})
                });
                res.send().status(200);
            }
        })
    })
}