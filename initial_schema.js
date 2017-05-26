module.exports.up = (knex) => {
  return knex.schema
    .createTableIfNotExists("client", (table) => {
        table.increments("id").primary();
        table.string("name");
    })
    .createTableIfNotExists("poll", (table) => {
        table.increments("id").primary();
        table.string("title");
        table.integer("fk_client_id").unsigned().references("id").inTable("client");
    })
    .createTableIfNotExists("poll_option", (table) => {
        table.increments("id").primary();
        table.string("message");
        table.integer("votes");
        table.integer("fk_poll_id").unsigned().references("id").inTable("poll");
    })
    .createTableIfNotExists("poll_client", (table) => {
        table.integer("client_id").unsigned().references("id").inTable("client");
        table.integer("poll_id").unsigned().references("id").inTable("poll");
    });
};

module.exports.down = (knex) => {
    return knex.schema
      .dropTableIfExists("poll_option")
      .dropTableIfExists("poll_client")
      .dropTableIfExists("poll")
      .dropTableIfExists("client")
};
