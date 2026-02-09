const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000/magazine');
    await page.waitForTimeout(5000); // Wait for content to load
    await page.screenshot({ path: 'magazine_page.png', fullPage: true });
    console.log('Screenshot taken');
  } catch (e) {
    console.error('Error taking screenshot:', e);
  } finally {
    await browser.close();
  }
})();
