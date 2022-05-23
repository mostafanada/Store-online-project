import supertest from 'supertest';
import {user,userstore} from '../../Model/user.model';
import app from '../../index';
import client from '../../database';

const userTest = new userstore();
const request = supertest(app);
let token: string = '';

describe('User Endpoints', () => {
  beforeAll(async () => {
    const user:user = {
      first_name: 'Mostafa',
      last_name: 'Nada',
      username: 'MostafaNada',
      password_digest: '12345',
    };

    await userTest.create(user);
  });
  // afterAll(async () => {
  //   const conn = await client.connect();
  //   const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
  //   await conn.query(sql);
  //   conn.release();
  // });
  describe('Login method', () => {
    it('Get token', async () => {
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

  describe('CRUD methods', () => {
    it('Create new user', async () => {
      const res = await request
        .post('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          first_name: 'sasa',
          last_name: 'Nada',
          username: 'sasaNada',
          password_digest: '12345',
        });
      expect(res.status).toBe(200);
      
    });

    
    it('Get all of users', async () => {
      const res = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    
    it('Get spasific user', async () => {
      const res = await request
      .get('/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    
    it('Update user info', async () => {
      const res = await request
      .put('/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: 'Mostafasasa',
        last_name: 'Nada',
        username: 'Mostafasasa',
        password_digest: '12345',
      });
      expect(res.status).toBe(200);
      
      });
  });
});