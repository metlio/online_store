const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000/magazine');
    await page.waitForTimeout(2000);

    // Scroll to the very bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'magazine_bottom.png' });

    // Scroll halfway through the footer
    await page.evaluate(() => {
        const contentHeight = document.querySelector('div[ref="contentRef"]')?.offsetHeight || (document.body.scrollHeight - window.innerHeight);
        window.scrollTo(0, contentHeight - window.innerHeight/2);
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'magazine_reveal.png' });

    console.log('Screenshots taken');
  } catch (e) {
    console.error('Error taking screenshot:', e);
  } finally {
    await browser.close();
  }
})();
