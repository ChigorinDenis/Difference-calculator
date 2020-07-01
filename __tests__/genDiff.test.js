import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// test('check working genDiff with diffrence format', () => {
//   const arr = [
//      '  host: hexlet.io',
//      '+ timeout: 20',
//      '- timeout: 50',
//      '- proxy: 123.234.53.22',
//      '- follow: false',
//      '+ verbose: true',
//   ];
//   const tree =  genDiff(path.join(__dirname, '__fixtures__', filepath1), path.join(__dirname,'__fixtures__', filepath2));
//   test.each([
//     ['before.yml', 'after.yml'],
//     ['before.ini', 'after.ini'],
//    ])('(%s, s%)', (filepath1, filepath2) => {  
//     expect(displayFormat(tree)).toEqual(`${arr.join('\n')}`);
//    });
// });

test('genDiff recursive file formatted by stylish', () => {
  const diff =  genDiff(path.join(__dirname, '__fixtures__', 'before.json'), path.join(__dirname,'__fixtures__', 'after.json'), 'stylish');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'stylish.txt'), 'utf-8');
  expect(diff).toBe(result);
});

test('genDiff recursive file formatted by plain', () => {
  const diff =  genDiff(path.join(__dirname, '__fixtures__', 'before.json'), path.join(__dirname,'__fixtures__', 'after.json'), 'plain');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__', 'plain.txt'), 'utf-8');
  expect(diff).toBe(result);
});
