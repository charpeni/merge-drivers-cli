<p align="center">
  <img height="100" src="https://github.com/charpeni/merge-drivers-cli/assets/7189823/6982c8dc-b078-477f-82b9-9bbfd9ec3860" alt="CLI's logo">
</p>

<h3 align="center">
  Merge Drivers CLI
</h3>

<p align="center">
  A command-line interface to conveniently manage custom git merge drivers.
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/merge-drivers-cli">
    <img src="https://badge.fury.io/js/merge-drivers.svg" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.org/package/merge-drivers">
    <img src="https://img.shields.io/npm/dm/merge-drivers" alt="Monthly downloads" />
  </a>
  <a href="https://circleci.com/gh/charpeni/merge-drivers-cli">
    <img src="https://circleci.com/gh/charpeni/merge-drivers-cli.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://circleci.com/gh/charpeni/merge-drivers-cli">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/charpeni/merge-drivers-cli/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Merge Drivers CLI is released under the MIT license." />
  </a>
</p>

<hr />

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