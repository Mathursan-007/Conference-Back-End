let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'lynxmass@gmail.com',
        pass: '@LYNX1mass234'
    }
});

module.exports={transporter}