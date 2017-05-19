const Model = require("objection").Model;
const Poll = require("./Poll");

class PollOption extends Model {
    static get tableName() {
        return 'poll_option';
    }
    
    static get jsonSchema() {
        return {
            type: "object",
            required: ["message", "votes", "fk_poll_id"],
            properties: {
                id: { type: "integer" },
                message: { type: "string", minLength: 1, maxLength: 255 },
                votes: { type: "integer" },
                fk_poll_id: { type: "integer" }
            }
        };
    }
    
    static get relationMappings() {
        return {
            owning_poll: {
                relation: Model.BelongsToOneRelation,
                modelClass: `${__dirname}/Poll`,
                join: {
                    from: 'poll_option.fk_poll_id',
                    to: "poll.id"
                }
            }
            
        };
    }
}

module.exports = PollOption;