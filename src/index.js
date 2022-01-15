import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath1), 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath2), 'utf-8'));

  const keys = Object.keys({ ...file1, ...file2 }).sort();

  let result = keys
    .map((key) => {
      let item;
      const f1 = file1[key];
      const f2 = file2[key];
      const item1 = `${key}: ${f1}`;
      const item2 = `${key}: ${f2}`;

      if (_.has(file1, key) && _.has(file2, key)) {
        const full = [`  + ${item1}`, `  + ${item2}`];
        item = f1 === f2 ? `    ${item1}` : full;
      } else if (_.has(file1, key)) {
        item = `  - ${item1}`;
      } else if (_.has(file2, key)) {
        item = `  - ${item2}`;
      }
      return item;
    })
    .flat()
    .join('\n');

  result = `{\n${result}\n}`;
  return result;
};
export default genDiff;
