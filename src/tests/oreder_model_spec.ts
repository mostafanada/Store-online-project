import { user, userstore } from "../Model/user.model";
import { product, productstore } from "../Model/product.model";
import { order, orderstore } from "../Model/order.model";
import client from "../database";

const userTestModel = new userstore();
const productTestModel = new productstore();
const orderTestModel = new orderstore();

describe("Order Model", () => {
  describe("Test methods exist", () => {
    it("should have an index method", () => {
      expect(orderTestModel.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(orderTestModel.show).toBeDefined();
    });

    it("should have a create method", () => {
      expect(orderTestModel.create).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(orderTestModel.delete).toBeDefined();
    });
  });

  describe("Test Model logic", () => {
    const user: user = {
      first_name: "Mostafa",
      last_name: "Nada",
      password_digest: "test",
      username: "MostafaNada",
    };

    const product: product = {
      name: "test name",
      price: 20,
      category: "aaa",
    };

    const orders: order = {
      user_id: 1,
      status: "active",
    };

    beforeAll(async () => {
      await userTestModel.create(user);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
      await connection.query(sql);
      connection.release();
    });
    it("Add an order", async () => {
      const createdOrder = await orderTestModel.create(orders);
      expect(createdOrder.id).toEqual(1);
    });

    it("List of orders", async () => {
      const orders = await orderTestModel.index();
      expect(orders.length).toBeGreaterThan(0);
    });

    it("Return the correct order", async () => {
      const returnedOrder = await orderTestModel.show("1");
      expect(returnedOrder.id).toEqual(1);
    });
  });
});
