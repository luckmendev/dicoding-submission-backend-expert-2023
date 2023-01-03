/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('comments', {
        date: {
            type: "VARCHAR(50)",
        }
    })
};

exports.down = pgm => {
    pgm.dropColumn('comments', 'date')
};
