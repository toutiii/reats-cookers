// Simple mutex to prevent concurrent token refresh requests
export class Mutex {
  private _locked = false;
  private _waitQueue: (() => void)[] = [];

  isLocked(): boolean {
    return this._locked;
  }

  acquire(): Promise<() => void> {
    if (!this._locked) {
      this._locked = true;
      return Promise.resolve(() => this.release());
    }

    return new Promise((resolve) => {
      this._waitQueue.push(() => {
        this._locked = true;
        resolve(() => this.release());
      });
    });
  }

  private release(): void {
    if (this._waitQueue.length > 0) {
      const next = this._waitQueue.shift();
      next?.();
    } else {
      this._locked = false;
    }
  }

  waitForUnlock(): Promise<void> {
    if (!this._locked) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this._waitQueue.push(() => {
        this._locked = false;
        resolve();
      });
    });
  }
}
