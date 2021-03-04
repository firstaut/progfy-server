const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/ScheduleController');
const { isScheduleOccupied, changeStatusScheduleByCustomer } = require('../middlewares/schedule/ScheduleMiddleware');
const { tokenVerify } = require('../middlewares/AuthMiddleware');

router.get(
    '/get',
    [tokenVerify, changeStatusScheduleByCustomer],
    ScheduleController.getScheduleByCustomer
);

router.get(
    '/lst',
    [tokenVerify],
    ScheduleController.getSchedulesByCustomer
);

router.post(
    '/get-by-day',
    [tokenVerify],
    ScheduleController.getSchedulesByDay
);

router.post(
    '/add',
    [tokenVerify, isScheduleOccupied],
    ScheduleController.addSchedule
);

router.put(
    '/upd',
    [tokenVerify],
    ScheduleController.updSchedule
);

router.delete(
    '/dlt',
    [tokenVerify],
    ScheduleController.dltSchedule
);

router.post(
    '/change-hours',
    [],
    ScheduleController.changeHours
);

module.exports = router;
