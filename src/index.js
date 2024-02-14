import cron from 'node-cron'
import { monitoringUrls , scheduleTime} from './config/index.js'
import monitorWebsite from './services/monitoringService.js'

monitoringUrls.forEach(url => {
  cron.schedule(scheduleTime, () => monitorWebsite(url));
});