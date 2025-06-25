const express = require('express');
const notebookRouter = express.Router();
const mongoose = require('mongoose');
const { Notebook } = require('./models');


// Middleware to validate ID

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Notebook not found' });
    };

    next();
}

// Create new notebooks: POST '/'
notebookRouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'name is required' })
        }

        const notebook = new Notebook({ name, description });
        await notebook.save();
        res.status(201).json({ data: notebook })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

// Retrieve all notebooks: GET '/'
notebookRouter.get('/', async (req, res) => {
    try {
        const notebooks = await Notebook.find();
        return res.status(200).json({ data: notebooks })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});
// Get a single notebook: GET '/:id' - localhost:8080/api/notebooks/'the-id'
notebookRouter.get('/:id', validateId, async (req, res) => {
    try {        
        const notebook = await Notebook.findById(req.params.id);

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }
        return res.status(200).json({ data: notebook })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

// Update a single notebook: PUT '/:id' - localhost:8080/api/notebooks/'the-id'
notebookRouter.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        const notebook = await Notebook.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found to update' });
        }

        return res.json({ data: notebook })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

// Delete a single notebook: DELETE '/:id' - localhost:8080/api/notebooks/'the-id'
notebookRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        const notebook = await Notebook.findByIdAndDelete(id);

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found to delete' });
        }

        return res.sendStatus(204);

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

module.exports = {
    notebookRouter
}