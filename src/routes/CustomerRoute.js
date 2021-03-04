const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const { tokenVerify, emailVerify } = require('../middlewares/AuthMiddleware');
const { changeStatusScheduleByCustomer } = require('../middlewares/schedule/ScheduleMiddleware');

router.post(
    '/add',
    [emailVerify],
    CustomerController.addCustomer
);

router.post(
    '/login',
    [],
    CustomerController.getCustomerByUsernamePassword
);

router.get(
    '/all',
    [],
    CustomerController.getAllCustomers
);

// router.put(
//     '/add-limit',
//     [tokenVerify],
//     CustomerController.addCreditsForCustomer
// );

router.get(
    '/auth',
    [tokenVerify, changeStatusScheduleByCustomer],
    CustomerController.getCustomerAuth
);

router.get(
    '/get/:customerId',
    [],
    CustomerController.getCustomerById
);



module.exports = router;