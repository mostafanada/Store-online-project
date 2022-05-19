import client from "../database";
import bcrypt from "bcrypt";
// import {Verify,Sign} from ss
export type user = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password_digest: string;
};
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
export class userstore {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`connet get user ${err}`);
    }
  }
  async show(id: string): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`connet get user ${err}`);
    }
  }
  async delete(id: string): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const users = result.rows[0] as user;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`connet get user ${err}`);
    }
  }
  async create(u: user): Promise<user> {
    const hash = bcrypt.hashSync(
      u.password_digest + pepper,
      parseInt(saltRounds as string)
    );
    try {
      // console.log("2");

      const conn = await client.connect();
      // console.log("3");
      const sql =
        "INSERT INTO users (first_name,last_name,username, password_digest) VALUES($1, $2,$3,$4) RETURNING * ";
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
      ]);
      // console.log("4");
      conn.release();
      const user = result.rows[0] as user;
      // console.log("5");
      return user;
    } catch (err) {
      console.log(err);
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }
  async update(u: user): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET first_name= $1 ,last_name= $2 ,username = $3 ,password_digest = $4   WHERE id=$5 RETURNING *";
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        u.password_digest,
        u.id,
      ]);
      const user = result.rows[0];
      console.log(user);
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`can not update user ${err}`);
    }
  }
  async authenticate(username: string, password: string) {
    try {
      const conn = await client.connect();
      const sql = "SELECT password_digest FROM users WHERE username=($1)";
      const result = await conn.query(sql, [username]);
      conn.release();

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Authentication failed. ${err}`);
    }
  }
}
