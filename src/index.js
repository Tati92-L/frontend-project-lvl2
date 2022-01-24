import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import funcDiff from './nestedObjDiff.js';
import formater from '../formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath1), 'utf-8');
  const format1 = path.extname(filepath1);

  const data2 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath2), 'utf-8');
  const format2 = path.extname(filepath2);

  const file1 = parsers(data1, format1);
  const file2 = parsers(data2, format2);

  return formater(funcDiff(file1, file2), format);
};
export default genDiff;
