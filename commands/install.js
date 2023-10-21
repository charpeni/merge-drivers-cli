import { execa } from 'execa';

import { action } from '../utils/action.js';
import { getEnabledMergeDriversFromConfig } from '../utils/getMergeDriversFromConfig.js';

/**
 * Installs merge drivers based on the provided config.
 *
 * @param {import("../utils/config.js").Config} config
 */
export async function install(config) {
  const mergeDriversToInstall = getEnabledMergeDriversFromConfig(config);

  const errors = [];

  // eslint-disable-next-line no-restricted-syntax -- Executing promises sequentially is exactly what we want here to avoid race conditions wit git.
  for (const [key, mergeDriver] of mergeDriversToInstall) {
    errors.push(
      // eslint-disable-next-line no-await-in-loop -- Executing promises sequentially is exactly what we want here to avoid race conditions wit git.
      await action(`Install ${key}`, async () => {
        try {
          await execa(`git config merge.${key}.name "${mergeDriver.name}"`, {
            shell: true,
          });
          await execa(
            `git config merge.${key}.driver "${mergeDriver.driver}"`,
            { shell: true },
          );
        } catch (error) {
          throw new Error(`Installation of ${key} failed`, { cause: error });
        }
      }),
    );
  }

  if (errors.some((error) => error !== undefined)) {
    process.exit(1);
  }
}
