// middleware 404 o de manejo de errores
// es mejor colocarlo luego de los paths
// middleware si no entra en ningún endpoint

module.exports = (resquest, response, next) => {
    response.status(404).end();
};
