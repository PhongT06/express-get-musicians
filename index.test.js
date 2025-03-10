// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test('should return all musicians with status code 200', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(Array.isArray(responseData)).toBe(true);
        expect(responseData.length).toBeGreaterThan(0);
    });
})
