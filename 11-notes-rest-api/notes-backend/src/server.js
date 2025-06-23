const express = require('express');

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello from notes'
    })
});

app.listen(PORT, () => {
    console.log(`Notes server listening on PORT ${PORT}`);
})