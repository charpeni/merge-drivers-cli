/**
 * Returns all merged drivers that don't have `disabled` property set to true.
 *
 * @param {import("./config.js").Config} config
 */
export function getEnabledMergeDriversFromConfig(config) {
  const mergeDrivers =
    // Narrowing down to type to only return `MergeDriver` not `MergeDriverDisabled`
    /** @type {[string, import("./config.js").MergeDriver][]} */ (
      /** @type {unknown} */ Object.entries(config['merge-drivers']).filter(
        ([, mergeDriver]) =>
          !('disabled' in mergeDriver) || !mergeDriver.disabled,
      )
    );

  return mergeDrivers;
}

/**
 * Returns all merge drivers.
 *
 * @param {import("./config.js").Config} config
 */
export function getAllMergeDriversFromConfig(config) {
  return Object.entries(config['merge-drivers']);
}
