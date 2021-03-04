const Schedule = require('../models/Schedule');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const { scheduleIsOccupied, schedulesFilter } = require('../helpers/schedulesHelper');
const Customer = require('../models/Customer');
const { setCustomHours } = require('../utils/hoursUtil');


const addSchedule = async (req, res) => {
    try {

        const {
            dateDay,
            hour
        } = req.body;

        const arrDays = dateDay.split('-');
        const day = `${arrDays[2]}/${arrDays[1]}/${arrDays[0]}`;
        const hourTime = hour.hour;
        const arrHour = hourTime.split('-');

        const customerId = req.user._id;
        const schedule = new Schedule({
            dateDay: day,
            hourId: hour.id,
            hourInit: arrHour[0].trim(),
            hourEnd: arrHour[1].trim()
        });

        schedule.customerId = customerId;
        schedule.status = 'activo';

        //console.log(schedule);

        await schedule.save();
        const customer = await Customer.findById(customerId);
        customer.credits = customer.credits - 1;
        await customer.save();

        res.json({
            ok: true,
            message: 'Agregado correctamente',
            schedule
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            message: 'Error al agregar'
        });
    }
}

const updSchedule = async (req, res) => {
    try {

        const body = req.body;
        const customerId = req.user._id;

        const { _id, status } = body;
        
        const schedule = await Schedule.findOne({ _id, customerId });

        schedule.status = status;
        (await schedule).save();

        res.json({
            ok: true,
            message: 'Actualizado correctamente',
            data: {
                schedule
            }
        });

    } catch (error) {
        console.log(error);

        res.json({
            ok: false,
            message: 'Error al actualizar'
        });
    }
}

const getSchedulesByDay = async (req, res) => {
    try {
        const { dateDay } = req.body;

        const arrDays = dateDay.split('-');
        console.log(arrDays);
        const day = `${arrDays[2]}/${arrDays[1]}/${arrDays[0]}`;
        const arrHours = fs.readFileSync(path.resolve(__dirname, '../db/hours.json'));
        const hours = JSON.parse(arrHours);
        const { early, morning, afternoon, night } = hours;

        const schedules = await Schedule.find({ dateDay: day, status: 'activo' });

        schedulesFilter(dateDay, early);
        schedulesFilter(dateDay, morning);
        schedulesFilter(dateDay, afternoon);
        schedulesFilter(dateDay, night);

        schedules.forEach(sch => {
            scheduleIsOccupied(sch.hourId, early);
            scheduleIsOccupied(sch.hourId, morning);
            scheduleIsOccupied(sch.hourId, afternoon);
            scheduleIsOccupied(sch.hourId, night);
        });

        res.json({dateDay, hours});

    } catch (error) {
        console.log(error);
    }
}

const getSchedulesByCustomer = async (req, res) => {

    try {

        const customerId = req.user._id;

        const schedules = await Schedule.find({ customerId });

        schedules.map(sch => {
            sch.timeInit = moment(sch.timeInit).format('D/MM/YYYY, h:mm:ss a');
            sch.timeEnd = moment(sch.timeEnd).format('D/MM/YYYY, h:mm:ss a');
        });

        res.json({
            ok: true,
            message: 'Horarios encontrados',
            schedules
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error: {
                message: 'Error al obtener horarios'
            }
        });
    }
}

const getScheduleByCustomer = async (req, res) => {

    try {

        const customerId = req.user._id;

        console.log(req.user);

        const schedules = await Schedule.find({ customerId, status: 'activo' });

        schedules.sort((a ,b) => a.hourId < b.hourId ? -1 : 0);

        const schedule = schedules.length === 0 ? null : schedules[0];

        console.log(schedule);

        res.json({
            ok: true,
            message: 'Horario encontrado',
            schedule: schedule
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error: {
                message: 'Error al obtener horario'
            }
        });
    }
}

const dltSchedule = async (req, res) => {
    try {

        const { _id, status } = body;
        const customerId = req.user._id;

        await Schedule.findByIdAndUpdate(_id, { status }, { new: true, runValidators: true }, (err, scheduleDB) => {

            if(err) {
                return res.json({
                    ok: false,
                    message: 'Error al actualizar'
                });
            }

            res.json({
                ok: true,
                message: 'Horario encontrado',
                schedule
            });
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error: {
                message: 'Error al obtener horario'
            }
        });
    }
}

const changeHours = async (req, res) => {
    try {
        
        const {
            username,
            password,
            minutes
        } = req.body;

        if(username.trim() !== 'progfy' || password.trim() !== 'progfy-hours') {
            return res.json({
                ok: false,
                msg: 'Error al actualizar las horas'
            });
        }

        setCustomHours(Number.parseInt(minutes));

        res.json({
            ok: true,
            msg: 'Actualizado correctamente'
        });

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getSchedulesByCustomer,
    getScheduleByCustomer,
    getSchedulesByDay,
    addSchedule,
    updSchedule,
    dltSchedule,
    changeHours
}