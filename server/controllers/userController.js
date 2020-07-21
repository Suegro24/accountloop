const express = require('express');
var router = express.Router();

const User = require('../models/user');
const Budget = require('../models/budget');
const Position = require('../models/position');
const Firm = require('../models/firm');

router.get('/', (req, res) => {
    User.find({})
    .exec(function(error, users) {
        if (error) console.error(error);
        else {
            users.forEach(user => {
                if (user.budget !== undefined || user.budget !== null) user.budget.money = calculateMoney(user);
            });
            res.json(users);
        } 
    })
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            user.budget.money = calculateMoney(user);
            res.send(user);
        }
    })
})

router.post('/', (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.surname = req.body.surname;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.dateOfBirth = req.body.dateOfBirth;
    newUser.sex = req.body.sex;
    newUser.budget = new Budget();
    newUser.save(function(error, insertedUser){
        if (error) console.error(error);
        else res.json(insertedUser);
    })
})

router.put('/:id/changebudget', (req,res) => {
    const changedUser = req.body;
    User.updateOne({_id: req.params.id}, {$set: changedUser}, (error) => {
        if (error) console.error(error);
    });
})

router.put('/joinfirm/:id', (req, res) => {
    const changedUser = req.body;
    changedUser.firmId = req.params.id;
    changedUser.firmStatus = 0;
    User.updateOne({_id: req.body._id}, {$set: changedUser}, (error) => {
        if (error) console.error(error);
    })

    Firm.findById(req.params.id)
    .exec(function(error, firm) {
         if (error) console.error(error);
         else {
             firm.users.push(req.body);
             Firm.updateOne({_id: req.params.id}, {$set: firm}, (error) => {
                 if (error) console.error(error);
             })
         }
    })

})

router.put('/:id', async (req, res) => {
    const changedUser = req.body;
    User.updateOne({_id: req.params.id}, {$set: changedUser}, (error) => {
        if (error) console.error(error);
    })
    if (req.body.firmId) {
        Firm.findById(req.body.firmId)
        .exec(function(error, firm) {
            if (error) console.error(error);
            else {
                firm.users.forEach(user => {
                    if (user._id == req.params.id) {
                        user = req.body; 
                        firm.save();
                        return;
                    }   
                })
            }
        })
    }
});

router.put('/acceptUserToFirm/:id', (req,res) => {
    User.findById(req.params.id)
    .exec(function(error, user) {
        if (error) console.error(error);
        else {
            Firm.findById(user.firmId)
            .exec(function(error, firm) {
                if (error) console.error(error);
                else {
                    firm.users.forEach(user => {
                        if (user._id == req.params.id) {
                            user.firmStatus = 1;
                            firm.save();
                            return;
                        }
                    })
                }
            })

            user.firmStatus = 1;
            user.save();
        }
    })
})

router.put('/discardUserToFirm/:id', (req,res) => {
    User.findById(req.params.id)
    .exec(function(error, user) {
        if (error) console.error(error);
        else {
            Firm.findById(user.firmId)
            .exec(function(error, firm) {
                if (error) console.error(error);
                else {
                    firm.users.forEach((user,index) => {
                        if (user._id == req.params.id) {
                            firm.users.splice(index, 1);
                            firm.save();
                            return;
                        }
                    })
                }
            })

            user.firmId = undefined;
            user.save(_ => {
                res.json(user);
            })
        }
    })
})

router.put('/:id/deleteUserFromFirm', (req,res) => {
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            Firm.findById(user.firmId)
            .exec((error, firm) => {
                if (error) console.error(error);
                else {
                    firm.users.forEach((user, index) => {
                        if (user._id == req.params.id) {
                            firm.users.splice(index, 1);
                            firm.save();
                            return;
                        }
                    })
                }
            })

            user.firmId = undefined;
            user.firmStatus = 0;
            user.save();
        }
    })
})

router.put('/:id/changePermissions/:status', (req,res) => {
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            Firm.findById(user.firmId)
            .exec((error, firm) => {
                if (error) console.error(error);
                else {
                    firm.users.forEach(user => {
                        if (user._id == req.params.id) {
                            user.firmStatus = req.params.status;
                            firm.save();
                            return;
                        }
                    })
                }
            })

            user.firmStatus = req.params.status;
            user.save();
        }
    })
})

router.put('/leaveFirm/:id', (req,res) => {
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            Firm.findById(user.firmId)
            .exec((error, firm) => {
                if (error) console.error(error);
                else {
                    firm.users.forEach(user => {
                        if (user._id == req.params.id) {
                            user.firmId = undefined;
                            user.firmStatus = 0;
                            firm.save();
                            return;
                        }
                    })
                }
            })

            user.firmStatus = 0;
            user.firmId = undefined;
            user.save();
        }
    })


})

function calculateMoney(user) {
    let money = 0;
    if (!user.budget) return 0;
    user.budget.income.forEach(income => {
        if (income.status != 'Waiting') money+=income.money;
    });
    user.budget.expense.forEach(expense => {
        money-=expense.money;
    })
    return money;
}

module.exports = router;