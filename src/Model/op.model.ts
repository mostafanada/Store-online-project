import client from "../database";
export type order_products = {
  id?: number;
  quantity: number;
  order_id?: number;
  product_id?: number;
};
export class DashboardQueries {
  async orderinproduct(): Promise<
    { order_id: number; name: string; price: string; quantity: number }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT order_id,name,price FROM products INNER JOIN order_products ON product.id = order_products.product_id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get order in product: ${err}`);
    }
  }
  async create(op: order_products): Promise<order_products> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity,order_id,product_id) VALUES($1, $2,$3) RETURNING *";
      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      console.log(err);
      throw new Error(
        `unable create order in product (${op.order_id}+${op.product_id}): ${err}`
      );
    }
  }
  async index(): Promise<order_products[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM order_products`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`connet get user ${err}`);
    }
  }
  async delete(id: string): Promise<order_products> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM order_products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const users = result.rows[0] as order_products;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`connet get user ${err}`);
    }
  }
}
