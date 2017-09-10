![opensource](https://user-images.githubusercontent.com/12070900/30003088-819ad23e-9086-11e7-9267-f45eee511193.png)

# Open Source Library - Template CLI

#### Template CLI to create an open source library in JavasSript

[![NPM](https://nodei.co/npm/opensource-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/opensource-cli/)

[![Travis](https://img.shields.io/travis/KaiWedekind/opensource-cli.svg)]()
[![Codecov](https://img.shields.io/codecov/c/github/KaiWedekind/opensource-cli.svg)]()
[![Issues](https://img.shields.io/github/issues/KaiWedekind/opensource-cli.svg)](https://github.com/KaiWedekind/opensource-cli/issues)
[![Github All Releases](https://img.shields.io/github/downloads/KaiWedekind/opensource-cli/total.svg)]()
[![Forks](https://img.shields.io/github/forks/KaiWedekind/opensource-cli.svg)](https://github.com/KaiWedekind/opensource-cli/network)
[![Stars](https://img.shields.io/github/stars/KaiWedekind/opensource-cli.svg)](https://github.com/KaiWedekind/opensource-cli/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/KaiWedekind/opensource-cli/master/LICENSE)
[![Package](https://img.shields.io/badge/npm-5.0.3-blue.svg)](package)
[![CodeOfConduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg)]()

## The Problem

You need a template to start a new open source library with JavaScript that uses travis ci for continuous delivery, mocha / chai for testing, webpack as module bundler and semantic-release for release versioning and can be distributed via npm.

## The Solution

opensource-cli is a ready to go setup to build your own library in JavaScript.

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and should be installed as one of your project's `dependencies`:

```javascript
npm install -g opensource-cli
```

## Usage

```javascript
os-temp create "PROJECT NAME" -a "AUTHOR" -e "EMAIL ADDRESS" -r "GIT REPOSITORY"
```

## API

**Show help**

```Text
os-temp
```

```Text
os-temp -h
```

```Text
os-temp --help
```

**Show CLI version**

```javascript
os-temp --version
```

**Create new Project**

```Text
os-temp create [OPTIONS]
```

```Text
os-temp new [OPTIONS]
```

Options:
- --path "path to your working directory"
- --cwd "path to your working directory"

- -d "project description"
- --description "project description"

- -a "project author"
- --author "project author"

- -e "email address"
- --email "email address"

- -r "git repository"
- --repository "git repository"

## Contributors

<table>
    <tr>
        <td align="center">
            <img src="https://avatars0.githubusercontent.com/u/12070900?v=4&s=460" width="100px;"/><br />
            <sub><a href="https://www.kaiwedekind.com/" target="_blank">Kai Wedekind</a></sub>
        </td>
    <tr>
</table>

## LICENSE

MIT