import supertest from 'supertest';
import db from '../../database';
import app from '../../index';
import { user, userstore } from '../../Model/user.model';
import { order,orderstore } from '../../Model/order.model';
import { product,productstore } from '../../Model/product.model';
import { order_products } from '../../Model/op.model';

const userModel = new userstore();
const productModel = new productstore();
const orderModel = new orderstore();
const request = supertest(app);
let token: string = '';

describe('Order_Product API Endpoints', () => {
    const user :user= {
        username: 'MostafaNada',
        first_name: 'Mostafa',
        last_name: 'Nada',
        password_digest: '12345'
    } ;

  const product:product = {
    name: 'Test name',
    price: 9,
    category: 'hhh'
  } ;

  const order:order = {
    user_id: 1,
    status: 'active'
  } ;

  const orderProduct:order_products = {
    quantity: 1,
    order_id: 1,
    product_id: 1
  } ;

  beforeAll(async () => {
    await userModel.create(user);
   });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authenticate method', () => {
    it('Get token', async () => {
        const res = await request
          .post('/login')
          .set('Content-type', 'application/json')
          .send({
            username: 'MostafaNada',
          password_digest: '12345'
          });
        expect(res.status).toBe(200);
        token = res.body;
        // console.log(token);
      });
  });
  describe('CRUD API methods', () => {
    it('Get order_in_product', async () => {
      const res = await request
        .get('/order_in_product')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(res.status).toBe(200);
      
    }); 
  });
  
});