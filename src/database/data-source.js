const {DataSource} = require('typeorm');
const {config} = require('dotenv');

const stage = process.env.NODE_ENV;
config({ path: stage ? `.env.${stage}`: '.env.development' });
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;
console.log({HOST: DB_HOST})
const AppDataSource = new DataSource(
    {
        type: 'postgres',
        host: DB_HOST,
        port: parseInt(DB_PORT || "5432"),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        schema: 'public',
        synchronize: false,
        logging: true,
        entities: [__dirname + '/entities/*.js'],
        migrations: [__dirname + '/migration/*.js'],
        cli: {
          migrationsDir: 'src/database/migration',
        }
    }
);

module.exports = { AppDataSource };
