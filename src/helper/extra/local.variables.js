// Today Date
const moment = require('moment-timezone');
moment.tz.setDefault();
const currentDate = moment();
const todayDate = currentDate.format('YYYY-MM-DD HH:mm:ss');



module.exports = {
    todayDate
}
