// import dotenv from "dotenv";
// import { Pool } from "pg";

// dotenv.config();

// // const Host = process.env.HOST;
// // const Database = process.env.DB;
// // const Database_test = process.env.DB_TEST;
// // const Username_test = process.env.USER_TES;
// // const password = process.env.PASSWPRD as string;
// // const ENV = process.env.ENV;
// // const env = process.env.ENV || "test";

// const db = {
//     database: process.env.pg_db,
//     user: process.env.pg_user ,
//     password: (process.env.pg_password)as string,
// };

// if(process.env.ENV=== 'test') db.database = process.env.DB_TEST;
// console.log(process.env.ENV);
// const client = new Pool({
//   user: db.user,
//   password: db.password as string
// });

// export default client;
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const { host, pg_db, DB_TEST, pg_user, pg_password, ENV, TOKEN_SECRET } =
  process.env;
let client: Pool;

if (ENV === "test") {
  console.log("test environment");
  client = new Pool({
    host: host,
    database: DB_TEST,
    user: pg_user,
    password: pg_password,
  });
} else {
  console.log("develope environment");
  client = new Pool({
    host: host,
    database: pg_db,
    user: pg_user,
    password: pg_password,
  });
}

export default client;
