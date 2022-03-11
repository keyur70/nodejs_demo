const User = require('../model/user_model');

const profile = async (req, res) => {
    try {
        const profileData = await User.findOne({ _id: req.user._id });
        res.status(200).json({
            id: profileData._id,
            name: profileData.name,
            gender: profileData.gender,
            email: profileData.email,
        });
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, gender, email } = req.body
        const updateProfileData = await User.findByIdAndUpdate({ _id: req.user._id }, {
            $set: {
                name,
                gender,
                email,
            },
        }, { new: true })
        console.log("88888", updateProfileData);
        return res.status(200).json({
            newUser: updateProfileData
        });
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
}

module.exports = {
    profile,
    updateProfile,
}