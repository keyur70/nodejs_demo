const express = require('express');
const routes = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');

routes.get('/', (req, res) => res.status(200).json({
    'message': 'this is get response'
})
)

routes.post('/', (req, res) => {
    console.log(res.body);
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
    })

    student.save().then(result => {
        console.log(result);
        res.status(200).json({
            newStudent: result
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        })
})


module.exports = routes;
