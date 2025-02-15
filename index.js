#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';

import { install } from './commands/install.js';
import { uninstall } from './commands/uninstall.js';
import { clean } from './commands/clean.js';

import { readConfig } from './utils/config.js';

const packageJsonPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'package.json',
);

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const config = readConfig('.merge-drivers.yml');
const program = new Command();

program
  .description(packageJson.description)
  .version(packageJson.version, '-v, --version', 'Output the current version');

program
  .command('install')
  .description('Installs merge drivers')
  .argument('[merge drivers...]')
  .option('-nc, --no-clean', 'Skip cleaning merge drivers before installing')
  .action(async (mergeDrivers, options) => {
    if (options.clean) {
      await clean(config);
    }

    await install(config, mergeDrivers);
  });
program
  .command('uninstall')
  .description('Uninstalls merge drivers')
  .argument('[merge drivers...]')
  .action((mergeDrivers) => {
    uninstall(config, mergeDrivers);
  });
program
  .command('clean')
  .description('Cleans merge drivers by uninstalling disabled ones')
  .action(() => {
    clean(config);
  });

program.parse(process.argv);
