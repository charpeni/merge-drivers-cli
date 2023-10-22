import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

/**
 * @typedef {Object} MergeDriver
 * @property {string} name
 * @property {string} driver
 */

/**
 * @typedef {Object} MergeDriverDisabled
 * @property {string} [name]
 * @property {string} [driver]
 * @property {boolean} disabled
 */

/**
 * @typedef {Object} Config
 * @property {Object.<string, MergeDriver | MergeDriverDisabled>} merge-drivers
 */

/**
 * Asserts that the `config` object is valid and contains expected properties.
 *
 * @param {unknown | Config} config
 * @returns {asserts config is Config}
 */
export function assertConfigIsValid(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Config is missing');
  }

  const assertedConfig = /** @type {Config} */ (config);

  if (!('merge-drivers' in assertedConfig)) {
    throw new Error('Config is missing merge-drivers property');
  }

  Object.entries(assertedConfig['merge-drivers']).forEach(
    ([key, mergeDriver]) => {
      if (!mergeDriver || typeof mergeDriver !== 'object') {
        throw new Error(
          `Merge driver for \`${key}\` is invalid. It's likely empty, provide at least a name and driver properties or disable it by setting disabled: true`,
        );
      }

      // A merge driver is invalid if it is not disabled and does not contain a name and driver property.
      if (
        !('disabled' in mergeDriver) &&
        (!mergeDriver.name || !mergeDriver.driver)
      ) {
        throw new Error(
          `Merge driver for \`${key}\` is invalid, missing name or driver property`,
        );
      }
    },
  );
}

/**
 * Reads the configuration from the specified `filePath` and returns it as an asserted `Config` object.
 *
 * @param {string} fileName
 * @returns {Config}
 */
export function readConfig(fileName) {
  const filePath = path.resolve(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Config file not found: ${filePath}`);
  }

  const file = fs.readFileSync(filePath, 'utf8');
  const config = YAML.parse(file);

  assertConfigIsValid(config);

  return config;
}
