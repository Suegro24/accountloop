const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Firm = require('../models/firm');

router.get('/currentMonthChart/:id', (req,res) => {
    User.findById(req.params.id) 
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            let chart = getCurrentMonthChart(user.budget, req.query.month);
            res.json(chart);
        }
    })
})

router.get('/currentMonthChart/firm/:id', (req,res) => {
    Firm.findById(req.params.id)
    .exec((error, firm) => {
        if (error) console.error(error) 
        else {
            let chart = getCurrentMonthChart(firm.firmBudget, req.query.month);
            res.json(chart);
        }
    })
})

router.get('/currentMonthVerticalIncomeExpenseChart/:id', (req,res) => {
    User.findById(req.params.id)
    .exec((error, user) => {
        if (error) console.error(error) 
        else {
            let chart = getCurrentVerticalIncomeExpenseChart(user.budget, req.query.month);
            res.json(chart);
        }
    })
})

router.get('/currentMonthVerticalIncomeExpenseChart/firm/:id', (req,res) => {
    Firm.findById(req.params.id)
    .exec((error, firm) => {
        if (error) console.error(error) 
        else {
            let chart = getCurrentVerticalIncomeExpenseChart(firm.firmBudget, req.query.month);
            res.json(chart);
        }
    })
})

router.get('/forecasting-chart/:id', (req,res) => {
    User.findById(req.params.id) 
    .exec((error, user) => {
        if (error) console.error(error);
        else {
            let chart = getForecastingChart(user.budget);
            res.json(chart);
        }
    })
})

router.get('/forecasting-chart/firm/:id', (req,res) => {
    Firm.findById(req.params.id) 
    .exec((error, firm) => {
        if (error) console.error(error);
        else {
            let chart = getForecastingFirmChart(firm.firmBudget);
            res.json(chart);
        }
    })
})

function getCurrentMonthChart(budget, month) {
    let amountOfDaysInCurrentMonth = new Date();
    let searchedMonth;

    if (month === undefined) searchedMonth = new Date().getMonth();
    else searchedMonth = month;

    amountOfDaysInCurrentMonth = new Date(amountOfDaysInCurrentMonth.getFullYear(), amountOfDaysInCurrentMonth.getMonth()+1, 0).getDate();
    let chart = [{
        "name": `Budżet`,
        "series": []
    }];
    let money = 0;
    for(let i = 1; i<= amountOfDaysInCurrentMonth; i++) {
        let arrayOfBudgetChanges = [];
        budget.income.forEach(income => {
            if (income.date.getUTCDate() == i && new Date(income.date).getMonth() == searchedMonth && income.status != 'Waiting') arrayOfBudgetChanges.push(income);
        })
        budget.expense.forEach(expense => {
            if (expense.date.getUTCDate() == i && new Date(expense.date).getMonth() == searchedMonth) arrayOfBudgetChanges.push(expense);
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

function getCurrentVerticalIncomeExpenseChart(budget, searchedMonth) {
    let amountOfDaysInCurrentMonth = new Date();

    if (searchedMonth === undefined) searchedMonth = new Date().getMonth();

    amountOfDaysInCurrentMonth = new Date(amountOfDaysInCurrentMonth.getFullYear(), amountOfDaysInCurrentMonth.getMonth()+1, 0).getDate();
    let chart = [];
    let expensesTotalMoney = 0;
    let incomesTotalMoney = 0;

    budget.income.forEach(income => {
        if (new Date(income.date).getMonth() == searchedMonth && income.status != 'Waiting') incomesTotalMoney += income.money;
    })

    budget.expense.forEach(expense => {
        if (new Date(expense.date).getMonth() == searchedMonth) expensesTotalMoney += expense.money;
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

function getForecastingChart(budget) {

    let amountOfDaysInCurrentMonth = new Date();
    amountOfDaysInCurrentMonth = new Date(amountOfDaysInCurrentMonth.getFullYear(), amountOfDaysInCurrentMonth.getMonth()+1, 0).getDate();

    let chart = [{
        'name': 'Obecny stan',
        'series': []
    }]

    chart[0].series = getCurrentMonthChart(budget)[0].series;

    let resultsOfAllMonths = [];

    for(let i = 1;i < 12;i++) {
        let month = new Date().getMonth();
        month-=i;
        if (month <= 0) month+=12;

        let result = getCurrentMonthChart(budget, month)[0].series;
        resultsOfAllMonths.push(...result);
    }

    let forecasting = {
        name: 'Przewidywany stan',
        series: []
    }
    for(let i = 0; i < amountOfDaysInCurrentMonth; i++) {
        let average = 0;
        
        resultsOfAllMonths.map(result => {
            if (result.name == i) average += result.value;
        })
        average = average/12;
        forecasting.series.push({name: i+1, value: average});
    }
    chart.push(forecasting);

    return chart;

}

module.exports = router;