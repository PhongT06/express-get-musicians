// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");

describe('GET /musicians endpoint', () => {
    test('should return all musicians with status code 200', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(Array.isArray(responseData)).toBe(true);
        expect(responseData.length).toBeGreaterThan(0);
    });
});

describe('GET /musicians/:id', () => { 
    test('should return musician with id 1 and status 200', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toHaveProperty('id', 1);
        expect(responseData).toHaveProperty('name', 'Mick Jagger');
    });
});

describe('POST /musicians', () => {
    test('should create a new musician and return 200 status', async () => {
        const newMusician = { name: 'Taylor Swift', instrument: 'Guitar' };
        const response = await request(app)
            .post('/musicians')
            .send(newMusician);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toHaveProperty('name', 'Taylor Swift');
        expect(responseData).toHaveProperty('instrument', 'Guitar');
    });
});

describe('PUT /musicians/:id', () => {
    test('should update musician with id 1 and return updated data', async () => {
        const updatedMusician = {
            name: 'Steven Tyler',
            instrument: 'Vocals'
        };
        const response = await request(app)
            .put('/musicians/1')
            .send(updatedMusician);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toHaveProperty('name', 'Steven Tyler');
        expect(responseData).toHaveProperty('instrument', 'Vocals');
    });
});

describe('DELETE /musicians/:id', () => {
    test('should delete musician with id 2 and return 204 status', async () => {
        const response = await request(app).delete('/musicians/2');
        expect(response.statusCode).toBe(204);
    });
});