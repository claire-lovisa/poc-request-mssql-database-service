# poc-request-mssql-database-service

PoC microservice that communicates with a MSSQL database

## Installation

### Environment variables

```
DB_SERVER: required, the server/host of the database: '172.24.0.3'
DB_PORT: required, the port: 1433
DB_NAME: required, the name of the database: 'PoC_DB'
DB_USER: required, the user of the database: 'sa'
DB_PASSWORD: required, the password of the database 'ThisIsAVeryStrongPassword!'
BATCH_SIZE: required, the size of the batches we want from the DB: 5
```
