const request = require('supertest');
const server = require('../src/app.js').app;

beforeAll(async () => {
    console.log('Jest starting!');
});

afterAll(() => {
    server.close();
    console.log('Server closed!');
});

describe('Basic route tests', () => {
    test('Get home route GET /', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Hello World!');
    });
});