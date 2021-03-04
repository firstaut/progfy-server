const express = require('express');
const app = express();

app.use('/customer', require('./CustomerRoute'));
app.use('/package', require('./PackageRoute'));
app.use('/schedule', require('./ScheduleRoute'));
app.use('/machine', require('./MachineRoute'));
app.use('/coupon', require('./CouponRoute'));

module.exports = app;