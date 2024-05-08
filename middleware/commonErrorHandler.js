module.exports = (err, req, res, next) => {
    console.log('in final controller');
    const obj = {};
    var message = err.message || 'Internal Server Error.';
    var statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    if(err.errors != undefined) {
        err.errors.map( er => {
            obj[er.path] = er.message;
        })
    }
    if(Object.keys(obj).length > 0) {
        message = obj;
        statusCode = 400;
    }
    res.status(statusCode).json({  statusCode, status, message  });
}