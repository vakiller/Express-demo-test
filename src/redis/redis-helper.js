const { clientRedis } = require('./redis-connection');

async function setStringRedis(key, value, expriedTime) {
    await clientRedis.set(key, value, 'EX', expriedTime);
}

async function getStringRedis(key) {
    return await clientRedis.get(key);
}

module.exports = { setStringRedis, getStringRedis }