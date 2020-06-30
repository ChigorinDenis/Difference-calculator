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
  const result = {
    common: {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value"
      }
    },
    group1: {
      "baz": "bas",
      "foo": "bar",
      "nest": {
        "key": "value"
      }
    },
    group2: {
      "abc": 12345
    }
  };
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  expect(readFile(path.join(__dirname, '__fixtures__/before.json'))).toEqual(result);
  expect(readFile(path.join(__dirname, '__fixtures__/before.yml'))).toEqual(before);
  // expect(readFile(path.join(__dirname, '__fixtures__/before.ini'))).toEqual(before);
});
