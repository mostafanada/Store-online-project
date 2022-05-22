import supertest from 'supertest';
import client from '../../database';
import app from '../../index';
import { user,userstore } from '../../Model/user.model';

const userModel = new userstore();
const request = supertest(app);
let token: string = '';

describe('User API Endpoints', () => {
  beforeAll(async () => {
    const user :user= {
      username: 'MostafaNada',
      first_name: 'Mostafa',
      last_name: 'Nada',
      password_digest: '12345'
  } ;

    await userModel.create(user);
  });
  afterAll(async () => {
    // clean db
    const connection = await client.connect();
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
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

  describe('Test CRUD API methods', () => {
    it('Create new user', async () => {
      const res = await request
        .post('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'testUser2',
          first_name: 'Test2',
          last_name: 'User2',
          password_digest: 'test123'
        });
      expect(res.status).toBe(200);
      
      const {username,first_name,last_name } = res.body;
      expect(username).toBe('testUser2');
      expect(first_name).toBe('Test2');
      expect(last_name).toBe('User2');
    });
  });
});