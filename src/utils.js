import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const { dir, base } = path.parse(filepath);
  const content = fs.readFileSync(path.resolve(dir, base), 'utf-8');
  return JSON.parse(content);
};

export default readFile;
