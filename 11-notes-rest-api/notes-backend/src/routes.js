const express = require('express');
const noteRouter = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const { Note } = require('./models');

const notebooksApiUrl = process.env.NOTEBOOKS_API_URL;
// Middleware to validate ID

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Note not found' });
    };

    next();
}

// Create new notebooks: POST '/'
noteRouter.post('/', async (req, res) => {
    try {
        const { title, content, notebookId } = req.body;

        let validatedNotebookId = null;

        if (!notebookId) {
            console.info({
                message: 'Notebook ID not provided. Storing note wihout notebook'
            });
        } else if (!mongoose.Types.ObjectId.isValid(notebookId)) {
            return res.status(404).json({
                error: 'Notebook not found',
                notebookId
            });

        } else {
            try {
                await axios.get(`${notebooksApiUrl}/${notebookId}`);
            } catch (error) {
                const jsonError = error.toJSON();
                if (jsonError.status === 404) {
                    return res.status(400).json({
                        error: 'Notebook not found',
                        notebookId
                    });
                } else {
                    console.error({
                        message: 'Error verifying the notebook ID. Storing note with provided ID for later validation',
                        notebookId,
                        error: error.message
                    });
                }
            } finally {
                validatedNotebookId = notebookId;
            }
        }

        if (!title || !content) {
            return res.status(400).json({ error: 'title or content are required' })
        }

        const note = new Note({ title, content, notebookId: validatedNotebookId });
        await note.save();
        res.status(201).json({ data: note })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

// Retrieve all notebooks: GET '/'
noteRouter.get('/', async (req, res) => {
    try {
        const note = await Note.find();
        return res.status(200).json({ data: note })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});
// Get a single notebook: GET '/:id' - localhost:8080/api/notebooks/'the-id'
noteRouter.get('/:id', validateId, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        return res.status(200).json({ data: note })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

// Update a single notebook: PUT '/:id' - localhost:8080/api/notebooks/'the-id'
noteRouter.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        const note = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ error: 'Note not found to update' });
        }

        return res.json({ data: note })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

// Delete a single notebook: DELETE '/:id' - localhost:8080/api/notebooks/'the-id'
noteRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found to delete' });
        }

        return res.status(200).json({
            message: 'Note deleted :)'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

module.exports = {
    noteRouter
}