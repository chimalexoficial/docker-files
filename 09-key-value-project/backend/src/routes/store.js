const express = require('express');
const { KeyValue } = require('../models/keyValue')

const keyValueRouter = express.Router();

keyValueRouter.post('/', async (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).json({ error: 'Both key and value are required' });
    }

    try {
        const existingKey = await KeyValue.findOne({ key });
        if (existingKey) {
            return res.status(400).json(
                {
                    error: 'Key already exists'
                })
        }

        const keyValue = new KeyValue({ key, value });
        await keyValue.save();
        return res.status(201).json({ message: 'Key-value pair stored succesfully' });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

keyValueRouter.get('/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const keyValue = await KeyValue.findOne({ key });
        if (!keyValue) {
            return res.status(404).json({ error: 'key not found :(' })
        }

        return res.status(200).json({ key: keyValue.key, value: keyValue.value });


    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
    return res.send('Getting key-value pair')
});

keyValueRouter.put('/:key', (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
    return res.send('Updating key-value pair')
});

keyValueRouter.delete('/:key', (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
    return res.send('Deleting key-value pair')

});

module.exports = {
    keyValueRouter,
};