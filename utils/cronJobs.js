var cron = require('node-cron');
const otpModel = require('../src/model/otp.model');

exports.clearOTPs = async () => {
    cron.schedule('0 */2 * * *', async () => {
        try{
            const timestamp = new Date(new Date().getTime() - 2 * 60 * 1000).toISOString();
            await otpModel.deleteMany({ validTill : { $lt: timestamp } })
            return
        }catch(err){
            //it should email that cronjob has failed due to this reason
            return
        }
    });
}
