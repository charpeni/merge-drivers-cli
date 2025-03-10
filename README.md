# Merge Drivers CLI

<img height="125" src="https://github.com/charpeni/merge-drivers-cli/assets/7189823/88ff5ee8-ea54-4c0e-b51e-39c9474d1990" alt="CLI's logo" align="right">

[![Version](https://badge.fury.io/js/merge-drivers.svg)](https://www.npmjs.org/package/merge-drivers)
[![Monthly Downloads](https://img.shields.io/npm/dm/merge-drivers)](https://www.npmjs.org/package/merge-drivers)
[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/charpeni/merge-drivers-cli/blob/main/LICENSE)

A command-line interface to conveniently manage custom git merge drivers.

<br />

## Why

Git offers the ability to define two types of custom merge drivers. The first one is global, accessible through `~/.gitconfig`. The second one is local, accessible through `.git/config`. The problem is that the configuration of these drivers is not very convenient as neither of these solutions are versioned.

This CLI aims to solve this problem by providing a simple and intuitive interface to manage these drivers.

[📚 Use Custom Merge Driver to Simplify Git Conflicts](https://www.charpeni.com/blog/use-custom-merge-driver-to-simplify-git-conflicts).

## Usage

Merge drivers are defined within a configuration file that should be living at the root of your project named as `.merge-drivers.yml`. This file is a YAML file that should contain a list of drivers (under `merge-drivers` key). Each driver is defined by a key, name, and a driver (command). Here is an example of such a file:

```yaml
merge-drivers:
  yarn:
    name: 'yarn merge driver'
    driver: 'yarn install'
```

From there, you will be able to use the following commands:

Ideally, we would like to automate the installation of those merge drivers.

> [!WARNING]
> It could be achieved by using a `prepare` script in your `package.json` file. However, it may not possible depending on your package manager (_e.g., Yarn 2 and above don't execute `prepare`, so you would want to look into `postinstall`, see [Husky documentation for Yarn 2+](https://typicode.github.io/husky/getting-started.html#yarn-2) as a good reference_).

### Install

Installs merge drivers based on the provided config.

> [!NOTE]
> Automatically executes `clean` command before installing, unless `--no-clean` is specified.

```sh
npx merge-drivers install [merge-drivers...] [--no-clean]
```

### Uninstall

Uninstalls merge drivers based on the provided config.

```sh
npx merge-drivers uninstall [merge-drivers...] [--no-clean]
```

### Clean

Cleans merge drivers by uninstalling the ones that are disabled based on the provided config.

> [!NOTE]
> Automatically executed as part of `install` command, unless `--no-clean` is specified.

```sh
npx merge-drivers clean
```

## License

merge-drivers is [MIT licensed](LICENSE).
