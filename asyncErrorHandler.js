module.exports = (func) => {
    return ((req, res, next) => {
        console.log('in function');
        func(req, res, next).catch(err => next(err));
    })
}