import commander from 'commander';

export default () => {
  const program = new commander.Command();
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .help();
  program.parse(process.argv);
};
