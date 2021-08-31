const express = require('express');

const port = process.env.PORT || 3005;
const app = express();

const admin = require('./router/admin');
const ticket = require('./router/ticket');
const passenger = require('./router/passenger');

require('./db/conn');

app.use(express.json());
app.use('/api/admin', admin);
app.use('/api/passenger', passenger);
app.use('/api/ticket', ticket);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
    console.log(`URL is: http://localhost:${port}`);
})
 