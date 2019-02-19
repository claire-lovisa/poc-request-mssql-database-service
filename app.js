import { app, query, errorHandler } from 'mu';

console.log(process.env);

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;

const config = {
  user: user,
  password: password,
  server: server,
  database: database,
  port: port,
  dialect: "mssql",
  dialectOptions: {
    instanceName: "SQLEXPRESS"
  },
  options: {
    encrypt: true
  }
}

const sql = require('mssql');

processMssql(config, sql);

async function processMssql(config, sql) {
  try {
    let pool = await sql.connect(config)

    let result1 = await pool.request()
      .query('select * from Customers')

    console.log(result1)
  } catch (err) {
    console.log(`An error has occured: ${err}`);
  }
}

app.use(errorHandler);
