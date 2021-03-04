const path = require('path');
const fs = require('fs');

const getHoursBySizeAndMinutes = (size, mins) => {
    let hours = [];
    let end = '00:00';
    let years = new Date().getFullYear();
    let hs = new Date(`01/01/${years} ${end}`);

    for(let i = 1; i < size + 1 ; i++) {
        const init = `${formatForString(hs.getHours())}:${formatForString(hs.getMinutes())}`;
        hs.setMinutes(hs.getMinutes() + mins);
        end = `${formatForString(hs.getHours())}:${formatForString(hs.getMinutes())}`;
        // if(i === size) {
        //     end = `${formatForString(hs.getHours() + 1)}:${formatForString(hs.getMinutes())}`;
        // } else {
        //     end = `${formatForString(hs.getHours())}:${formatForString(hs.getMinutes())}`;
        // }

        if(i === size && hs.getHours() === 0) {
            end = `${24}:${formatForString(hs.getMinutes())}`;
        }
        
        const hourItem = `${init} - ${end}`;
        const hour = { id: i, hour: hourItem, status: false, occupied: false };

        hours.push(hour);
    }

    return hours;
}

const formatForString = (number) => {
    return number < 10 ? `0${number}` : number;
}

const filterhours = (hours) => {

    let early = [];
    let morning = [];
    let afternoon = [];
    let night = [];
    
    hours.forEach(hs => {
        const hours = hs.hour.split('-');
        const hour = hours[0].trim().split(':')[0];
        const newHour = Number.parseInt(hour);

        if(newHour < 6) {
            early.push(hs);
        } else if(newHour < 12) {
            morning.push(hs);
        } else if(newHour < 18) {
            afternoon.push(hs);
        } else if(newHour < 24) {
            night.push(hs);
        }
    });

    const arrHours = {
        early,
        morning,
        afternoon,
        night
    }

    return arrHours;
}

const saveHours = (xhours) => {
    // const valid = readHours();
    // if(!valid) {
    //     return;
    // }

    const arrHours = JSON.stringify(xhours);
    const hoursName = 'hours.json';
    const pathname = path.resolve(__dirname, '../db/' + hoursName);
    fs.writeFileSync(pathname, arrHours);
}

const readHours = () => {
    const hoursName = 'hours.json';
    const pathname = path.resolve(__dirname, '../db/' + hoursName);
    const xhours = fs.readFileSync(pathname);
    const arrHours = JSON.parse(xhours);
    if(xhours || arrHours) {
        return true;
    }
    return false;
}

const setCustomHours = (minutes) => {
    const cant = 24 * 60 / minutes;
    const hours = getHoursBySizeAndMinutes(cant, minutes);
    const arrHours = filterhours(hours);

    saveHours(arrHours);
}

module.exports = {
    setCustomHours
}

