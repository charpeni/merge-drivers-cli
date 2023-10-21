#!/usr/bin/env node
import { Command } from 'commander';

import { install } from './commands/install.js';
import { uninstall } from './commands/uninstall.js';

import { readConfig } from './utils/config.js';

const config = readConfig('./.merge-drivers.yml');
const program = new Command();

program.description('TODO');

program
  .command('install')
  .description('TODO')
  .action(() => {
    install(config);
  });
program
  .command('uninstall')
  .description('TODO')
  .action(() => {
    uninstall(config);
  });

program.parse(process.argv);
