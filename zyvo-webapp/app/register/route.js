// Import required packages
import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');

// Create a transporter with your email service settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export async function POST(req, res) {
  if (req.method === 'POST') {
    const body = await req.json();

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: body.email,
      subject: 'Welcome to the Zyvo Universe!',
      text: 'Thank you for signing up for our app. We are excited to have you on board!',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title></title><!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--></head><body><div class="es-wrapper-color"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f6f6f6"></v:fill>
        </v:background>
      <![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-email-paddings" valign="top"><table class="esd-header-popover es-header" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="es-p20t es-p20r es-p20l esd-structure" align="left"><!--[if mso]><table width="560" cellpadding="0"
                              cellspacing="0"><tr><td width="180" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left"><tbody><tr><td class="es-m-p0r es-m-p20b esd-container-frame" width="180" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr>
              <td align="center" class="esd-block-image" style="font-size: 0">
                  <a target="_blank">
                      <img class="adapt-img" src="https://xwmjcp.stripocdn.email/content/guids/CABINET_b402581fd5fe26678a58ed114b6c2b4a77427cbbd7ce5d4366e9be377c92d519/images/logo.png" alt="" width="90">
                  </a>
              </td>
          </tr></tbody></table></td></tr></tbody></table><!--[if mso]></td><td width="20"></td><td width="360" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right"><tbody><tr><td class="esd-container-frame" width="360" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-empty-container" style="display: none;" align="center"></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]></td></tr></table><![endif]--></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="es-p20t es-p20r es-p20l esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame es-p85t" width="560" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr>
              <td align="left" class="esd-block-text">
                  <p><strong><em style="font-family:helvetica,&#39;helvetica neue&#39;,arial,verdana,sans-serif; text-align: center">It's Official!</em></strong></p>
              </td>
          </tr><tr>
              <td align="left" class="esd-block-text">
                  <h1><strong style="font-family:helvetica,&#39;helvetica neue&#39;,arial,verdana,sans-serif">You're now part of <span style="color:#48eab1">Zyvo Universe</span></strong></h1>
              </td>
          </tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="esd-footer-popover es-footer" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="esd-structure es-p20b es-p20r es-p20l es-p50t" align="left"><table class="es-right" cellspacing="0" cellpadding="0" align="right"><tbody><tr><td class="esd-container-frame" width="560" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr>
              <td align="left" class="esd-block-text">
                  <p>We're stoked to have you on board!</p>
  <p>Thank you for joining our vibrant community of flexible adventurers and innovative hosts.</p>
  <p>Get ready to seize every moment, one hour at a time!</p>
  <p>Your journey with us promises endless possibilities, personalized experiences, and smart stays that save you both time and money.</p>
  <p>Stay tuned for hourly escapades, quick getaways, and tailored discoveries that perfectly match your style and needs.</p>
  <p>Explore now, unleash the fun, and make the most of your ZYVO journey.<br> </p>
  <p><strong>It's time to ZYVOLVE!</strong></p>
              </td>
          </tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return new NextResponse('Welcome email sent', { status: 200 });
    } catch (error) {
      console.error('Error sending welcome email', error);
      return new NextResponse('Error sending welcome email', { status: 500 });
    }
  } else {
    console.log('Use POST');
  }
}
