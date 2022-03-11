const User = require("../model/user_model");
const jwt = require('jsonwebtoken');
const becrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const loginData = await User.findOne({ email: req.body.email });
        if (!loginData) {
            res.status(401).json({
                message: 'user is not exist'
            })
        } else {
            becrypt.compare(req.body.password, loginData.password, (err, result) => {
                if (!result) {
                    return res.status(500).json({
                        message: 'Password is not matching'
                    });
                } if (result) {
                    const token = jwt.sign({
                        id: loginData._id,
                    }, 'keyur',
                        {
                            expiresIn: "24h",
                        }
                    );
                    res.status(200).json({
                        status: 200,
                        message: 'User login successfully',
                        data: {
                            name: loginData.name,
                            gender: loginData.gender,
                            email: loginData.email,
                            token: token,
                        }

                    })

                }
            })
        }
    } catch (e) {
        res.status(501).json({
            error: e
        })
    }
}

const signup = async (req, res) => {

    const singUpData = await User.findOne({ email: req.body.email })
    if (singUpData) {
        res.status(400).json({
            message: 'user is already exist'
        })
    } else {
        becrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                try {
                    const userData = await User({
                        name: req.body.name,
                        gender: req.body.gender,
                        email: req.body.email,
                        password: hash,
                    });
                    const userResponse = await userData.save();
                    if (userResponse)
                        return res.status(201).json({
                            message: 'User created Successfully',
                            data: userResponse,
                        });
                } catch (e) {
                    res.status(501).json({
                        error: e
                    })
                }
            }
        })
    }

}


module.exports = {
    login,
    signup,
};