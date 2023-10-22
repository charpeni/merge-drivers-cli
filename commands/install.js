import { execa } from 'execa';

import { action } from '../utils/action.js';
import {
  getEnabledMergeDriversFromConfig,
  getEnabledMergeDriversFromConfigMatchingKeys,
} from '../utils/getMergeDriversFromConfig.js';

/**
 * Installs merge drivers based on the provided config.
 *
 * @param {import("../utils/config.js").Config} config
 * @param {string[]} mergeDriversArgument
 */
export async function install(config, mergeDriversArgument) {
  const mergeDriversToInstall = (() => {
    if (mergeDriversArgument.length > 0) {
      return getEnabledMergeDriversFromConfigMatchingKeys(
        config,
        mergeDriversArgument,
      );
    }

    return getEnabledMergeDriversFromConfig(config);
  })();

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

  if (mergeDriversArgument.length > 0) {
    mergeDriversArgument
      .filter(
        (mergeDriver) =>
          !mergeDriversToInstall.some(([key]) => key === mergeDriver),
      )
      .forEach((mergeDriver) => {
        errors.push(
          action(
            `Install ${mergeDriver}, does note exist in the config`,
            () => {
              throw new Error(
                `Merge driver \`${mergeDriver}\` does not exist in the config`,
              );
            },
          ),
        );
      });
  }

  if (errors.some((error) => error !== undefined)) {
    process.exit(1);
  }
}
