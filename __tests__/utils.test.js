import readFile from '../src/utils.js';

test('check reading file', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(readFile('./public/before.json')).toEqual(before);
});
