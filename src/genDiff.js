import _ from 'lodash';
import readFile from './utils.js';

const combineFilesByKeys = (beforeFile, afterFile) => (
  _.mergeWith({ ...beforeFile }, afterFile, (a, b) => [a, b])
);

const isDeletedKey = (value) => (!Array.isArray(value));
const isNotEditValue = ([beforeValue, afterValue]) => (beforeValue === afterValue);
const isAddedKey = ([beforeValue]) => (beforeValue === undefined);

const genDiff = (filepath1, filepath2) => {
  const beforeFile = readFile(filepath1);
  const afterFile = readFile(filepath2);
  const combinedFileContent = combineFilesByKeys(beforeFile, afterFile);
  const str = Object.entries(combinedFileContent)
    .reduce((acc, [key, value]) => {
      if (isDeletedKey(value)) {
        return `${acc}- ${key}: ${value}\n`;
      }
      const [beforeValue, afterValue] = value;
      if (isAddedKey(value)) {
        return `${acc}+ ${key}: ${afterValue}\n`;
      }
      if (isNotEditValue(value)) {
        return `${acc}  ${key}: ${beforeValue}\n`;
      }
      return `${acc}+ ${key}: ${afterValue}\n- ${key}: ${beforeValue}\n`;
    }, '');
  return `{\n${str}}`;
};

export default genDiff;
