import axios from 'axios';
import { insertChangeLog } from './dbService.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/mailer.js';

async function fetchWebsiteContent(url) {
    try {
        const startTime = new Date();
        const response = await axios.get(url);
        const endTime = new Date();
        const loadingTime = endTime - startTime;
        const { data, status } = response;

        return { content: data, statusCode: status, loadingTime };
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

export default async function monitorWebsite(url) {
    console.log(`Monitoring ${url}`);

    const websiteData = await fetchWebsiteContent(url);

    if (!websiteData) return;

    const { content, statusCode, loadingTime } = websiteData;
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    const changeDetected = true;

    if (changeDetected) {
        const changeLog = {
            url,
            timestamp: new Date(),
            hash,
            statusCode,
            loadingTime
        };

        await insertChangeLog(changeLog);

        await sendEmail("Log of WebSite",hash);
    }
}
