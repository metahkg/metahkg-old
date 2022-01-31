//Signin
/*Syntax: POST /api/signin 
{
  user (username OR email): string,
  pwd (password): string
}
*/
//sets a cookie "key" if success
require("dotenv").config();
const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const { MongoClient } = require("mongodb");
const { mongouri } = require("../common");
const bcrypt = require("bcrypt");
router.post("/api/signin", body_parser.json(), async (req, res) => {
  const client = new MongoClient(mongouri);
  if (
    !req.body.user ||
    !req.body.pwd ||
    Object.keys(req.body).length > 2 ||
    !(typeof req.body.user === "string" && typeof req.body.pwd === "string")
  ) {
    res.status(400);
    res.send("Bad request");
    return;
  }
  await client.connect();
  const users = client.db("metahkg-users").collection("users");
  const data =
    (await users.findOne({ user: req.body.user })) ||
    (await users.findOne({ email: req.body.user }));
  if (!data) {
    res.status(404);
    res.send("User not found");
    return;
  }
  const correct = await bcrypt.compare(req.body.pwd, data.pwd);
  if (!correct) {
    res.status(401);
    res.send("Password incorrect");
    return;
  }
  res.cookie("key", data.key, {
    domain: process.env.domain,
    secure: true,
    httpOnly: true,
    path: "/",
    expires: new Date("2038-01-19T04:14:07.000Z"),
  });
  res.send({ key: data.key, id: data.id, user: data.user });
});
module.exports = router;
