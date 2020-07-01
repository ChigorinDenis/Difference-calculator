import commander from 'commander';
import genDiff from './genDiff.js';

export default () => {
  const program = new commander.Command();
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const diff = genDiff(filepath1, filepath2, program.format);
      console.log(diff);
    });
  program.parse(process.argv);
};
