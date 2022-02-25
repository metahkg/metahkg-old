// get 20 neweat/hottezt threads in a category
// note: category 1 returns all categories
// Syntax: GET /api/menu/<category id>?sort=<0 | 1>&page=<number>
const express = require("express");
const isInteger = require("is-sn-integer");
const { MongoClient } = require("mongodb");
const { mongouri } = require("../../common");
const router = express.Router();
router.get("/api/menu/:category", async (req, res) => {
  if (
    (!isInteger(req.params.category) &&
      !req.params.category.startsWith("bytid")) ||
    (req.params.category.startsWith("bytid") &&
      !isInteger(req.params.category.replace("bytid", ""))) ||
    !req.query.sort ||
    ![0, 1].includes(Number(req.query.sort)) ||
    (req.query.page && !isInteger(req.query.page))
  ) {
    res.status(400);
    res.send({ error: "Bad request." });
    return;
  }
  const client = new MongoClient(mongouri);
  const sort = Number(req.query.sort);
  const page = Number(req.query.page) || 1;
  try {
    await client.connect();
    let category = Number(req.params.category);
    const summary = client.db("metahkg-threads").collection("summary");
    const hottest = client.db("metahkg-threads").collection("hottest");
    if (req.params.category.startsWith("bytid")) {
      const s = await summary.findOne({
        id: Number(req.params.category.replace("bytid", "")),
      });
      if (!s || !s.category) {
        res.status(404);
        res.send({ error: "Not found." });
        return;
      }
      category = s.category;
    }
    if (
      !(await client
        .db("metahkg-threads")
        .collection("category")
        .findOne({ id: category }))
    ) {
      res.status(404);
      res.send({ error: "Not found." });
      return;
    }
    const data = sort
      ? await hottest
          .find(category === 1 ? {} : { category: category })
          .sort({ c: -1, lastModified: -1 })
          .skip(25 * (page - 1))
          .limit(25)
          .toArray()
      : await summary
          .find(category === 1 ? {} : { category: category })
          .sort({ lastModified: -1 })
          .skip(25 * (page - 1))
          .limit(25)
          .toArray();
    await (sort &&
      (async () => {
        for (let index = 0; index < data.length; index++) {
          data[index] = await summary.findOne({ id: data[index].id });
        }
      })());
    res.send(data.length ? data : [null]);
  } finally {
    await client.close();
  }
});
module.exports = router;
