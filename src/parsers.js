import yaml from 'yaml';
import ini from 'ini';

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

const parseIni = (data) => {
  const obj = ini.parse(data);
  return replaceString(obj);
};

const parse = (data, extname) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.parse,
    yaml: yaml.parse,
    ini: parseIni,
  };
  return parsers[extname](data);
};

export default parse;
