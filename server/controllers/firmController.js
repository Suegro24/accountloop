const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const Firm = require('../models/firm');
const Address = require('../models/address');
const FirmBudget = require('../models/firmBudget');
const User = require('../models/user');

router.get('/', (req, res) => {
    Firm.find({})
    .exec(function(error, firms) {
        if (error) console.error(error);
        else {
            firms.forEach(firm => {
                firm.firmBudget.money = calculateMoney(firm);
            });
            res.json(firms)
        }
    })
})

router.get('/:id', (req, res) => {
    if (req.params.id == 'undefined') return;
    Firm.findById(req.params.id)
    .exec(function(error, firm) {
        if (error) console.error(error);
        else {
            firm.firmBudget.money = calculateMoney(firm);
            res.json(firm);
        }
    })
})

router.post('/createfirm', (req, res) => {
    let id = mongoose.Types.ObjectId();
    let newFirm = new Firm();
    let changedUser = req.body.user;

    changedUser.firmId = id;
    changedUser.firmStatus = 3;

    newFirm._id = id;
    newFirm.address = new Address();
    newFirm.name = req.body.firm.name;
    newFirm.address.country = req.body.firm.address.country;
    newFirm.address.city = req.body.firm.address.city;
    newFirm.address.street = req.body.firm.address.street;
    newFirm.firmBudget = new FirmBudget();
    newFirm.users = [];
    newFirm.users.push(req.body.user);
    newFirm.firmBudget.moderators.push({
        'name': 'Właściciel',
        'rank': 3,
        'users': req.body.user
    })



    User.updateOne({_id: changedUser._id}, {$set: changedUser}, (error) => {
        console.error(error);
    })

    newFirm.save(function(error) {
        if (error) console.error(error);
    })

})

router.put('/:id', (req,res) => {
    const changedFirm = req.body;
    Firm.updateOne({_id: req.body._id}, {$set: changedFirm}, (error) => {
        if (error) console.error(error);
    })
})

router.put('/:firmId/acceptBudgetChange/:id', (req,res) => {
    Firm.findById(req.params.firmId)
    .exec(function(error, firm) {
        if (error) console.error(error);
        else {
            budgetChanges = [...firm.firmBudget.income, ...firm.firmBudget.expense];
            budgetChanges.forEach(change => {
                if (change.status == 'Waiting') {
                    if(change._id == req.params.id) {
                        change.status = 'Accepted';
                        firm.save();
                        return;
                    }
                }
            })
        }
    })
})

router.put('/:firmId/discardBudgetChange/:id', (req,res) => {
    Firm.findById(req.params.firmId)
    .exec(function(error, firm) {
        if (error) console.error(error);
        else {
            firm.firmBudget.income.forEach((income, index) => {
                if (income._id == req.params.id) {
                    firm.firmBudget.income.splice(index, 1)
                    firm.save();
                    return;
                }
            })

            firm.firmBudget.expense.forEach((expense, index) => {
                if (expense._id == req.params.id) {
                    firm.firmBudget.expense.splice(index, 1)
                    firm.save();
                    return;
                }
            })
        }
    })
})

router.put('/delete/:id', (req,res) => {
    Firm.findById(req.params.id)
    .exec((error,firm) => {
        if (error) console.error(error);
        else {
            firm.users.forEach(user => {
                User.findById(user._id)
                .exec((error, user) => {
                    if (error) console.error(error);
                    else {
                        user.firmId = undefined;
                        user.firmStatus = 0;
                        user.save();
                    }
                })
            })
            firm.isDeleted=true;
            firm.save();
        }
    })
})

function calculateMoney(firm) {
    let money = 0;
    if (!firm.firmBudget) return 0;
    firm.firmBudget.income.forEach(income => {
        if(income.status == 'Accepted') money+=income.money;
    });
    firm.firmBudget.expense.forEach(expense => {
        if(expense.status == 'Accepted') money-=expense.money;
    })
    return money;
}

module.exports = router;