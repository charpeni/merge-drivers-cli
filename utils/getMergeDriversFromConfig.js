/**
 * Returns all merged drivers that don't have `disabled` property set to true.
 *
 * @param {import("./config.js").Config} config
 */
export function getEnabledMergeDriversFromConfig(config) {
  // Narrowing down to type to only return `MergeDriver` not `MergeDriverDisabled`
  return /** @type {[string, import("./config.js").MergeDriver][]} */ (
    /** @type {unknown} */ Object.entries(config['merge-drivers']).filter(
      ([, mergeDriver]) =>
        !('disabled' in mergeDriver) || !mergeDriver.disabled,
    )
  );
}

/**
 * Returns all merged drivers that have `disabled` property set to true.
 *
 * @param {import("./config.js").Config} config
 */
export function getDisabledmergeDriversFromConfig(config) {
  // Narrowing down to type to only return `MergeDriverDisabled` not `MergeDriver`
  return /** @type {[string, import("./config.js").MergeDriverDisabled][]} */ (
    /** @type {unknown} */ Object.entries(config['merge-drivers']).filter(
      ([, mergeDriver]) => 'disabled' in mergeDriver && mergeDriver.disabled,
    )
  );
}

/**
 * Returns all merge drivers.
 *
 * @param {import("./config.js").Config} config
 */
export function getAllMergeDriversFromConfig(config) {
  return Object.entries(config['merge-drivers']);
}
