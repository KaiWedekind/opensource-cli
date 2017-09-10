#!/usr/bin/env node --harmony
/* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }] */

const fs = require('fs');
const { join, resolve } = require('path');
const colors = require('chalk');
const shell = require('shelljs');

const yargs = require('yargs');
const { template } = require('./package.json');

const isVoid = (folderDst, project, callback) => {
  fs.stat(folderDst, (err, stats) => {
    if (err) {
      return callback();
    }
    if (stats) {
      const fileType = (stats.isDirectory()) ? 'folder' : 'file';
      shell.echo(colors.redBright(`ERROR: A ${fileType} with name "${project}" already exists`));
    }
    return null;
  });
};

// Switch CWD if specified from options
const cwd = resolve(yargs.argv.path || process.cwd());
process.chdir(cwd);

// Init CLI commands and options
yargs.command({
  command: 'create <project>',
  aliases: ['new'],
  desc: 'Scaffolding command to create a new project',
  builder: {},
  handler: (argv) => {
    const { project, description, author, email, repo } = argv;
    const folderSrc = join(__dirname, './scaffolding/create');
    const folderDst = join(process.cwd(), project);
    const github = 'https://github.com/';

    isVoid(folderDst, project, () => {
      shell.rm('-rf', folderSrc);

      if (!template || !template.repository) return;
      const templateRepository = template.repository;

      if (shell.exec(`git clone -b cli ${templateRepository} ${folderSrc}`).code !== 0) {
        shell.echo(colors.redBright('Error: git clone failed'));
        shell.exit(1);
      }

      const gitURL = repo.replace('.git', '');
      const isString = typeof gitURL === 'string';

      const repository = (gitURL && isString) ? `${gitURL}.git` : '';
      const issues = (gitURL && isString) ? `${gitURL}/issues` : '';
      const homepage = (gitURL && isString) ? `${gitURL}#readme'` : '';

      // Replace macros in package.json
      shell.cd(folderSrc);
      shell.sed('-i', 'PROJECT', project.toLowerCase().replace(' ', '-'), 'package.json');
      shell.sed('-i', 'DESCRIPTION', description || '', 'package.json');
      shell.sed('-i', 'AUTHOR', author || '', 'package.json');
      shell.sed('-i', 'EMAIL', email || '', 'package.json');
      shell.sed('-i', 'REPOSITORY', repository, 'package.json');
      shell.sed('-i', 'BUGS', issues, 'package.json');
      shell.sed('-i', 'HOMEPAGE', homepage, 'package.json');
      shell.sed('-i', 'PROJECT', project.toUpperCase(), 'README.md');

      if (email) {
        shell.sed('-i', 'EMAIL', email || '', 'CODE OF CONDUCT.md');
      }

      if (gitURL.indexOf(github) > -1) {
        const badge = gitURL.replace(github, '');
        shell.sed('-i', 'TRAVIS', `[![Travis](https://img.shields.io/travis/${badge}.svg)]()`, 'README.md');
        shell.sed('-i', 'CODECOV', `[![Codecov](https://img.shields.io/codecov/c/github/${badge}.svg)]()`, 'README.md');
        shell.sed('-i', 'ISSUES', `[![Issues](https://img.shields.io/github/issues/${badge}.svg)](${issues})`, 'README.md');
        shell.sed('-i', 'DOWNLOADS', `[![Github All Releases](https://img.shields.io/github/downloads/${badge}/total.svg)]()`, 'README.md');
        shell.sed('-i', 'FORKS', `[![Forks](https://img.shields.io/github/forks/${badge}.svg)](${gitURL}/network)`, 'README.md');
        shell.sed('-i', 'STARS', `[![Stars](https://img.shields.io/github/stars/${badge}.svg)](${gitURL}/stargazers)`, 'README.md');
        shell.sed('-i', 'LICENSE', `[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/${badge}/master/LICENSE)`, 'README.md');
        shell.sed('-i', 'PACKAGE', `[![Package](https://img.shields.io/badge/npm-5.0.3-blue.svg)](package)`, 'README.md');
        shell.sed('-i', 'CODEOFCONDUCT', `[![CodeOfConduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg)]()`, 'README.md');
      }

      shell.cp('-Rf', folderSrc, folderDst);
      shell.cd(folderDst);

      shell.rm('-rf', '.git');
      shell.exec(`git init`);

      if (gitURL && gitURL.length > 0) {
        shell.exec(`git remote add origin ${repository}`);
      }

      if (shell.exec('npm install').code !== 0) {
        shell.echo(colors.redBright('Error: npm install failed'));
        shell.exit(1);
      }
    });
  },
});

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
  .argv;
