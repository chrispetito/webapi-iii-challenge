const express = require("express");
const db = require("./userDb");
const postdb = require("../posts/postDb");

const server = express();

const router = express.Router();
server.use(express.json());

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => res.status(500).json({ message: "Error adding new user" }));
});

router.post("/:id/posts", validatePost, (req, res) => {
  const { text, user_id } = req.body;
  postdb
    .insert({ text, user_id })
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error adding to posts" }));
});

router.get("/", (req, res) => {
  db.get()
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error getting users" }));
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error getting user" }));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(response => res.status(201).json(response))
    .catch(err =>
      res.status(500).json({ message: "Error getting user posts" })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error deleting user" }));
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.update(id, req.body)
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ message: "Error editing " }));
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = db.getById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body.user_id) {
    res.status(400).json({ message: "missing user data" });
  } else if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body.user_id) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
