const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    db.get().then((posts) => res.status(201).json(posts)).catch()
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id).then(response => res.status(201).json(response))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(response => res.status(201).json(response))
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    db.update(id, req.body).then(response => res.status(201).json(response))
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;