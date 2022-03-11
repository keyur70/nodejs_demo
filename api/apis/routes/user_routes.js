
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../model/user_model');

///get all data
router.get('/', (req, res) =>
    UserModel.find().then(result => {
        res.status(200).json({
            userData: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
)


/// get data by id
router.get('/:id', (req, res) =>
    UserModel.findById(req.params.id).then(result => {
        res.status(200).json({
            userData: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
)


///post user data

router.post('/', (req, res) => {
    console.log(res.body);
    const user = new UserModel({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
    })

    user.save().then(result => {
        console.log(result);
        res.status(200).json({
            newUSer: result
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        })
})

///delete data by id

router.delete('/:id', (req, res) =>
    UserModel.remove({ _id: req.params.id }).then(result => {
        res.status(200).json({
            messge: 'delete user',

        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
)

router.put('/:id', (req, res) =>
    UserModel.findOneAndUpdate({ id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
        }
    }).then(result => {
        res.status(200).json({
            newUSer: result

        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
)

module.exports = router;