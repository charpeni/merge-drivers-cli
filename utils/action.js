import ora from 'ora';

/**
 * Executes an async function using ora to display a spinner.
 *
 * @param {string} title - Title used to describe the action.
 * @param {() => Promise<string | void>} asyncFunction - Async function to be executed.
 */
export async function action(title, asyncFunction) {
  const spinner = ora(title).start();

  try {
    await asyncFunction();

    spinner.succeed(title);
  } catch (error) {
    spinner.fail(title);

    return error;
  }
}
