import fs from 'fs';
import { promisify } from 'util';
import config from '../conifg/conifg';

const readFile = promisify(fs.readFile);

const constructPath = fileName => ({
  path: `./${config.csvfilesdir}/${fileName}`,
  fileName,
});

const isCSV = fileName => /\.csv$/.test(fileName);

const getSimpleName = fileName => fileName.replace(/\.csv$/, '');

const cleanUpCache = (cache, arr) =>
  Object.keys(cache).reduce(
    (acc, key) => (arr.includes(key) ? { ...acc, [key]: cache[key] } : acc),
    {}
  );

export default class Importer {
  constructor(watcher) {
    this.watcher = watcher;
    this.watcher.on('change', this.handleChange);
    this.cache = {};
  }

  handleChange = async (files = []) => {
    const csvFiles = files.filter(isCSV);
    try {
      await Promise.all(
        csvFiles
          .map(constructPath)
          .map(this.importFile)
      );
      this.cache = cleanUpCache(this.cache, csvFiles.map(getSimpleName));
    } catch (e) {
      console.log('Something really went wrong, call 911!!!', e);
    }
  };

  importFile = async ({ path, fileName }) => {
    const simpleName = getSimpleName(fileName);
    if (this.cache[simpleName]) {
      console.log(
        `\nget data for this path: ${path} from cache: \n`,
        this.cache[simpleName]
      );
      return this.cache[simpleName];
    }
    try {
      const data = await readFile(path);
      this.cache[simpleName] = data.toString();
      console.log(`import from path: ${path} this data:\n`, data.toString());
      return data.toString();
    } catch (e) {
      console.log('Error while read file: ', e);
    }
  };

  importFileSync = ({ path, fileName }) => {
    const simpleName = getSimpleName(fileName);
    if (this.cache[simpleName]) {
      console.log(
        `\nget data for this path: ${path} from cache: \n`,
        this.cache[simpleName]
      );
      return this.cache[simpleName];
    }
    try {
      const data = fs.readFileSync(path);
      this.cache[simpleName] = data.toString();
      console.log(`import from path: ${path} this data:\n`, data.toString());
      return data.toString();
    } catch (e) {
      console.log('Error while read file: ', e);
    }
  };
}
