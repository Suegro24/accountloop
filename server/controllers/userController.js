const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');
const Budget = require('../models/budget');
const Position = require('../models/position');
const Firm = require('../models/firm');
const Settings = require('../models/settings');
const BudgetGoals = require('../models/budgetGoals');
const Upload = require('../middleware/upload');
const { Mongoose } = require('mongoose');

// router.get('/profile-image', (req, res) => { 
//     imgModel.find({}, (err, items) => { 
//         if (err) { 
//             console.log(err); 
//         } 
//         else { 
//             res.send({ items: items }); 
//         } 
//     }); 
// }); 

// router.post('/upload-image', upload.single('image'), (req, res, next) => { 
//     var obj = { 
//         name: req.body.name,  
//         img: { 
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
//             contentType: 'image/png'
//         } 
//     } 
//     imgModel.create(obj, (err, item) => { 
//         if (err) { 
//             console.log(err); 
//         } 
//         else { 
//             // item.save(); 
//             res.redirect('/'); 
//         } 
//     }); 
// }); 

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if (error) console.error(error);
        else {
            if (!user) {
                res.status(401).send('Invalid email')
                return
            }
            if (userData.password == null)  {
                res.status(401).send('Invalid password'); 
            }

            bcrypt.compare(userData.password, user.password, function(err,resp) {
                if (resp) {
                    if (user.isUserBlocked) {
                        res.status(401).send('User is blocked');
                    }
                    else {
                        let payload = { subject: user._id, admin: user.admin };
                        let token = jwt.sign(payload, 'secretToken')
                        res.status(200).send({token, userId: user._id})
                    }
                }
                else {
                    res.status(401).send('Invalid password')
                }
                
            }
        )}
    })
})

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
            user.firmBudget.money = calculateUserFirmMoney(user);
            res.send(user);
        }
    })
})

router.get('/budget-goals/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            let budgetGoals = user.budgetGoals;
            budgetGoals.map(goal => {
                if (goal.currentState == 0) goal.progress = 0;
                else goal.progress = Math.floor((goal.currentState/goal.goal)*100);

                if (goal.progress == 100) goal.isCompleted = true;
            })
            res.send(budgetGoals).status(200);
        }
    })
})

router.get('/restore-password/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890!@#$%^&*()-+<>";
            let password = '';
            for (let i = 0;i < 16; i++) {
                let random = Math.floor(Math.random() * charset.length);
                password+=charset.charAt(random);
            }
            bcrypt.hash(password, 10, function(error, hash) {
                user.password = hash;
                user.save();
            })
            res.json(password);
        }
    })
})

router.put('/block-user/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            user.isUserBlocked = true;
            user.save();
            res.send().status(200);
        }
    })
})

router.get('/status/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            let userStatus = user.isOnline;
            res.send(userStatus).status(200);
        }
    })
})

router.put('/change-online-status/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            if (user.isOnline == null) res.send().status(401);
            user.isOnline = !user.isOnline;
            user.save();
                    Firm.findById(user.firmId)
                    .exec(function(error, firm) {
                        if (error) console.error(error);
                        else {
                            if(!firm) return
                            firm.users.map(u => {
                                if (JSON.stringify(u._id) == JSON.stringify(user._id)) {
                                    u.isOnline = !u.isOnline
                                    firm.save();
                                    res.send().status(200);
                                }
                            })
                        }
                    })
            res.send().status(200);
        }
    })
})

router.put('/change-password/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            bcrypt.compare(req.body.password, user.password, function(err,result) {
                if (result == false) res.status(401).send('Invalid password');
                else {
                    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                        user.password = hash;
                        user.save();
                        res.send().status(200);
                    })
                }
                
            })
        }
    })
})

router.put('/update-goal/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            user.budgetGoals.map(goal => {
                if (goal._id == req.body.goal._id) {
                    goal.currentState += req.body.money;
                    goal.progress = Math.floor((goal.currentState/goal.goal)*100);

                    if (goal.progress >= 100) {
                        goal.isCompleted = true;
                    }
                    return;
                }
            })
            user.save();
            res.send().status(200);
        }
    })
})

router.post('/add-goal/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            if(user.budgetGoals == undefined) user.budgetGoals = [new BudgetGoals()];
            user.budgetGoals.push(req.body);
            user.save();
            res.send().status(200);
        }
    })
})

