const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/PackageController');


router.post(
    '/add',
    [],
    PackageController.addPackage
);

router.put(
    '/subtract-hours',
    [],
    PackageController.subtractHours
);


module.exports = router;