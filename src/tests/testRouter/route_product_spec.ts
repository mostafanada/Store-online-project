import supertest from 'supertest';
import db from '../../database';
import app from '../../index';
import {user,userstore} from '../../Model/user.model';

const userModel = new userstore();
const request = supertest(app);
let token: string = '';

describe('Products API Endpoints', () => {
  beforeAll(async () => {
    const user :user= {
        username: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password_digest: 'test123'
    } ;

    await userModel.create(user);
  });
  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
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
        token = res.body;
        // console.log(token);
      });
  });
  describe('Test CRUD API methods', () => {
    it('Get product', async () => {
      const res = await request
        .get('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(res.status).toBe(200);
      
    }); 
  });
});
