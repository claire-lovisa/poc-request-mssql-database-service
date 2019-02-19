import { app, query, errorHandler } from 'mu';

console.log(process.env);

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;
const batchSize = parseInt(process.env.BATCH_SIZE);

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

    let rowsAffected = batchSize;
    let offset = 0;
    let loop = 1;

    while(rowsAffected == batchSize) {
      let result = await pool.request()
        .query(`SELECT * FROM Customers ORDER BY CustomerId OFFSET ${offset} ROWS FETCH NEXT ${batchSize} ROWS ONLY;`)
      console.log(`Batch number ${loop}: ${result.rowsAffected} rows affected`);

      offset += batchSize;
      loop += 1;
      rowsAffected = result.rowsAffected;
    }

  } catch (err) {
    console.log(`An error has occured: ${err}`);
  }
}

app.use(errorHandler);
