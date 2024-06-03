const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Item',
    tableName: 'item',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar',
            unique: true
        },
        damage: {
            type: 'int'
        },
        description: {
            type: 'text'
        },
        price: {
            type: 'int'
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: true
        }
    }
});