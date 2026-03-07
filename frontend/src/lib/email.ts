import { Resend } from 'resend'

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html || options.text.replace(/\n/g, '<br>'),
      text: options.text,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function sendContactNotification(contactData: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  const emailText = `
New contact form submission from your portfolio:

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
Sent at: ${new Date().toLocaleString()}
  `.trim()

  const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7;">
          <tr>
            <td style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: #a1a1aa;">PORTFOLIO INQUIRY</p>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff;">New Message</h1>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; font-size: 12px; color: #71717a;">${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e4e4e7; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #e4e4e7;">
                    <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: #71717a;">CONTACT INFORMATION</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 2px 0; font-size: 12px; color: #71717a;">Name</p>
                          <p style="margin: 0; font-size: 15px; font-weight: 500; color: #18181b;">${contactData.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 2px 0; font-size: 12px; color: #71717a;">Email</p>
                          <p style="margin: 0;"><a href="mailto:${contactData.email}" style="font-size: 15px; color: #2563eb; text-decoration: none;">${contactData.email}</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0 0 2px 0; font-size: 12px; color: #71717a;">Subject</p>
                          <p style="margin: 0; font-size: 15px; font-weight: 500; color: #18181b;">${contactData.subject}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; border: 1px solid #e4e4e7; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #e4e4e7;">
                    <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: #71717a;">MESSAGE</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #3f3f46;">${contactData.message.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                <tr>
                  <td align="center" style="padding-top: 24px; border-top: 1px solid #e4e4e7;">
                    <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject.replace(/"/g, '')}" style="display: inline-block; padding: 12px 24px; background-color: #18181b; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 6px;">Reply to ${contactData.name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #fafafa; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; color: #71717a;">This message was sent from your portfolio contact form.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const notifyEmail = process.env.EMAIL_USER
  if (!notifyEmail) {
    console.error('EMAIL_USER is not set - cannot send notification')
    return { success: false, error: 'Notification email not configured' }
  }
  return sendEmail({
    to: notifyEmail,
    subject: `Portfolio – New message: ${contactData.subject}`,
    text: emailText,
    html: emailHTML,
  })
}

export async function sendAutoReply(contactData: {
  name: string
  email: string
}): Promise<{ success: boolean; error?: string }> {
  const emailText = `
Hi ${contactData.name},

Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.

I typically respond within 24-48 hours. If your inquiry is urgent, feel free to follow up via email.

Looking forward to connecting with you!

Best regards,
ESLAVATH VINEETH NAIK
  `.trim()

  const emailHTML = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
  <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #2f81f7; margin-bottom: 20px;">✅ Message Received!</h2>
    <p style="color: #333; margin-bottom: 20px;">Hi ${contactData.name},</p>
    <p style="color: #333; margin-bottom: 20px;">Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.</p>
    <p style="color: #333; margin-bottom: 20px;">I typically respond within 24-48 hours. If your inquiry is urgent, feel free to follow up via email.</p>
    <p style="color: #333; margin-bottom: 30px;">Looking forward to connecting with you!</p>
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
      <p style="color: #6c757d; font-size: 14px;">Best regards,<br>ESLAVATH VINEETH NAIK</p>
    </div>
  </div>
</div>
  `.trim()

  return sendEmail({
    to: contactData.email,
    subject: 'Thank you for contacting me - Portfolio',
    text: emailText,
    html: emailHTML,
  })
}

export const emailService = {
  sendContactNotification,
  sendAutoReply,
}
