const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).send('up & running')
});

console.log('Connecting to MongoDB...');

mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.KEY_VALUE_DB}`, {
    auth: {
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS: 500
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })
    console.log('Connected to MongoDB')
})
    .catch(err => {
        console.error('Something went wrong! :(');
        console.error(err)
    });

