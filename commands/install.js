import { action } from '../utils/action.js';

/**
 * @param {number | undefined} milliseconds
 */
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function install() {
  console.log('Intro message');

  const errors = [
    await action('Install 1', async () => {
      await wait(3000);
    }),
    await action('Install 3', () => {
      throw new Error('STOP');
    }),
    await action('Install 2', async () => {
      await wait(3000);
    }),
  ];

  if (errors.some((error) => error !== undefined)) {
    process.exit(1);
  }
}
