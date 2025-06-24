const express = require('express');
const notebookRouter = express.Router();
const { Notebook } = require('./models')

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
})
// Get a single notebook: GET '/:id' - localhost:8080/api/notebooks/'the-id'
notebookRouter.get('/:id', async (req, res) => {

});

// Update a single notebook: PUT '/:id' - localhost:8080/api/notebooks/'the-id'
notebookRouter.put('/:id', async (req, res) => {

});

// Delete a single notebook: DELETE '/:id' - localhost:8080/api/notebooks/'the-id'
notebookRouter.delete('/:id', async (req, res) => {

});

module.exports = {
    notebookRouter
}