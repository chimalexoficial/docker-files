const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { notebookRouter } = require('./routes');

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.json());
app.use('/api/notebooks', notebookRouter);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Starting server...');
        app.listen(PORT, () => {
            console.log(`Notebooks server listening on PORT ${PORT}`);
        });
    }).catch( err => {
        console.error('Something went wrong on MongoDB')
        console.error(err);
    })

