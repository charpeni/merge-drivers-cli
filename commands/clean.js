import { execa } from 'execa';

import { action } from '../utils/action.js';
import { getDisabledmergeDriversFromConfig } from '../utils/getMergeDriversFromConfig.js';

/**
 * Cleans merge drivers by uninstalling the ones that are disabled based on the provided config.
 *
 * @param {import("../utils/config.js").Config} config
 */
export async function clean(config) {
  const mergeDriversToClean = getDisabledmergeDriversFromConfig(config);

  const errors = [];

  // eslint-disable-next-line no-restricted-syntax -- Executing promises sequentially is exactly what we want here to avoid race conditions wit git.
  for (const [key] of mergeDriversToClean) {
    errors.push(
      // eslint-disable-next-line no-await-in-loop -- Executing promises sequentially is exactly what we want here to avoid race conditions wit git.
      await action(`Uninstall ${key}`, async () => {
        try {
          await execa(`git config --remove-section merge.${key}`, {
            shell: true,
          });
        } catch (error) {
          // We can safely exclude this error, because merge drivers may not be all installed.
          if (
            error &&
            typeof error === 'object' &&
            'stderr' in error &&
            typeof error.stderr === 'string' &&
            error.stderr.includes('fatal: no such section:')
          ) {
            return;
          }

          throw new Error(`Uninstallation of ${key} failed`, {
            cause: error,
          });
        }
      }),
    );
  }

  if (errors.some((error) => error !== undefined)) {
    process.exit(1);
  }
}
