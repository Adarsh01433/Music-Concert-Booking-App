
const nodeMailer = require("nodemailer");
const logger = require("../config/logger");


const transporter = nodeMailer.createTransport({
    service : "gmail",
    auth : {
        user : ''
        pass : ''
    }
});


const getEmailTemplate = (subject, content, userInfo) => {
  return `
  <html>
    <body>
      <img src="${process.env.COMPANY_LOGO_URL}" alt="${process.env.COMPANY_NAME} Logo" style="width:200px;">
      <h1>${process.env.COMPANY_NAME}</h1>
      <h2>${subject}</h2>
      <p>${content}</p>
      <p>User Info:</p>
      <ul>
        ${Object.entries(userInfo)
          .map(([key, value]) => `<li>${key}: ${value}</li>`)
          .join("")}
      </ul>
      <p>Thank you,<br>${process.env.COMPANY_NAME} Team</p>
    </body>
  </html>
  `;
};


const sendEmail = async(to, subject , content , userInfo)=> {
    const html = getEmailTemplate(subject, content , userInfo);
    try {
        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to,
            subject : `${process.env.COMPANY_NAME} - ${subject}`,
            html
        });
        logger.info("Email sent", {to, subject})
    } catch (error) {
        logger.error("Email send failed", error)
        throw error
    }
}

const sendOTP = async (to, otp, userInfo) => {
  const content = `Your OTP is <strong>${otp}</strong>. it expires in 5min`;
  await sendEmail(to, "OTP Verification", content, userInfo);
};

const sendWelcomeEmail = async (to, userInfo) => {
  const content = "Welcome to District! Your account is set up.";
  await sendEmail(to, "Welcome", content, userInfo);
};



module.exports = {
  sendOTP,
  sendWelcomeEmail,
  sendEmail
};