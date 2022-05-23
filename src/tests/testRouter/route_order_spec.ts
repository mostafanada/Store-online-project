import supertest from 'supertest';
import db from '../../database';
import app from '../../index';
import {user,userstore} from '../../Model/user.model';

const userModel = new userstore();
const request = supertest(app);
let token: string = '';

describe('Orders API Endpoints', () => {
  beforeAll(async () => {
    const user = {
      first_name: 'Test',
      last_name: 'User',
      username: 'testUser',
      password_digest: 'test123'
    } as user;

    await userModel.create(user);
  });

  // afterAll(async () => {
  //   // clean db
  //   const connection = await db.connect();
  //   const sql =
  //     'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
  //   await connection.query(sql);
  //   connection.release();
  // });

  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/login')
        .set('Content-type', 'application/json')
        .send({
          username: 'testUser',
          password_digest: 'test123'
        });
        expect(res.status).toBe(200);
        token = res.body as unknown as string;
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: 1,
          status: 'active'
        });
      expect(res.status).toBe(200);
      
    });

    it('should get list of orders', async () => {
      const res = await request
        .get('/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      
    });

    it('should get order info', async () => {
      const res = await request
        .get('/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      
    });


    // it('should update order info', async () => {
    //   const res = await request
    //     .put('/orders/1')
    //     .set('Content-type', 'application/json')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({
    //       user_id: 1,
    //       status: 'active'
    //     });

    //   expect(res.status).toBe(200);
      
    // });

    // it('should delete order', async () => {
    //   const res = await request
    //     .delete('/orders/1')
    //     .set('Content-type', 'application/json')
    //     .set('Authorization', `Bearer ${token}`);
    //   expect(res.status).toBe(200);
      
    // });
  });
});