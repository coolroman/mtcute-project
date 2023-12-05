export class DeferredPromise<T = void> {
  resolve!: (value: T) => void;
  reject!: (reason?: unknown) => void;

  private _promise: Promise<T> | null = null;

  get promise() {
    return this._promise;
  }

  constructor(start = true) {
    if (start) {
      this.start();
    }
  }

  start(restart = true) {
    if (this._promise == null || restart) {
      this._promise = new Promise<T>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
    return this;
  }

  clear() {
    this._promise = null;
    return this;
  }
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
