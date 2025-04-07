const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');
// const auth = require('../middleware/auth'); // Uncomment if using authentication

router.get('/', /*auth,*/ chatController.getChats);
router.get('/:id', /*auth,*/ chatController.getChatById);
router.post('/message', /*auth,*/ chatController.addMessage);

module.exports = router;
