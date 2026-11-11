import { test, expect } from '@playwright/test'
import pages from '../content/pages.json' with { type: 'json' }
const base = 'http://127.0.0.1:4173/arcdisco-static'
test('all pages hydrate and local assets load under the Pages prefix', async ({ page }) => {
  const failures: string[] = []
  page.on('pageerror', error => failures.push(error.message))
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`) })
  for (const entry of pages) {
    await page.goto(base + entry.path)
    await expect(page).toHaveTitle(entry.title)
    await expect(page.locator('#main h1').first()).toBeVisible()
    await page.locator('body').evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(100)
    const links = await page.locator('[href^="/"], [src^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href') || node.getAttribute('src')))
    expect(links.every(link => link?.startsWith('/arcdisco-static/'))).toBeTruthy()
  }
  expect(failures).toEqual([])
})
test('mobile navigation and gallery dialog work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base + '/gallery/')
  await page.locator('#menuLink').click()
  await expect(page.locator('#menuLink')).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.locator('#menuLink')).toHaveAttribute('aria-expanded', 'false')
  await page.locator('.static-gallery a').first().click()
  await expect(page.locator('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close photograph' }).click()
  await expect(page.locator('dialog')).not.toBeVisible()
})
test('enquiry forms validate required details', async ({ page }) => {
  for (const path of ['/contact/', '/photo-booth-enquiry/']) {
    await page.goto(base + path)
    expect(await page.locator('form').evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(false)
    await expect(page.locator('.email-note')).toContainText('email app')
  }
})
