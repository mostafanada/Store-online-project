import client from "../database";

export class DashboardQueries {
  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }
}
