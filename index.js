#!/usr/bin/env node
import { Command } from 'commander';

import { install } from './commands/install.js';
import { uninstall } from './commands/uninstall.js';

const program = new Command();

program.description('TODO');

program.command('install').description('TODO').action(install);
program.command('uninstall').description('TODO').action(uninstall);

program.parse(process.argv);
