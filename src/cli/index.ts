#!/usr/bin/env node

import { Command } from 'commander';
import { Tracker } from '../core/tracker.js';
import { logger } from '../utils/logger.js';

const program = new Command();

program
  .version('0.1.0')
  .description('CodePace - Track your coding productivity');

program
  .command('start')
  .description('Start tracking your coding activity')
  .action(() => {
    const tracker = new Tracker();
    tracker.start();
    logger.info('Tracking started. Happy coding!');
  });

program
  .command('stop')
  .description('Stop tracking and show summary')
  .action(() => {
    const tracker = new Tracker();
    const summary = tracker.stop();
    logger.info('Tracking stopped. Summary:');
    logger.info(summary);
  });

program.parse();
