const express = require('express');
const db = require('./userDb');
const postdb = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
    db.insert(req.body).then(response => {
        res.status(201).json(response);
    })
});

router.post('/:id/posts', (req, res) => {
    const { text, user_id } = req.body;
    postdb.insert({ text, user_id }).then(response => res.status(201).json(response))
});

router.get('/', (req, res) => {
    db.get().then(response => res.status(201).json(response))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id).then(response => res.status(201).json(response))
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    db.getUserPosts(id).then(response => res.status(201).json(response))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(response => res.status(201).json(response))
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.update(id, req.body).then(response => res.status(201).json(response))
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
