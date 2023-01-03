/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('thread', {
        date: {
            type: "VARCHAR(50)",
        }
    })
};

exports.down = pgm => {
    pgm.dropColumn('thread', 'date')
};
