#!/usr/bin/env node

import { program, Option } from 'commander';
import gendiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .addOption(new Option('-f, --format <type>', 'output format')
    .choices(['stylish', 'plain', 'json']).default('stylish'))
  .action((filepath1, filepath2, option) => {
    const diff = gendiff(filepath1, filepath2, option.format);
    console.log(diff);
  });

program.parse();