router.put('/unblock-user/:id', (req, res) => {
    User.findById(req.params.id)
    .exec(function(error, user){
        if (error) console.error(error);
        else {
            user.isUserBlocked = false;
            user.save();
            res.send().status(200);
        }
    })
})

router.post('/', (req, res) => {

    bcrypt.hash(req.body.password, 10, function(error,hash) {
        let newUser = new User();
        newUser.name = req.body.name;
        newUser.surname = req.body.surname;
        newUser.password = hash;
        newUser.email = req.body.email;
        newUser.phone = req.body.phone;
        newUser.dateOfBirth = req.body.dateOfBirth;
        newUser.sex = req.body.sex;
        newUser.budget = new Budget();
        newUser.firmBudget = new Budget();
        newUser.position = new Position();
        newUser.admin = false;
        newUser.settings = new Settings();
        newUser.isUserBlocked = false;
        newUser.isOnline = false;

        newUser.settings.isBudgetNegativeValueAllowed = true;
        newUser.settings.darkMode = false;
        newUser.settings.notificationsSound = true;
        newUser.settings.allowReceivingTransfers = true;

        newUser.save(function(error, insertedUser){
            if (error) console.error(error);
            else {
                let payload = { subject: insertedUser._id, admin: insertedUser.admin };
                let token = jwt.sign(payload, 'secretToken')
                res.status(200).send({token});
            }
        })
    })
})

router.put('/:id/changebudget', (req,res) => {
    const changedUser = req.body;
    User.updateOne({_id: req.params.id}, {$set: changedUser}, (error) => {
        if (error) console.error(error);
        else {
            res.send().status(200);
        }
    });
})

router.put('/send-money', (req,res) => {
    User.findById(req.body.expenseUserId)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            let id = new mongoose.Types.ObjectId();
            req.body.expense._id = id;
            user.budget.expense.push(req.body.expense);
            user.save();

            User.findById(req.body.incomeUserId)
            .exec((error, user2) => {
                if (error) console.error(error);
                else {
                    req.body.income.expenseRef = id;
                    user2.budget.income.push(req.body.income);
                    user2.save();
                    res.send().status(200);
                }
            })
        }
    })
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
                 else {
                    res.send().status(200);
                 }
             })
         }
    })

})

router.put('/:id', async (req, res) => {
    const changedUser = req.body;
    User.updateOne({_id: req.params.id}, {$set: changedUser}, (error) => {
        if (error) console.error(error);
        else {
            if (req.body.firmId) {
                Firm.findById(req.body.firmId)
                .exec(function(error, firm) {
                    if (error) console.error(error);
                    else {
                        firm.users.forEach(user => {
                            if (user._id == req.params.id) {
                                user = req.body; 
                                firm.save();
                            }   
                        })
                    }
                })
            }
            res.send().status(200);
        }
    })

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
            res.send().status(200);
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
            res.send().status(200);
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
            res.send().status(200);
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
            res.send().status(200);
        }
    })
})

router.put('/edit-settings/:id', (req,res) => {
    
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
           user.settings = req.body;
           if ( user.settings.notificationVolume > 1 ) {
               user.settings.notificationVolume = user.settings.notificationVolume/100;
           }
           user.save();
           res.status(200).send(user);
        }
    })
})

router.put('/edit-goal/:id', (req,res) => {
    
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            user.budgetGoals.forEach((budgetGoal,i) => {
                if (budgetGoal._id == req.body._id) {
                    user.budgetGoals[i] = req.body;
                }
            })

            user.save();
            res.status(200).send(user);
        }
    })
})

router.put('/delete-goal/:id', (req,res) => {
    
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            user.budgetGoals.forEach((budgetGoal,i) => {
                if (budgetGoal._id == req.body._id) {
                    user.budgetGoals.splice(i, 1);
                }
            })

            user.save();
            res.status(200).send(user);
        }
    })
})

function calculateMoney(user) {
    let money = 0;

        user.budget.income.forEach(income => {
            if (income.status != 'Waiting') money+=income.money;
        });
        user.budget.expense.forEach(expense => {
            money-=expense.money;
        })
        
    return money;
}

function calculateUserFirmMoney(user) {
    let firmMoney = 0;

        user.firmBudget.income.forEach(income => {
            if (income.status != 'Waiting') firmMoney+=income.money;
        });
        user.firmBudget.expense.forEach(expense => {
            firmMoney-=expense.money;
        })

    return firmMoney;
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'secretToken')

    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

module.exports = router;