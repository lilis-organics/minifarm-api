'use strict';

const request = require('supertest');
const server = require('../src/app.js');

// tests for app
// Generated by serverless-jest-plugin

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(server, { handler: 'handler' });

beforeAll(async () => {
  console.log('Jest starting!');
});

afterAll(async () => {
  server.close();
  console.log('Server closed!');
});

describe('app', () => {
  beforeAll(done => {
    //  lambdaWrapper.init(liveFunction); // Run the deployed lambda

    done();
  });

  it('roots test', async () => {
    let res = await request(server).get('/');
    return wrapped.run({}).then(response => {
      expect(res.status).toEqual(200);
      expect(res.text).toContain('Welcome to minifarm!');
    });
  });

  it('dogs test', async () => {
    let res = await request(server).get('/dogs');
    return wrapped.run({}).then(response => {
      expect(res.status).toEqual(200);
      expect(res.text).toContain('akita');
    });
  });

  it('customers test', async () => {
    let res = await request(server).get('/customers');
    return wrapped.run({}).then(response => {
      expect(res.status).toEqual(200);
      expect(res.text).toContain('email');
    });
  });
});