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

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(response => res.status(201).json(response))
    .catch(err =>
      res.status(500).json({ message: "Error getting user posts" })
    );
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => res.status(201).json(response))
    .catch(err =>
      res.status(500).json({ message: "Error deleting user posts" })
    );
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error adding user post" }));
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;
    const post = db.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: "invalid post id" });
    }
  }

module.exports = router;
