import { logger } from '../utils/logger.js';

export class Tracker {
  private startTime: number | null = null;

  start(): void {
    this.startTime = Date.now();
    logger.info('Tracker started');
  }

  stop(): string {
    if (!this.startTime) {
      return 'Tracker was not started';
    }

    const duration = (Date.now() - this.startTime) / 1000; // in seconds
    this.startTime = null;
    return `You coded for ${duration.toFixed(2)} seconds`;
  }
}
