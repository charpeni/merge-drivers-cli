#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.description('TODO');

program
  .command('install')
  .description('TODO')
  .action(() => {
    // TODO
    console.log('Installing...');
  });

program
  .command('uninstall')
  .description('TODO')
  .action(() => {
    // TODO
    console.log('Uninstalling...');
  });

program.parse(process.argv);
