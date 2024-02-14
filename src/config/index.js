import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const sendGridApiKey = process.env.SENDGRID_API_KEY;
const monitoringUrls = process.env.MONITORING_URLS?.split(',');
const scheduleTime = process.env.SCHEDULE_TIME || '*/5 * * * *'; // Default to running every 5 minutes if not specified
const emailRecipient = process.env.EMAIL_RECIPIENT;
const emailSender = process.env.EMAIL_SENDER;

export { mongoUrl, sendGridApiKey, monitoringUrls, scheduleTime, emailRecipient, emailSender };
