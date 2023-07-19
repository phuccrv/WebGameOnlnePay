const nodemailer = require('nodemailer');
const mailerConfig = require('../../configs/mail.configs');

// Cấu hình transporter
const transporter = nodemailer.createTransport({
  service: mailerConfig.email.service,
  auth: {
    user: mailerConfig.email.user,
    pass: mailerConfig.email.password,
  },
});

// Hàm gửi email thông báo cho người dùng
const sendRegistrationEmail = async (email) => {
//   const { fullname, email } = user;

  // Nội dung email
  const mailOptions = {
    from: mailerConfig.email.user,
    to: email,
    subject: 'Registration Successful',
    html: `
      <html>
        <head>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
            }
          </style>
        </head>
        <body>
          <h1>Cảm ơn ${email} đã yêu dùng ^.^</h1>
          <h2>Thông tin tài khoản:</h2>
          <p>Tài khoản: game1</p>
          <p>mật khẩu:12345678</p>
          <p>Hãy khám phá chúng tôi và trải nghiệm những sản phẩm tuyệt vời của chúng tôi.</p>
        </body>
      </html>
    `,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
};

module.exports = sendRegistrationEmail;