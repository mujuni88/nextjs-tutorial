import { expect, test } from '@playwright/test';

test('test if sign up works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const text = await page.getByText('You are not logged in');

  console.log(text);
  expect(text).toBeTruthy();
});

const post = {
  title: 'Test title',
  content: 'Content of the post',
};
test('test if post is created', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByPlaceholder('Title').fill(post.title);
  await page.getByPlaceholder('Content').fill(post.content);
  await page.getByRole('button', { name: /submit/i }).click();

  const title = await page.getByText(post.title);
  const content = await page.getByText(post.content);

  console.log(title, content);
  expect(title).toBeTruthy();
  expect(content).toBeTruthy();
});
