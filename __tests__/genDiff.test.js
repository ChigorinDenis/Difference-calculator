import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';


test('check working genDiff', () => {
  const arr = [
    '  host: hexlet.io',
    '+ timeout: 20',
    '- timeout: 50',
    '- proxy: 123.234.53.22',
    '- follow: false',
    '+ verbose: true',
  ];
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  expect(genDiff(path.join(__dirname, '__fixtures__/before.json'), path.join(__dirname,'__fixtures__/after.json'))).toEqual(`{\n${arr.join('\n')}\n}`);
});
