require('dotenv').config() // ver si tenemos el archivo .env y correrlo
require('./mongo'); // ejecuta todo lo que esta en el archivo sin
// necesidad de crear una función const connectDB = require('./mongo'); luego connectDB();
const express = require('express'); // Se conoce como CommondJs
const app = express();
const cors = require('cors');
const Person = require('./models/Person');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');

const logger = require('./loggerMiddelware'); 

app.use(cors()); // Para que cualquier origen funcione en nuestra app
app.use(express.json()); // soportar request cuando se pasan objetos - middelware

app.use(logger);

/* 
Hacer las llamas a la api con esto es mucho más complicado, 
por eso utilizamos el framework express

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(api));
});
*/

app.get('/', (request, response) => {
    response.send('<h1>La bebé es una gritona</h1>');
});

app.get('/api/people', (request, response, next) => {
    Person.find({})
    .then(people => response.status(200).json(people)) // people.toJSON();
    .catch(err => next(err));
});

app.get('/api/people/:id', (request, response, next) => {
    const { id } = request.params; // extraer el id
    Person.findById(id)
    .then(person => person ? response.status(200).json(person) : response.status(404).end())
    .catch(err => next(err)); // se irá al siguiente middleware
});

app.delete('/api/people/:id', (request, response, next) => {
    const { id } = request.params; // params = las keys del objeto
    Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(err => next(err));
});

app.post('/api/people', (request, response, next) => {
    const person = request.body; // es requerido las keys name, lastname, age
    // condicional para verificar
    if(!person || !person.name) {
        return response.status(400).json({ // error cuando se crea mal un recurso
            error: 'Some required parameter is missing'
        });
    };
    const newPerson = new Person({
        name: person.name
    });

    // asincrono
    newPerson.save()
    .then(savedPerson => response.status(201).json(savedPerson))
    .catch(err => next(err));
});

app.put('/api/people/:id', (request, response, next) => {
    const { id } = request.params;
    const person = request.body;
    const personUpdate = {
        name: person.name
    };
    Person.findByIdAndUpdate(id, personUpdate, { new: true })
    .then(result => response.json(result)) // el resultado es lo que consiguió con el id no el actualizado
    .catch(err => next(err)); // pero si colocamos el tercer parametro, si lo cambia por el nuevo
});

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT; // variable de entorno
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
