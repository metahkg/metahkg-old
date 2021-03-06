const express = require("express");
const isInteger = require("is-sn-integer");
const { MongoClient } = require("mongodb");
const { mongouri } = require("../../common");
const router = express.Router();
router.get("/api/profile/:id", async (req, res) => {
  if (!isInteger(req.params.id) && !req.params.id === "self") {
    res.status(400);
    res.send({ error: "Bad request." });
    return;
  }
  const client = new MongoClient(mongouri);
  try {
    await client.connect();
    const users = client.db("metahkg-users").collection("users");
    const summary = client.db("metahkg-threads").collection("summary");
    const user = (
      await users
        .find(
          req.params.id === "self"
            ? { key: req?.cookies?.key }
            : { id: Number(req.params.id) }
        )
        .project(
          req.query.nameonly
            ? { user: 1, _id: 0 }
            : {
                id: 1,
                user: 1,
                createdAt: 1,
                avatar: 1,
                sex: 1,
                admin: 1,
                _id: 0,
              }
        )
        .toArray()
    )[0];
    if (!user) {
      res.status(400);
      res.send({ error: "User not found" });
      return;
    }
    !req.query.nameonly &&
      (user.count = await summary.countDocuments({ op: user.user }));
    res.send(user);
  } finally {
    await client.close();
  }
});
module.exports = router;
