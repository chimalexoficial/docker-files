const express = require('express');
const mongoose = require('mongoose');
const { noteRouter } = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/notes', noteRouter);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Starting server...');
        app.listen(PORT, () => {
            console.log(`Notes server listening on PORT ${PORT}`);
        });
    }).catch(err => {
        console.error('Something went wrong on MongoDB')
        console.error(err);
    })

