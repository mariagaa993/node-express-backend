const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../index');

const api = supertest(app);

test('People are returned as json', async () => {
    await api
        .get('/api/people')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

// se ejecuta una vez que terminen todos los tests
afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
});
