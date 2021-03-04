const express = require('express');
const router = express.Router();
const MachineController = require('../controllers/MachineController');

router.post(
    '/add',
    [],
    MachineController.addMachine
);

router.put(
    '/upd',
    [],
    MachineController.updMachine
);

router.post(
    '/get-by-name',
    [],
    MachineController.getMachineByName
);

module.exports = router;