const express = require('express');
const router = express.Router();
const { tokenVerify } = require('../middlewares/AuthMiddleware');
const CouponController = require('../controllers/CouponController');


router.post(
    '/add',
    [tokenVerify],
    CouponController.addCouponByUserAdmin
);

router.put(
    '/upd',
    [tokenVerify],
    CouponController.updCouponByUserAdmin
);

router.put(
    '/dlt',
    [tokenVerify],
    CouponController.dltCouponByUserAdmin
);

router.get(
    '/all',
    [],
    CouponController.getCouponsByAdmin
);

router.put(
    '/add-limit',
    [tokenVerify],
    CouponController.addCreditsForCustomer
);


module.exports = router;