require("dotenv/config");

const devConfig = [
    {
        name: 'default',
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
        "./src/models/*.ts"
        ],
        migrations: [
        "./src/database/migrations/*.ts"
        ],
        cli: {
            "migrationsDir": "./src/database/migrations"
        }
    },
];

const prodConfig = [
 {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [
   "./dist/models/*.js"
  ],
  migrations: [
   "./dist/database/migrations/*.js"
  ],
  cli: {
   "migrationsDir": "./dist/database/migrations"
  }
 },

];

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
