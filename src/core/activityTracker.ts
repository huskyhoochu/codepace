import { FileWatcher } from './fileWatcher';

export class ActivityTracker {
  private startTime: Date;
  private activityData: number[];
  private fileWatcher: FileWatcher;
  private currentMinuteActivity: number;

  constructor(projectPath: string) {
    this.startTime = new Date();
    this.activityData = [];
    this.currentMinuteActivity = 0;
    this.fileWatcher = new FileWatcher(
      projectPath,
      this.incrementActivity.bind(this),
    );

    // 매 분마다 activityData를 업데이트하는 인터벌 설정
    setInterval(() => this.updateActivityData(), 60000);
  }

  private incrementActivity() {
    this.currentMinuteActivity++;
  }

  private updateActivityData() {
    this.activityData.push(this.currentMinuteActivity);
    this.currentMinuteActivity = 0;
  }

  getActivityData(): number[] {
    return [...this.activityData, this.currentMinuteActivity];
  }

  getElapsedMinutes(): number {
    return Math.floor(
      (new Date().getTime() - this.startTime.getTime()) / 60000,
    );
  }

  stop() {
    this.fileWatcher.stop();
  }
}
