import yaml from 'yaml';
import ini from 'ini';
import _ from 'lodash';

const replaceString = (obj) => {
  const newObj = Object.entries(obj)
    .reduce((acc, [key, value]) => {
      if (typeof value === 'object') {
        return { ...acc, [key]: replaceString(value) };
      }
      if (!Number.isNaN(parseInt(value, 10))) {
        return { ...acc, [key]: parseInt(value, 10) };
      }
      return { ...acc, [key]: value };
    }, {});
  return newObj;
};
const parseJSON = (data) => JSON.parse(data);
const parseYML = (data) => yaml.parse(data);
const parseIni = (data) => {
  const obj = ini.parse(data);
  return replaceString(obj);
};

const parse = (data, extname) => {
  const parseFunc = {
    json: parseJSON,
    yml: parseYML,
    yaml: parseYML,
    ini: parseIni,
  };
  const key = _.trim(extname, '.');
  return parseFunc[key](data);
};

export default parse;
