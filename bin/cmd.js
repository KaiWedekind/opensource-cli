#!/usr/bin/env node --harmony

const { resolve } = require('path');

const yargs = require('yargs');

const { homepage, version } = require('../package.json');

const { commands } = require('../index.js');

// Switch CWD if specified from options
const cwd = resolve(yargs.argv.path || process.cwd());
process.chdir(cwd);

// Init CLI commands and options
commands.forEach(cmd => yargs.command(cmd.command, cmd.desc, cmd.builder, cmd.handler));
yargs
  .version()
  .help()
  .options({
    path: {
      alias: 'cwd',
      desc: 'Change the current working directory',
    },
    description: {
      alias: 'd',
      describe: 'Add project description',
    },
    author: {
      alias: 'a',
      describe: 'Add author name',
    },
    email: {
      alias: 'e',
      describe: 'Add author email address',
    },
    repo: {
      alias: ['r'],
      describe: 'Add respository',
    },
  })
  .demand(1)
  .epilog((homepage ? `| Documentation: ${homepage}\n` : '') + (version ? `| Version: ${version}` : ''))
  .argv;
