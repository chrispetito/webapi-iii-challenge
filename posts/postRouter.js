const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(posts => res.status(201).json(posts))
    .catch(err =>
      res.status(500).json({ message: "Error getting users posts" })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(response => res.status(201).json(response))
    .catch(err =>
      res.status(500).json({ message: "Error getting user posts" })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => res.status(201).json(response))
    .catch(err =>
      res.status(500).json({ message: "Error deleting user posts" })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error adding user post" }));
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
