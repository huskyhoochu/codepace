import chokidar from 'chokidar';
import { join } from 'path';

export class FileWatcher {
  private watcher: chokidar.FSWatcher;
  private changeCallback: () => void;

  constructor(projectPath: string, changeCallback: () => void) {
    this.changeCallback = changeCallback;
    this.watcher = chokidar.watch(projectPath, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    });

    this.watcher
      .on('change', this.handleFileChange.bind(this))
      .on('error', error => console.error(`Watcher error: ${error}`));
  }

  private handleFileChange(path: string) {
    if (this.isGitFile(path)) {
      this.changeCallback();
    }
  }

  private isGitFile(path: string): boolean {
    return !path.includes(join('.git', 'objects')) && !path.endsWith('.git');
  }

  stop() {
    this.watcher.close();
  }
}
