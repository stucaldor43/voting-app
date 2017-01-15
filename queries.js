const promise = require("bluebird");

const options = {
    host: "localhost",
    port: 5432,
    database: process.env["DATABASE_NAME"],
    user: "postgres",
    password: process.env["DATABASE_PASSWORD"],
};

const pgp = require('pg-promise')({promiseLib: promise});
const db = pgp(options);

function getAllPolls(req, res, next) {
    db.any("select * from Poll")
      .then(function(data) {
          res.status(200)
            .json({
                status: "success",
                data: data,
                message: "All polls retrieved"
            });
      })
      .catch(function(err) {
        return console.log(err);      
      });
}

function getPoll(req, res, next) {
    db.any("select * from Poll join PollOptions on (Poll.id = PollOptions.fk_poll_id) where Poll.id=$1", parseInt(req.params.id))
      .then(function(data) {
        res.status(200)
          .json({
              status: "success",
              data: data,
              message: `Poll ${req.params.id} retrieved`
          });
      })
      .catch(function(err) {
          return console.log(err);
      });
}

function createPoll(req, res, next) {
    db.one("insert into Poll(title, fk_client_id) values($1, $2) returning *", [req.body.title, req.body.client_id])
      .then((data) => {
        db.tx((t) => {
          const statements = req.body.options.map((pollOptionMessage, index, arr) => {
            return db.one("insert into PollOptions(message, votes, fk_poll_id) values($1, $2, $3)", [pollOptionMessage, 0, data.id]);
          });
        
          return t.batch(statements);
        })
          .then((transactionData) => {
           res.status(201)
            .json({
              status: "success",
              data, transactionData,
              message: "Poll created"
            });
          })
          .catch((err) => {
            return console.log(err);
          });
      });
}

function deletePoll(req, res, next) {
    db.none("delete from Poll where id=$1", req.params.id)
      .then((data) => {
          res.status(200)
            .json({
                status: "success",
                data: data,
                message: `Poll ${req.params.id} deleted`
            });
      })
      .catch((err) => {
          return console.log(err);
      });
}

function getAllClients(req, res, next) {
    db.any("select * from Client")
      .then(function(data) {
          res.status(200)
            .json({
                status: "success",
                data: data,
                message: "All clients retrieved"
            });
      })
      .catch(function(err) {
         return console.log(err); 
      });
}

function createClient(req, res, next) {
    db.none("insert into Client(name) values($1)", req.ip)
      .then(function() {
        console.log("client added");
      });
}

function createVoter(req, res, next) {
    db.manyOrNone("select * from Voter where name=$1 and fk_poll_id=$2", [req.body.name, req.body.fk_poll_id])
      .then((data) => {
        if (data.length > 0) {
          res.status(200)
          .json({
              status: "fail",
              message: "Voter already exists"
          });  
        }
        else {
          db.none("insert into Voter(name, fk_poll_id) values($1, $2)", [req.body.name, req.body.fk_poll_id])
            .then(() => {
              res.status(200)
                .json({
                    status: "success",
                    message: "Voter created"
                });
            });  
        }
      });
    
}

function getQueryResult(req, res, next) {
    db.any(req.body.query, [])
      .then(function(data) {
          res.status(200)
            .json({
                status: "success",
                data: data,
                message: "Query executed"
            });
      })
      .catch(function(err) {
         return console.log(err); 
      });
}

module.exports = {
    getAllPolls,
    getPoll,
    createPoll,
    deletePoll,
    getAllClients,
    createClient,
    createVoter,
    getQueryResult
};