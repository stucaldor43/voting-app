const Model = require("objection").Model;
const Poll = require("./Poll");

class Client extends Model {
    static get tableName() {
        return 'client';
    }
    
    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 }
            }
        };
    }
    
    static get relationMappings() {
        return {
            polls_created: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/Poll`,
                join: {
                    from: "client.id",
                    to: "poll.fk_client_id"
                }
            },
            polls_voted_on: {
                relation: Model.ManyToManyRelation,
                modelClass: `${__dirname}/Poll`,
                join: {
                    from: "client.id",
                    through: {
                        from: "poll_client.client_id",
                        to: "poll_client.poll_id"
                    },
                    to: "poll.id"
                }
            }
        };
    }
}

module.exports = Client;