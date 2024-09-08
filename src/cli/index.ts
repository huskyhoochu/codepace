#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { format } from 'date-fns';
import { createInterface } from 'readline';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ActivityTracker } from '../core/activityTracker';
import { generateHorizontalActivityChart } from '../utils/chart';

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf-8'),
);

const program = new Command();

program
  .version(packageJson.version)
  .description('CodePace - Track your coding productivity');

function formatElapsedTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function startTracking(projectPath: string) {
  console.log(chalk.green(`Tracking started for project: ${projectPath}`));
  console.log(chalk.green('Press Ctrl+C to stop.'));

  let isTracking = true;
  const activityTracker = new ActivityTracker(projectPath);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', () => {
    isTracking = false;
    activityTracker.stop();
    rl.close();
    console.log(chalk.green('\nTracking stopped.'));
    process.exit(0);
  });

  const chartWidth = 80;
  const chartHeight = 10;

  while (isTracking) {
    const now = new Date();
    const currentTimeString = format(now, 'HH:mm:ss');
    const elapsedMinutes = activityTracker.getElapsedMinutes();
    const elapsedTimeString = formatElapsedTime(elapsedMinutes * 60);
    const activityData = activityTracker.getActivityData();

    // Clear the console
    console.clear();

    console.log(chalk.blue('Current time:'), chalk.yellow(currentTimeString));
    console.log(chalk.blue('Elapsed time:'), chalk.yellow(elapsedTimeString));
    console.log(
      chalk.blue('Total activity:'),
      chalk.yellow(activityData.reduce((a, b) => a + b, 0)),
    );
    console.log('\n');
    console.log(
      chalk.cyan('Activity Chart (each column represents 1 minute):'),
    );
    console.log(
      generateHorizontalActivityChart(
        activityData,
        chartWidth,
        chartHeight,
        elapsedMinutes,
      ),
    );

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

program
  .command('start <projectPath>')
  .description('Start tracking your coding activity for the specified project')
  .action(startTracking);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
