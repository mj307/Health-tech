const express = require('express');
const router = express.Router();
const profileController = require('../controllers/ProfileController');
// const auth = require('../middleware/auth');

router.get('/', /*auth,*/ profileController.getProfile);
router.put('/', /*auth,*/ profileController.updateProfile);

module.exports = router;
