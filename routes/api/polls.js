const Poll = require("./../../models/Poll");
const PollOption  = require("./../../models/PollOption");
const Client = require("./../../models/Client");
const bodyParser = require("body-parser");
const objection = require("objection");
const jsonParser = bodyParser.json();
const jsend = require("./../../helpers/jsend");
const router = require("express").Router();

router.get("/", (req, res, next) => {
    if (typeof Number(req.query.page) !== "number") {
      res.sendStatus(400);
      return;
    }

    const page = req.query.page;
    const maxRecordsPerPage = 20;

    Poll
      .query()
      .offset((page - 1) * maxRecordsPerPage)
      .limit(maxRecordsPerPage)
      .then((polls) => {
        let result = { polls: [] };
        return Promise.all(polls.map((poll) => {
          return poll
            .$relatedQuery("options")
            .whereNotNull("id")
            .then((poll_options) => {
              return poll
                .$relatedQuery("poll_owner")
                .whereNotNull("id")
                .then(() => result.polls.push(poll.toJSON()))
            })
        }))
        .then(() => {
          res.set("Content-Type", "application/json");
          res.send(jsend.success(result));
        })
        .catch(next);
      })
      .catch(next);
});

router.get("/:id", (req, res, next) => {
  Poll
    .query()
    .findById(req.params.id)
    .then((poll) => {
      return poll
              .$relatedQuery("options")
              .whereNotNull("id")
              .then((options) => {
                poll
                  .$relatedQuery("poll_owner")
                  .whereNotNull("id")
                  .then(() => {
                    res.set("Content-Type", "application/json");
                    res.send(jsend.success(poll.toJSON()));
                  })
              })
    })
});

router.post("/", jsonParser, (req, res, next) => {
  objection.transaction(Client, Poll, PollOption, (
    Client,
    Poll,
    PollOption
  ) =>
    {
      return Client
        .query()
        .where(
          "name",
          req.session.username
            ? req.session.username
            : req.ip
        )
        .first()
        .then(client => {
          return client
            .$relatedQuery("polls_created")
            .insert({ title: req.body.title })
            .then(poll => {
              return Promise.all(
                req.body.options.map(option => {
                  return poll
                    .$relatedQuery("options")
                    .insert({
                      message: option.message,
                      votes: 0
                    })
                 })
              ).then(() => {
                res.set("Content-Type", "application/json");
                res.send(
                  jsend.success(
                    Object.assign({}, {
                      poll: Object.assign(poll.toJSON(), {
                        options: req.body.options
                      })
                    })
                  )
                );
              }).catch(next);
            })
            .catch(next);
        })
        .catch(next);
    });
});


router.delete("/:id", (req, res, next) => {
    Poll
      .query()
      .deleteById(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(next);
});

module.exports = router;