const express = require('express'); // Se conoce como CommondJs
const cors = require('cors');

const app = express();
const logger = require('./loggerMiddelware'); 

app.use(express.json()); // soportar request cuando se pasan objetos - middelware
app.use(cors()); // Para que cualquier origen funcione en nuestra app

app.use(logger);

let people = [
    {
        id: 1,
        name: 'Andrea'
    },
    {
        id: 2,
        name: 'Jose'
    },
    {
        id: 3,
        name: 'Maria'
    }
];

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

app.get('/api/people', (request, response) => {
    response.status(201).json(people);
});

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = people.find(person => person.id === id);
    person ? response.status(201).json(person) : response.status(404).end();
});

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id); // params = las keys del objeto
    people = people.filter(person => person.id !== id); // se guardan todas menos la que encuentra
    response.status(204).end();
});

app.post('/api/people', (request, response) => {
    const person = request.body; // es requerido las keys name, lastname, age
    // condicional para verificar
    if(!person || !person.name) {
        return response.status(400).json({ // error cuando se crea mal un recurso
            error: 'Some required parameter is missing'
        });
    }
    const ids = people.map(person  => person.id);
    const maxId = Math.max(...ids);
    const newPerson = {
        id: maxId + 1,
        name: person.name,
    };
    people = [...people, newPerson]; // people = people.concat(newPerson);
    response.status(201).json(newPerson);
});

app.use((resquest, response) => {
    response.status(404).json({
        error: 'Not found'
    }); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

