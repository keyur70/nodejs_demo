const express = require('express');
const mongoose = require('mongoose');
const app = express()
const userRoutes = require('./api/routes/router');
const bodyParese = require('body-parser');

mongoose.connect('mongodb://localhost/demo?retryWrites=true');

mongoose.connection.on('connected', connected => {
    console.log('Mongoose Connected');
})

mongoose.connection.on('error', error => {
    console.log('Mongoose is not connected');
})

app.use(bodyParese.urlencoded({ extended: false }));
app.use(bodyParese.json());

app.use('/user', userRoutes);


app.use((req, res) => res.status(403).json({
    error: "response error"
}))


module.exports = app;