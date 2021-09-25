const logger = (request, response, next) => { // no se le pasa ningún path por eso, pasa por todos
    console.log(request.method);
    console.log(request.path);
    console.log(request.body);
    console.log('-----');
    next() // para que continue
};

module.exports = logger;
