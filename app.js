import config from './conifg/conifg';
import {User, Product, DirWatcher} from './modules';

console.log('config: ', config.name);

const user = new User();
const product = new Product();

const watcher = new DirWatcher();

watcher.watch('./data', 1000);

watcher.on('change', (e, files) => {
  console.log('change', e, files);
})