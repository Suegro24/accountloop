const express = require('express');
var router = express.Router();

const User = require('../models/user');
const Firm = require('../models/firm');

router.get('/currentMonthChart/:id', (req,res) => {
    User.findById(req.params.id) 
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            let chart = getCurrentMonthChart(user.budget);
            res.json(chart);
        }
    })
})

router.get('/currentMonthChart/firm/:id', (req,res) => {
    Firm.findById(req.params.id)
    .exec((error, firm) => {
        if (error) console.error(error) 
        else {
            let chart = getCurrentMonthChart(firm.firmBudget);
            res.json(chart);
        }
    })
})

router.get('/currentMonthVerticalIncomeExpenseChart/:id', (req,res) => {
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error) 
        else {
            let chart = getCurrentVerticalIncomeExpenseChart(user.budget);
            res.json(chart);
        }
    })
})

function getCurrentMonthChart(budget) {
    let amountOfDaysInCurrentMonth = new Date();
    let currentMonth = new Date().getMonth();
    amountOfDaysInCurrentMonth = new Date(amountOfDaysInCurrentMonth.getFullYear(), amountOfDaysInCurrentMonth.getMonth()+1, 0).getDate();
    let chart = [{
        "name": "Budżet w obecnym miesiącu",
        "series": []
    }];
    let money = 0;
    for(let i = 1; i<= amountOfDaysInCurrentMonth; i++) {
        let arrayOfBudgetChanges = [];
        budget.income.forEach(income => {
            if (income.date.getUTCDate() == i && new Date(income.date).getMonth() == currentMonth && income.status != 'Waiting') arrayOfBudgetChanges.push(income);
        })
        budget.expense.forEach(expense => {
            if (expense.date.getUTCDate() == i && new Date(expense.date).getMonth() == currentMonth) arrayOfBudgetChanges.push(expense);
        })
        if (arrayOfBudgetChanges.length > 0) {
            arrayOfBudgetChanges.forEach(change => {
                if (change.type == 'income') money+=change.money;
                else money-=change.money;
            })
        } 
        chart[0].series.push({
            "name": i,
            "value": money
        })
    }
    return chart;
}

function getCurrentVerticalIncomeExpenseChart(budget) {
    let amountOfDaysInCurrentMonth = new Date();
    let currentMonth = new Date().getMonth();
    amountOfDaysInCurrentMonth = new Date(amountOfDaysInCurrentMonth.getFullYear(), amountOfDaysInCurrentMonth.getMonth()+1, 0).getDate();
    let chart = [];
    let expensesTotalMoney = 0;
    let incomesTotalMoney = 0;

    budget.income.forEach(income => {
        if (new Date(income.date).getMonth() == currentMonth && income.status != 'Waiting') incomesTotalMoney += income.money;
    })

    budget.expense.forEach(expense => {
        if (new Date(expense.date).getMonth() == currentMonth) expensesTotalMoney += expense.money;
    })

    chart.push({
        'name': 'Dochody',
        'value': incomesTotalMoney
    })

    chart.push({
        'name': 'Wydatki',
        'value': expensesTotalMoney
    })

    return chart;
}

module.exports = router;