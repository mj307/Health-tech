const express = require('express');
const router = express.Router();
const billingController = require('../controllers/BillingController');
// const auth = require('../middleware/auth');

router.get('/', /*auth,*/ billingController.getBillingInfo);
router.post('/', /*auth,*/ billingController.upsertBillingInfo);

module.exports = router;
