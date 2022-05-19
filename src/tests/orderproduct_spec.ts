import { user, userstore } from "../Model/user.model";
import { product, productstore } from "../Model/product.model";
import { order, orderstore } from "../Model/order.model";
import { order_products, DashboardQueries } from "../Model/op.model";
import client from "../database";
const userTestModel = new userstore();
const productTestModel = new productstore();
const orderTestModel = new orderstore();
const dashTestModel = new DashboardQueries();
describe("orderProduct Model", () => {
  describe("Test methods exist", () => {
    it("Have a orderinproduct", () => {
      expect(dashTestModel.orderinproduct).toBeDefined();
    });
  });
  describe("Test Model logic", () => {
    const user: user = {
      first_name: "Mostafa",
      last_name: "Nada",
      password_digest: "test",
      username: "MostafaNada",
    };

    const products: product = {
      name: "test name",
      price: 20,
      category: "aaa",
    };

    const orders: order = {
      user_id: 1,
      status: "active",
    };
    const order_in_product: order_products = {
      quantity: 20,
      order_id: 1,
      product_id: 1,
    };
    //         id? :number,
    //   quantity :number,
    //   order_id? :number,
    //   product_id?:number
    beforeAll(async () => {
      await userTestModel.create(user);
      await orderTestModel.create(orders);
      await productTestModel.create(products);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
      await connection.query(sql);
      connection.release();
    });
    it("Add an dash", async () => {
      const createdOrderProduct = await dashTestModel.create(order_in_product);
      expect(createdOrderProduct.quantity).toEqual(20);
    });
  });
});
