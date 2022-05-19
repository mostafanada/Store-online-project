import client from "../database";
import { user, userstore } from "../Model/user.model";

const store = new userstore();
let user_test: user;

describe("User Model", () => {
  describe("CRUD methods", () => {
    it("Have an index method", () => {
      expect(store.index).toBeDefined();
    });
    it("Have a show method", () => {
      expect(store.show).toBeDefined();
    });
    it("Have a create method", () => {
      expect(store.create).toBeDefined();
    });
    it("Have an update method", () => {
      expect(store.update).toBeDefined();
    });
    it("Have a delete method", () => {
      expect(store.delete).toBeDefined();
    });
  });
  // afterAll(async () => {
  //   const conn = await client.connect();
  //   const sql =
  //     'DELETE FROM order_products;\nDELETE FROM orders;\nDELETE FROM products;\nDELETE FROM users;';
  //   await conn.query(sql);
  //   conn.release();
  // });
  it("add a user", async () => {
    const result = await store.create({
      first_name: "Mostafa",
      last_name: "Nada",
      username: "MostafaNada",
      password_digest: "test",
    });
    user_test = result;
    expect(result.first_name).toEqual("Mostafa");
    expect(result.last_name).toEqual("Nada");
    expect(result.username).toEqual("MostafaNada");
  });

  it("list of users", async () => {
    const result = await store.show("1");
    expect(result.first_name).toEqual("Mostafa");
    expect(result.last_name).toEqual("Nada");
    expect(result.username).toEqual("MostafaNada");
  });

  it("Should get all users", async () => {
    const users = await store.index();
    expect(users.length).toBeGreaterThan(0);
  });
});
