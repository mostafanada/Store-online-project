import client from "../database";
export type order = {
  id?: number | undefined;
  user_id: number;
  status: string;
};
export class orderstore {
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`connet get order ${err}`);
    }
  }
  async show(id: string): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`connet get order ${err}`);
    }
  }
  async delete(id: string): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const orders = result.rows[0];
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`connet get order ${err}`);
    }
  }
  async create(o: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (user_id,status) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      console.log(err);
      throw new Error(`unable create order (${o.user_id}): ${err}`);
    }
  }
  async update(o: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET user_id=$2 ,status=$3 WHERE id=$1 RETURNING *";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can not update order ${err}`);
    }
  }
}
