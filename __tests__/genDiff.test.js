import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';
import displayFormat from '../src/slylish.js'


// test('check working genDiff with diffrence format', () => {
//   const arr = [
//      '  host: hexlet.io',
//      '+ timeout: 20',
//      '- timeout: 50',
//      '- proxy: 123.234.53.22',
//      '- follow: false',
//      '+ verbose: true',
//   ];
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);
//   test.each([
//     ['before.yml', 'after.yml'],
//     ['before.ini', 'after.ini'],
//    ])('(%%)', (filepath1, filepath2) => {
//     const tree =  genDiff(path.join(__dirname, '__fixtures__', filepath1), path.join(__dirname,'__fixtures__', filepath2));
//     expect(displayFormat(tree)).toEqual(`${arr.join('\n')}`);
//    });
// });

test('check working genDiff with recursive file', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const tree =  genDiff(path.join(__dirname, '__fixtures__', 'before.json'), path.join(__dirname,'__fixtures__', 'after.json'));
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'result.txt'), 'utf-8');
  const format = displayFormat(tree);
  expect(format).toBe(result);
});
