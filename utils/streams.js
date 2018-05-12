import program from 'commander';
import path from 'path';
import fs from 'fs';
import util from 'util';
import through2 from 'through2';
import csvjson from 'csvjson';
import stream from 'stream';
import request from 'request';
import config from '../conifg/conifg';
import { isCSS, isCSV } from './helpers';

const readdir = util.promisify(fs.readdir);
const append = util.promisify(fs.appendFile);
const finished = util.promisify(stream.finished);

const getPathToFile = fName => path.join('./assets', fName);

function inputOutput(fName) {
  const filePath = getPathToFile(fName);
  fs.createReadStream(filePath)
      .on('error', err => {
          console.log(`error while reading file at path: ${filePath}\n`, err);
        })
      .pipe(process.stdout);
}

const transformFileModes = {
  toStdout: 'stdout',
  toFile: 'toFile',
};

function transformFile(fileName, mode) {
  if(!isCSV(fileName)) {
    throw new Error('file should be csv');
  }
  const filePath = getPathToFile(fileName);
  const readStream = fs.createReadStream(filePath);
  const toObject = csvjson.stream.toObject();
  const stringify = csvjson.stream.stringify();

  const extracterFromArray = through2({ objectMode: true }, function(
    [data] = [],
    enc,
    callback
  ) {
    this.push(data);
    callback();
  });

  const outputStream =
    mode === transformFileModes.toStdout
      ? process.stdout
      : fs.createWriteStream(filePath.replace(/csv$/, 'json'));

    readStream
      .on('error', err => console.log(`error while reading file at path: ${filePath}\n`, err))
      .pipe(toObject)
      .pipe(extracterFromArray)
      .pipe(stringify)
      .pipe(outputStream);
}

function reverse() {
  const transformer = through2(function(chunk, enc, callback) {
    this.push(
      chunk
        .toString()
        .split('')
        .reverse()
        .join('') + '\n\n'
    );
    callback();
  });
  process.stdin.pipe(transformer).pipe(process.stdout);
}

function transform() {
  const transformer = through2(function(chunk, enc, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  });
  process.stdin.pipe(transformer).pipe(process.stdout);
}

const promisifiedPipe = (rstr, wstr) =>
  new Promise((res, rej) => {
    rstr.pipe(wstr, { end: false });
    rstr.on('end', () => res()).on('error', e => rej(e));
  });

async function bundleCSS(pathToFolder) {
  const assets = await readdir(pathToFolder);
  const externalCSS = request.get(config.externalCsvAddress);
  const bundle = fs.createWriteStream(path.join(pathToFolder, 'bundle.css'));
  bundle.on('error', err => console.log('error while write to' + path.join(pathToFolder, 'bundle.css')));
  const assetsRSArray = assets
    .filter(isCSS)
    .map(fName => fs.createReadStream(path.join(pathToFolder, fName)));
  const composedStreamsArr = [...assetsRSArray, externalCSS];
  for (let rs of composedStreamsArr) {
    await promisifiedPipe(rs, bundle);
  }
}

const programActions = {
  outputFile: 'outputFile',
  transformToFile: 'transformToFile',
  transformToOutput: 'transformToOutput',  
  transform: 'transform',
  reverse: 'reverse',
  cssBundler: 'cssBundler',
};

program
  .option(
    '-a, --act <action>',
    'Action to perform (required) \n available actions: [' +
      Object.keys(programActions).reduce((acc, key) => acc + key + ', ', ' ') +
      ']\n'
  )
  .option('-f, --file <fileName>', 'File to take (optional)')
  .option(
    '-p, --path <pathToFolder>',
    'Path to folder with css files (optional)'
  )
  .parse(process.argv);
  

if (!program.act) {
  console.log('\nplease provide action with --action flag');
  program.outputHelp();
}

const argProvided = (value, name) => {
  if (!value) {
    console.log(`please provide ${name} with --${name} option`);
    return false;
  }
  return true;
}

switch (program.act) {
  case programActions.reverse:
    reverse();
    break;
  case programActions.transform:
    reverse();
    break;
  case programActions.outputFile:
    if (!argProvided(program.file, 'file')) break;
    inputOutput(program.file);
    break;
  case programActions.transformToOutput:
    if (!argProvided(program.file, 'file')) break;
    transformFile(program.file, transformFileModes.toStdout);
    break;
  case programActions.transformToFile:
    if (!argProvided(program.file, 'file')) break;
    transformFile(program.file, transformFileModes.toFile);
    break;
  case programActions.cssBundler:
    if (!argProvided(program.path, 'path')) break;
    bundleCSS(program.path);
    break;
  default: 
    console.warn('\nincorrect action passed, see usage');
    program.outputHelp();
}
