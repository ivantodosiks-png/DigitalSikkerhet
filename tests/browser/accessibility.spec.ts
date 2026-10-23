import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const theme of ['dark', 'light']) {
  test(`accessibility in ${theme} theme`, async ({ page }) => {
    test.setTimeout(120_000)
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    if (theme === 'light') await page.getByRole('button', { name: 'Bruk lyst tema' }).click()
    const problems: unknown[] = []
    for (const route of ['/', '/login', '/dashboard', '/courses/passord?lesson=1', '/courses/passord/quiz', '/settings']) {
      if (route === '/dashboard') {
        await page.getByRole('button', { name: 'Prøv med demoprofil' }).click()
      } else await page.goto(route)
      await expect(page.getByRole('heading').first()).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      problems.push(...results.violations.map(v => ({ route, rule: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })))
    }
    expect(problems).toEqual([])
  })
}
