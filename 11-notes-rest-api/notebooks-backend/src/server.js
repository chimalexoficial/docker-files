const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello from notebooks'
    })
});

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

