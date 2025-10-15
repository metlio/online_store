from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000/")
    page.screenshot(path="jules-scratch/verification/glitch_art_top.png")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.screenshot(path="jules-scratch/verification/glitch_art_bottom.png")
    browser.close()