import client from "../database";
export type product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
export class productstore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`connet get product ${err}`);
    }
  }
  async show(id: string): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`connet get product ${err}`);
    }
  }
  async delete(id: string): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const products = result.rows[0];
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`connet get product ${err}`);
    }
  }
  async create(u: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name,price,category) VALUES($1, $2,$3) RETURNING *";
      const result = await conn.query(sql, [u.name, u.price, u.category]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`unable create product (${u.name}): ${err}`);
    }
  }
  async update(u: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE products SET name=$2 ,price=$3,category=$4 WHERE id=$1 RETURNING *";
      const result = await conn.query(sql, [u.name, u.price, u.category]);
      const product = result.rows[0];
      console.log("here");
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`can not update product ${err}`);
    }
  }
}
