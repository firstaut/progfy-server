const Schedule = require('../../models/Schedule');

const isScheduleOccupied = async (req, res, next) => {

    try {

        const {
            dateDay,
            hourId
        } = req.body;

        const schedule = await Schedule.findOne({ dateDay, hourId });

        if(schedule) {
            return res.json({
                ok: false,
                msg: 'Horario ocupado, escoja otro'
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
    }
}

const changeStatusScheduleByCustomer = async (req, res, next) => {
    try {
        const user = req.user;

        const schedules = await Schedule.find({ customerId: user._id, status: 'activo' });

        schedules.forEach(sch => {
            const current = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })).getTime();
            const dayEnd = sch.dateDay.split('/');
            const timeEnd = new Date(`${dayEnd[2]}/${dayEnd[1]}/${dayEnd[0]} ${sch.hourEnd}`).getTime();

            if(current > timeEnd) {
                sch.status = 'inactivo';
                Schedule.findByIdAndUpdate(sch._id, sch).then( response => {
                    console.log("");
                });
            }
        });

        next();

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    isScheduleOccupied,
    changeStatusScheduleByCustomer
}