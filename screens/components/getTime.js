import moment from 'moment';

let getHours = new Date().getHours();
let getMin = new Date().getMinutes();
let getSecon = new Date().getSeconds();

getMin < 10 ? (getMin = '0' + getMin) : getMin;
export const HoursOrtime = `${getHours}:${getMin}:${getSecon}`;
export const dateValue = moment.utc().format('YYYY-MM-DD');
