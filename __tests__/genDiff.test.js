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
  expect(genDiff('./public/before.json', './public/after.json')).toEqual(`{\n${arr.join('\n')}\n}`);
});
