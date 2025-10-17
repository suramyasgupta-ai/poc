const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errorLog.txt');
    log.error('An error occurred');
    console.error(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler;