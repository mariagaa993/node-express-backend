const { model, Schema } = require('mongoose');

const personSchema = new Schema({ // el id lo crea solo
    name: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => { // cómo quiero que me llegue la respuesta
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = new model('Person', personSchema);

module.exports = Person;
