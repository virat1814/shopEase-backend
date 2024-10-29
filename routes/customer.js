const express = require('express');
const router = express.Router();
const { customerLogin,
    customerSignup
} = require('../controllers/customerController')

router.post('/signup', customerSignup);
router.post('/login', customerLogin);

// router.post('/add', addCustomer);
// router.get('/:id', getCustomerById);
// router.put('/:id', updateCustomer);
// router.delete('/:id', deleteCustomer);

module.exports = router;