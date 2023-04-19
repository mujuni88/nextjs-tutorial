import { expect, test as setup } from '@playwright/test';
import { env } from '../env.mjs';
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill(env.GITHUB_USERNAME);
  await page.getByLabel('Password').fill(env.GITHUB_PWD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('https://github.com/');

  await expect(
    page.getByRole('button', { name: 'View profile and more' })
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});
