const express = require('express');
const router = express.Router();
const authController = require('../controller/auth_controller')
const checkauth = require('../middleware/check-auth');
const profileController = require('../controller/profile_controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/profile', checkauth, profileController.profile);
router.put('/updateProfile/:id', checkauth, profileController.updateProfile);

module.exports = router;