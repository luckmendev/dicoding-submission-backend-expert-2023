/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable('thread', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        title: {
          type: 'VARCHAR(100)',
          notNull: true,
        },
        owner: {
          type: 'VARCHAR(50)',
          notNull: true,
        },
      
      });
};

exports.down = pgm => {
    pgm.dropTable('thread');
};
