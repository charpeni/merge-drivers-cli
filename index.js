#!/usr/bin/env node
import { Command } from 'commander';

import { install } from './commands/install.js';
import { uninstall } from './commands/uninstall.js';
import { clean } from './commands/clean.js';

import { readConfig } from './utils/config.js';

const config = readConfig('.merge-drivers.yml');
const program = new Command();

program.description('TODO');

program
  .command('install')
  .description('Installs merge drivers')
  .option('-nc, --no-clean', 'Skip cleaning merge drivers before installing')
  .action(async (options) => {
    if (options.clean) {
      await clean(config);
    }

    await install(config);
  });
program
  .command('uninstall')
  .description('Uninstalls merge drivers')
  .action(() => {
    uninstall(config);
  });
program
  .command('clean')
  .description('Cleans merge drivers by uninstalling disabled ones')
  .action(() => {
    clean(config);
  });

program.parse(process.argv);
