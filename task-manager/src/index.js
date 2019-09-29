const express = require('express');

const app = express();
const port = process.env.PORT || 4040;

// Routes
const usersRoutes = require('./routers/users');
const tasksRoutes = require('./routers/tasks');
require('./db/mongoose');


app.use(express.json());
app.use(usersRoutes);
app.use(tasksRoutes);

app.listen(port, (err) => {
    err ? console.log('error starting server') : console.log(`Listening on port ${port}`);
});