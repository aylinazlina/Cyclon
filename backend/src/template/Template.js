exports.RegistrationTemplate=(firstName,verificationLink)=>{
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
              </p>

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