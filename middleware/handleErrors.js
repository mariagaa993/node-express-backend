module.exports = (error, resquest, response, next) => {
    console.error(error);
    error.name === 'CastError' ? 
        response.status(404).send({ error: 'id used is malformed' }) 
    : 
        response.status(500).end();  
};
