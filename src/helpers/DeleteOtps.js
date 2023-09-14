const cron = require('node-cron')
const otpModel = require('../models/otp.model')

const deleteOtps = () => {
    const cronJob = cron.schedule('59 23 * * *', async () => {
        console.log("executing cronjob")
        try{
            await otpModel.deleteMany()
        }catch(e){
            return false
        }
    }, {
        schedule: true,
        timezone: 'Asia/Kolkata'
    } )
    cronJob.start();
}

module.exports = deleteOtps