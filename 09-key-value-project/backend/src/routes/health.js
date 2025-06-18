const express = require('express');

const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    res.status(200).send('up & running :D')
});

module.exports = {
    healthRouter,
}