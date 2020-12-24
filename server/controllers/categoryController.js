const express = require('express');
const router = express.Router();

const Category = require('../models/category');
const { stringify } = require('querystring');

router.get('/', function(req, res) {
    Category.find({})
    .exec((error, categories) => {
        if (error) console.error(error);
        else {
            res.json(categories);
        }
    })
})

router.get('/:name', function(req, res) {
    Category.findOne({name: req.params.name})
    .exec((error, category) => {
        if (error) console.error(error);
        else {
            res.json(category);
        }
    })
})

router.get('/choose-category/:name', function(req, res) {
    Category.find({})
    .exec((error, categories) => {
        if (error) console.error(error) 
        else {
            let words = req.params.name.toLowerCase().split(' ');
            words.map(word => {
                categories.map(category => {
                    if (category.matches.length == 0) category.matches.push({name: word, amount: 1})
                    else {
                        let isWordFound = false;
                        category.matches.map(match => {
                            if (match.name == word) {
                                isWordFound = true;
                                return;
                            }
                        })
                        if (!isWordFound) {
                            category.matches.push({name: word, amount: 1})
                        }
                        isWordFound = false;
                    }
                })
            })

            categories.map(category => {
                category.save();
            })

            let numberOfAppearancesOfTheCategories = Array(categories.length).fill(0);
            categories.map((category,index) => {
                category.matches.map(match => {
                    numberOfAppearancesOfTheCategories[index] += match.amount;
                })
            })

            let totalNumberOfAppearancesOfAllCategories = 0;
            numberOfAppearancesOfTheCategories.map(number => {
                totalNumberOfAppearancesOfAllCategories += number;
            })

            let probabilityOfOccurenceOfTheCategories = []
            for(let i = 0;i < categories.length;i++) {
                let probability = numberOfAppearancesOfTheCategories[i]/totalNumberOfAppearancesOfAllCategories
                probabilityOfOccurenceOfTheCategories.push({'probability': probability, 'name': categories[i].name});
            }
            
            let probabilityOfOccurenceOfWordInCategory = [];
            words.map(word => {
                categories.map((category,index) => {
                    category.matches.map(match => {
                        if (match.name == word) {
                            probability = match.amount/numberOfAppearancesOfTheCategories[index];
                            probabilityOfOccurenceOfWordInCategory.push({'word': word, 'category': category.name, 'probability': probability})
                        }
                    })
                })
            })

            let proportionalToTheProbality = []
            for(let i = 0;i < categories.length; i++) {
                let result = probabilityOfOccurenceOfTheCategories[i].probability;
                probabilityOfOccurenceOfWordInCategory.map(probability => {
                    if (probabilityOfOccurenceOfTheCategories[i].name == probability.category) {
                        result *= probability.probability;
                    }
                })
                proportionalToTheProbality.push(result);
            }

            let result = proportionalToTheProbality[0];
            let resultIndex = 0;
            proportionalToTheProbality.map((proportional,index) => {
                if (proportional > result) {
                    result = proportional;
                    resultIndex = index;
                }
            })

            res.json(resultIndex);
        }
    })
})

router.post('/create', function(req, res) {
    let category = new Category(req.body);
    category.matches = [];
    category.save((error) => {
        if (error) console.error(error);
        else {
            res.send().status(200);
        }
    })
})

router.put('/update', function(req, res) {

    Category.findByIdAndUpdate({_id: req.body._id}, {$set: {matches: req.body.matches, name: req.body.name, icon: req.body.icon}}, (error, doc) => {
        if (error) console.error(error);
        else {
            res.send().status(200);
        }
    })
})

router.delete('/delete/:id', function(req, res) {

    Category.findByIdAndDelete({_id: req.params.id}, (error) => {
        if (error) console.error(error);
        else {
            res.send().status(200);
        }
    })
})

module.exports = router;