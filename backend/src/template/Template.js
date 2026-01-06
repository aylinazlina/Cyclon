exports.RegistrationTemplate=(firstName,verificationLink,otp,expireTime)=>{
    return `

    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to our E-Commerce Site</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#4f46e5; padding:20px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">Welcome to Cyclon 🎉</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin:0 0 15px 0;">
                Hi ${firstName},
              </p></br> </br>



              <p> Your OTP is: ${otp},</p> </br> </br>

              <p>this otp will expire within : ${expireTime},</p> </br> </br>

              <p style="font-size:15px; line-height:1.6; margin:0 0 20px 0;">
                Thank you for registering with <strong>Cyclon</strong>!  
                Your account has been successfully created. You can now explore rooms,
                make bookings, and manage your schedule easily.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href= "${verificationLink}"
                   style="background-color:#4f46e5; color:#ffffff; text-decoration:none; 
                          padding:12px 25px; border-radius:5px; font-size:15px; display:inline-block;">
                  Confirm email 
                </a>
              </div>

              <p style="font-size:14px; line-height:1.6; color:#555555;">
                If you did not create this account, please ignore this email or contact our support team.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Regards,<br>
                <strong>UniSpace Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777777;">
              © 2025 Cyclon. All rights reserved.<br>
              Need help? Contact us at <a href="mailto:support@unispace.com" style="color:#4f46e5;">support@unispace.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>


    `
}


//todo:reset password email template

exports.ResetPasswordEmailTemplate = (firstName, verifyLink, otp, expireTime) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f7fc;
        font-family: Arial, Helvetica, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .header {
        background-color: #4f46e5;
        padding: 20px;
        text-align: center;
        color: white;
      }

      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }

      .otp-box {
        margin: 20px 0;
        padding: 15px;
        background-color: #eef2ff;
        text-align: center;
        font-size: 24px;
        letter-spacing: 3px;
        font-weight: bold;
        border-radius: 8px;
        color: #4f46e5;
      }

      .button {
        display: block;
        width: fit-content;
        margin: 25px auto;
        padding: 12px 25px;
        background-color: #4f46e5;
        color: white !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        text-align: center;
      }

      .footer {
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #777777;
        background-color: #f4f7fc;
      }

      .expire {
        font-size: 14px;
        text-align: center;
        color: #555555;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h2>Password Reset Request</h2>
      </div>

      <div class="content">
        <p>Hello <strong>${firstName}</strong>,</p>

        <p>
          We received a request to reset your password. Use the OTP below to
          proceed with resetting your account password.
        </p>

        <div class="otp-box">Your OTP is :${otp}</div>

        <p class="expire">
          This OTP will expire in <strong>${expireTime}</strong>.
        </p>

        <p>
          Or you can directly reset your password using the link below:
        </p>

        <a href="${verifyLink}" class="button">Reset Password</a>

        <p>
          If you did not request this, please ignore this email. Your account is
          safe.
        </p>

        <p>Thank you,<br />Support Team</p>
      </div>

      <div class="footer">
        <p>
          This email was sent automatically. Please do not reply to this
          message.
        </p>
        <p>© 2026 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
