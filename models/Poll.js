const Model = require("objection").Model;
const Client = require("./Client");
const PollOption = require("./PollOption");

class Poll extends Model {
    static get tableName() {
        return 'poll';
    }
    
    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "fk_client_id"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", minLength: 1, maxLength: 255 },
                fk_client_id: { type: "integer" }
            }
        };
    }
    
    static get relationMappings() {
        return {
            poll_owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: `${__dirname}/Client`,
                join: {
                    from: "poll.fk_client_id",
                    to: "client.id"
                }
            },
            options: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/PollOption`,
                join: {
                    from: "poll.id",
                    to: "poll_option.fk_poll_id"
                }
            },
            voters: {
                relation: Model.ManyToManyRelation,
                modelClass: `${__dirname}/Client`,
                join: {
                    from: "poll.id",
                    through: {
                        from: "poll_client.poll_id",
                        to: "poll_client.client_id"
                    },
                    to: "client.id"
                }
            }
        };
    }
}

module.exports = Poll;