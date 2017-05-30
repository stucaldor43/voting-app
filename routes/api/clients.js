const Client = require("./../../models/Client");
const Poll = require("./../../models/Poll");
const PollOptions = require("./../../models/PollOption");
const router = require("express").Router();
const objection = require("objection");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jsend = require("./../../helpers/jsend");

router.post("/", (req, res, next) => {
    objection.transaction(Client, (Client) => {
      return Client
        .query()
        .where("name", req.session.username || req.ip)
        .then((registeredUsersWithName) => {
          if (registeredUsersWithName.length > 0) {
              return res.sendStatus(400);
          }
          return Client
                .query()
                .insert({ name: req.session.username || req.ip })
                .then((newClient) => {
                  res.set("Content-Type", "application/json");
                  res.send(jsend.success({ client: newClient.toJSON() }))
                })
                .catch(next);
          })
        .catch(next);
      });
});

router.delete("/:id", (req, res, next) => {
    Client
      .query()
      .deleteById(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(next);
});

router.get("/:id/createdPolls", (req, res, next) => {
    if (typeof Number(req.query.page) !== "number") {
      res.sendStatus(400);
      return;
    }

    const page = req.query.page;
    const maxRecordsPerPage = 20;
    
    return Poll
      .query()
      .where("fk_client_id", req.params.id)
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
    .catch(next)
    
});



router.get("/:id/votedUponPolls", (req, res, next) => {
    Client
      .query()
      .findById(req.params.id)
      .then((client) => {
        return client
          .$relatedQuery("polls_voted_on")
          .whereNotNull("id")
          .then((polls) => {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(polls))
          });
      })
      .catch(next);
});

router.post("/:id/votedUponPolls/:pollId", (req, res, next) => {
    objection.transaction(Client, (Client) => {
      return Client
              .query()
              .findById(req.params.id)
              .then((client) => {
                return client
                        .$relatedQuery("polls_voted_on")
                        .relate(req.params.pollId)
                        .then(() => res.sendStatus(204));
              })
              .catch(next)
    });
});

module.exports = router;