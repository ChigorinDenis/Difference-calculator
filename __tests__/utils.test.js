import readFile from '../src/utils.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';


test('check reading file', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  expect(readFile(path.join(__dirname, '__fixtures__/before.json'))).toEqual(before);
  expect(readFile(path.join(__dirname, '__fixtures__/before.yml'))).toEqual(before);
});
