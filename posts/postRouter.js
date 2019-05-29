const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    db.find().then((posts) => res.status(201).json(posts)).catch()
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;