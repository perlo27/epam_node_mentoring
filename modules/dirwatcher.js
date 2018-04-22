import EventEmitter from 'events';
import { readdir } from 'fs';

const arraysAreEqual = (arr1 = [], arr2 = []) =>
  arr1.length === arr2.length &&
  arr1.reduce((prev, el) => arr2.includes(el) && prev, true);

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.watchTimer = null;
    this.dirContent = null;
  }

  watch(path, delay) {
    this.watchTimer = setInterval(() => {
      readdir(path, (e, files) => {
        if (e) {
          console.log('Error while read content of dir: ', e);
          return;
        }
        if (!this.dirContent || !arraysAreEqual(this.dirContent, files)) {
          this.dirContent = files;
          super.emit('change', files);
        }
      });
    }, delay);
  }
}
