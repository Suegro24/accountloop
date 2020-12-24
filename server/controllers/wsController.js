const Firm = require('../models/firm');
const User = require('../models/user');
const chatMessageDto = require('../models/chatMessageDto');

users = [];

const send = (ws, data) => {
    const d = JSON.stringify({
        ...data
    });
     ws.send(d);
}

module.exports = (ws, res) => {

    ws.on('message', msg => {
        const data = JSON.parse(msg);
        if (data.method == 'new') {
            User.findById(data.userId).exec((error, user) => {
                if (error) console.error(error);
                else {
                    Firm.findById(user.firmId).exec((error, firm) => {
                        if (error) console.error(error);
                        else {
                            firm.users.forEach(u => {
                                if (`${u._id}` == `${user._id}`) {
                                    users.push({
                                        user: u.name + ' ' + u.surname,
                                        ws: ws,
                                        firmId: u.firmId
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            Firm.findById(data.firmId).exec((error, firm) => {
                if (error) console.error(error);
                else {
                    firm.chatMessages.push(data.chatMessageDto);
                    const cmd = new chatMessageDto(data.chatMessageDto);
                    users.forEach(user => {
                        if (`${user.firmId}` == `${firm._id}` && user.ws.readyState == 1) {
                            send(user.ws, {method: 'update', params: {message: cmd}});
                        }
                    });
                    firm.save();
                }
            })
        }
    }) 
}

