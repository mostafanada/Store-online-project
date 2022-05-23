import supertest from 'supertest';
import db from '../../database';
import app from '../../index';
import {user,userstore} from '../../Model/user.model';

const userModel = new userstore();
const request = supertest(app);
let token: string = '';

describe('Products API Endpoints', () => {
  beforeAll(async () => {
    const user:user = {
      first_name: 'Mostafa',
      last_name: 'Nada',
      username: 'MostafaNada',
      password_digest: '12345',
    };

    await userModel.create(user);
  });
  // afterAll(async () => {
  //   // clean db
  //   const connection = await db.connect();
  //   const sql =
  //     'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
  //   await connection.query(sql);
  //   connection.release();
  // });
  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/login')
        .set('Content-type', 'application/json')
        .send({
          username: 'MostafaNada',
          password_digest: '12345'
        });
      expect(res.status).toBe(200);
      token = res.body as unknown as string;
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product name',
          price: 910,
          category: 'ssss'
        });
      expect(res.status).toBe(200);
      
    });

    it('should get list of products', async () => {
      const res = await request
        .get('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      
    });

    it('should get product info', async () => {
      const res = await request
        .get('/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

  });
});