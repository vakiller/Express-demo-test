const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'varchar',
            unique: true
        },
        password: {
            type: 'varchar'
        },
        role: {
            type: 'varchar'
        }
    }
});