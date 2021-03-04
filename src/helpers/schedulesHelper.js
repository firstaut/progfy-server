
const hourForSchedule = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' }));

const scheduleIsOccupied = (hourId, hours) => {
    hours.forEach(hs => {
        if(hs.id === hourId) {
            hs.occupied = true;
        }
    });
}

const schedulesFilter = (dateDay, hours) => {
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' }));

    hours.forEach(hs => {
        const time = hs.hour.split('-')[1].trim();
        const hourTime = new Date(dateDay + ' ' + time);

        if(hourTime.getTime() < today.getTime()) {
            hs.occupied = true;
        }
    });
}

module.exports = {
    scheduleIsOccupied,
    schedulesFilter
}