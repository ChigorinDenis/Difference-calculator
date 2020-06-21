import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const readFile = (filepath) => {
  const { dir, base, ext } = path.parse(filepath);
  const content = fs.readFileSync(path.resolve(dir, base), 'utf-8');
  return parse(content, ext);
};

export default readFile;
