const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const userController = require('../controllers/userController');

chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('API', () => {
    describe('GET /users/', () => {
        it('should get all users', (done) => {
            chai.request(server)
                .get('/users')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                done();
                })
        })
    })

    describe('Get user', () => {
        it('should get user', (done) => {
            chai.request(server)
                .get('/users/5f5b770820cac70068ca62ea')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object')
                    res.body.should.have.property('_id');
                done();
                })
        })
    })

    describe('Add user', () => {
        it('should add new user', (done) => {
            let newUser = {"_id":{"$oid":"5f5b7828add0e40928b9618f"},"disabledUser":[],"budgetGoals":[],"name":"Robert","surname":"Kowalski","password":"$2b$10$fkv9TVip9z43sKLiikX5NeUCUOfIQyGhrMDjHIXUPD77rGjlBdA/y","email":"testtest@gmail.com","phone":"123123123","sex":"man","budget":{"_id":{"$oid":"5f5b7828add0e40928b96190"},"expense":[],"income":[],"money":0},"position":{"_id":{"$oid":"5f5b7828add0e40928b96192"}},"admin":false,"settings":{"_id":{"$oid":"5f5b7828add0e40928b96194"},"isBudgetNegativeValueAllowed":true,"darkMode":false,"notificationsSound":true,"allowReceivingTransfers":true},"isUserBlocked":false,"isOnline":false,"__v":0,"firmStatus":0};
            chai.request(server)
                .post('/users')
                .send(newUser)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object')
                    res.body.should.have.property('token');
                done();
                })
        })
    })

    describe('Send mail', () => {
        it('should send mail', (done) => {
            chai.request(server)
                .put('/mail/send-message')
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        })
    })

    describe('Get mail', () => {
        it('should get mail', (done) => {
            chai.request(server)
                .get('/mail/mail/5fc7ab878ead0f3a10ba75bc')
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        })
    })

    describe('Get all mails', () => {
        it('should get all mails', (done) => {
            chai.request(server)
                .get('/mail/mails')
                .end((error, res) => {
                    res.should.have.status(200);
                done();
                })
        })
    })
    
    describe('Get category', () => {
        it('should get category', (done) => {
            chai.request(server)
                .get('/categories/Sport')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('_id');
                done();
                })
        })
    })

    describe('Get all categories', () => {
        it('should get category', (done) => {
            chai.request(server)
                .get('/categories')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                done();
                })
        })
    })

    describe('Choose category for name', () => {
        it('should get category by a name', (done) => {
            chai.request(server)
                .get('/categories/choose-category/podatek')
                .end((error, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('Number');
                done();
                })
        })
    })

    describe('Get chart', () => {
        it('should get chart', (done) => {
            chai.request(server)
                .get('/charts/currentMonthChart/5f5b770820cac70068ca62ea')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                done();
                })
        })
    })

    describe('Get vertical chart', () => {
        it('should get vertical chart', (done) => {
            chai.request(server)
                .get('/charts/currentMonthVerticalIncomeExpenseChart/5f5b770820cac70068ca62ea')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                done();
                })
        })
    })

    describe('Get forecasting chart', () => {
        it('should get forecasting chart', (done) => {
            chai.request(server)
                .get('/charts/forecasting-chart/5f5b770820cac70068ca62ea')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                done();
                })
        })
    })
    
})

describe('check functions', () => {
    
    context('calculateMoney', () => {
        it('should return 200', () => {
            expect(userController.calculateMoney({
                budget: {
                    income: [
                        {
                            status: 'Accepted',
                            money: 100
                        },
                        {
                            status: 'Accepted',
                            money: 300
                        }
                    ],
                    expense: [
                        {
                            money: 200
                        }
                    ]
                }
            })).to.equal(200);
        })
    })

    context('calculateUserFirmMoney', () => {
        it('should return 400', () => {
            expect(userController.calculateUserFirmMoney({
                firmBudget: {
                    income: [
                        {
                            status: 'Accepted',
                            money: 200
                        },
                        {
                            status: 'Accepted',
                            money: 600
                        }
                    ],
                    expense: [
                        {
                            money: 100
                        },
                        {
                            money: 300
                        }
                    ]
                }
            })).to.equal(400);
        })
    })
})
