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
        expect(responseData).toHaveProperty('name', 'Lisa');
    });
});

describe('POST /musicians', () => {
    test('should create a new musician and return 200 status', async () => {
        const newMusician = { name: 'Taylor Swift', instrument: 'Guitar' };
        const response = await request(app)
            .post('/musicians')
            .send(newMusician);
        expect(response.statusCode).toBe(201);
        const responseData = JSON.parse(response.text);
        expect(responseData).toHaveProperty('name', 'Taylor Swift');
        expect(responseData).toHaveProperty('instrument', 'Guitar');
    });
});

describe('PUT /musicians/:id', () => {
    test('should update musician with id 1 and return updated data', async () => {
        const updatedMusician = {
            name: 'Jisoo',
            instrument: 'Vocals'
        };
        const response = await request(app)
            .put('/musicians/1')
            .send(updatedMusician);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toHaveProperty('name', 'Jisoo');
        expect(responseData).toHaveProperty('instrument', 'Vocals');
    });
});

describe('DELETE /musicians/:id', () => {
    test('should delete musician with id 2 and return 204 status', async () => {
        const response = await request(app).delete('/musicians/5');
        expect(response.statusCode).toBe(204);
    });
});

describe('GET /bands', () => {
    test('should return status 200', async () => {
        const response = await request(app).get('/bands');
        expect(response.statusCode).toBe(200);
    });

    test('should return an array of bands', async () => {
        const response = await request(app).get('/bands');
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return the correct number of bands', async () => {
        const response = await request(app).get('/bands');
        expect(response.body.length).toBe(3);
    });

    test('should return bands with associated musicians', async () => {
        const response = await request(app).get('/bands');
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    name: "Black Pink",
                    genre: "Pop",
                    musicians: expect.arrayContaining([
                        expect.objectContaining({ name: "Jisoo", instrument: "Vocals" }),
                        expect.objectContaining({ name: "Lisa", instrument: "Vocals" })
                    ])
            }),
            expect.objectContaining({
                id: 2,
                name: "Blink 182",
                genre: "Alternative Rock",
                musicians: expect.arrayContaining([
                    expect.objectContaining({ name: "Travis Barker", instrument: "Drums" })
                ])
            }),
            expect.objectContaining({
                id: 3,
                name: "Coldplay",
                genre: "Rock",
                musicians: expect.arrayContaining([
                    expect.objectContaining({ name: "Mick Jagger", instrument: "Voice" }),
                    expect.objectContaining({ name: "Jimi Hendrix", instrument: "Guitar" })
                ])
            })
            ])
        );
    });
});

describe('GET /bands/:id', () => {
    test('should return status 200 for a valid band ID', async () => {
        const response = await request(app).get('/bands/1');
        expect(response.statusCode).toBe(200);
    });

    test('should return the correct band with musicians', async () => {
        const response = await request(app).get('/bands/1');
        expect(response.body).toEqual(
            expect.objectContaining({
            id: 1,
            name: "Black Pink",
            genre: "Pop",
            musicians: expect.arrayContaining([
                expect.objectContaining({ name: "Jisoo", instrument: "Vocals" }),
                expect.objectContaining({ name: "Lisa", instrument: "Vocals" })
            ])  
            })
        );
    });
});