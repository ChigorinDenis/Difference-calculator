import yaml from 'yaml';
import ini from 'ini';
import _ from 'lodash';

const parseJSON = (data) => JSON.parse(data);
const parseYML = (data) => yaml.parse(data);
const parseIni = (data) => ini.parse(data);

const parse = (data, extname) => {
  const parseFunc = {
    json: () => parseJSON(data),
    yml: () => parseYML(data),
    ini: () => parseIni(data),
  };
  const key = _.trim(extname, '.');
  return parseFunc[key]();
};

export default parse;
