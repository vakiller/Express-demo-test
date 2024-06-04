const {AppDataSource} = require('../database/data-source');

const repositories = {};

const loadRepository = (entityName) => {
    if (!repositories[entityName]) {
        repositories[entityName] = AppDataSource.getRepository(entityName);
    }

    return repositories[entityName];
}

module.exports = {loadRepository}