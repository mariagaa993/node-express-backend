const mongoose = require('mongoose');

// le llega la info a tráves de una variable de entorno
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

// condicionar según variable de entorno
const connectionMongo = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST 
    : MONGO_DB_URI

// 1 - Conexión a mongo
mongoose.connect(connectionMongo) // devuelve una promesa
.then(() => console.log('Database'))
.catch(err => console.log(err));

process.on('uncaughtException', () => {
    mongoose.connection.disconnect();
});

/*
2 - Construir/definir esquema (Schema) = Es el contrato que tendrá nuestro 
documento, osea, definir qué tipos de datos podemos tener en nuestra collection

3 - Crear modelos = Utilizando el Schema podemos crear una clase que nos 
permite crear instancias y poder grabarlas en la base de datos

4 - Para crear a una nueva persona se debe crear una instancia del modelo
const person = new Person({
    name: 'Carolina'
});

5 - Guardar en base de datos. Mongoose siempre devuelve una promesa
person.save()
.then(result => { 
    console.log(result); // objeto que se ha guardado en la base de datos
    mongoose.connection.close(); // cerrar la conexión
}).catch(err => {
    console.log(err)
});

También nos permite buscar
Person.find({}).then(result => { // {} vacío porque quiero que me traiga todo los objetos
    console.log(result);
    mongoose.connection.close();
});

Luego de verificar de que todo este trabajando bien, es hora de conectar mongodb con 
nuestro backend (integrarlo) para que persistan los datos
*/
