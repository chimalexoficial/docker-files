const express = require('express');

const keyValueRouter = express.Router();

keyValueRouter.post('/', (req, res) => {
    return res.send('Creating key-value pair')
});

keyValueRouter.get('/:key', (req, res) => {
    return res.send('Getting key-value pair')
});

keyValueRouter.put('/:key', (req, res) => {
    return res.send('Updating key-value pair')
});

keyValueRouter.delete('/:key', (req, res) => {
    return res.send('Deleting key-value pair')

});

module.exports = {
    keyValueRouter,
};