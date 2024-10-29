const express = require('express');
const router = express.Router();
const { addInvoice,
    getInvoice,
    getAllInvoices,
    updateInvoice,
} = require('../controllers/invoiceController')

router.post('/add', addInvoice);
router.get('/:id', getInvoice);
router.get('/', getAllInvoices);
router.delete('/:id', updateInvoice);

module.exports = router;