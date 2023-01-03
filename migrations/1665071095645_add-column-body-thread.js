/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('thread', {
        body: {
            type: "TEXT",
            notNull: true,
        }
    })
};

exports.down = pgm => {
    pgm.dropColumn('thread', 'body')
};
