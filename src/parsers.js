import yaml from 'yaml';
import _ from 'lodash';

const parseJSON = (data) => (JSON.parse(data));
const parseYML = (data) => (yaml.parse(data));

const parse = (data, extname) => {
  const parseFunc = {
    json: () => parseJSON(data),
    yml: () => parseYML(data),
  };
  const key = _.trim(extname, '.');
  return parseFunc[key]();
};

export default parse;
