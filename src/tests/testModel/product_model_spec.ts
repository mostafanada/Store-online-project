import { user, userstore } from "../../Model/user.model";
import { product, productstore } from "../../Model/product.model";
import { order, orderstore } from "../../Model/order.model";
import client from "../../database";
const userTestModel = new userstore();
const productTestModel = new productstore();
const orderTestModel = new orderstore();

describe("Product Model", () => {
  describe("Test methods exist", () => {
    it("should have an index method", () => {
      expect(productTestModel.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(productTestModel.show).toBeDefined();
    });

    it("should have a create method", () => {
      expect(productTestModel.create).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(productTestModel.delete).toBeDefined();
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

    beforeAll(async () => {
      await userTestModel.create(user);
      await orderTestModel.create(orders);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
      await connection.query(sql);
      connection.release();
    });
    it("Add an pruduct", async () => {
      const createdproduct = await productTestModel.create(products);
      expect(createdproduct.id).toEqual(1);
    });

    it("List of product", async () => {
      const products = await productTestModel.index();
      expect(products.length).toBeGreaterThan(0);
    });

    it("Return the correct product", async () => {
      const returnedproduct = await productTestModel.show("1");
      expect(returnedproduct.id).toEqual(1);
    });
  });
});
