
exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
      table.increments('id');
      table.string('username');
      table.string('password');
    })
    
    .createTable('familyMembers', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.date('dateOfBirth').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('familyMembers');
  };
  