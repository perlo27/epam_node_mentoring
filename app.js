import { DirWatcher, Importer } from './modules';

const watcher = new DirWatcher();

watcher.watch('./data', 1000);

const importer = new Importer(watcher);
