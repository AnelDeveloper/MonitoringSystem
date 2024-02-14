import sgMail from '@sendgrid/mail';
import { sendGridApiKey } from '../config/index.js'
import { emailRecipient, emailSender } from '../config/index.js'

sgMail.setApiKey(sendGridApiKey);

/**
 * Sends an email notification using SendGrid.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The body content of the email.
 */

export const sendEmail = async (subject, message) => {
  const msg = {
    to: emailRecipient, 
    from: emailSender, 
    subject: subject,
    text: message,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}
