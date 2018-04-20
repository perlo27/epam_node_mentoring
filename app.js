import config from './conifg/conifg';
import { User, Product, DirWatcher, Importer } from './modules';

console.log('config: ', config.csvfilesdir);

const user = new User();
const product = new Product();

const watcher = new DirWatcher();

watcher.watch('./data', 1000);

const importer = new Importer(watcher);
