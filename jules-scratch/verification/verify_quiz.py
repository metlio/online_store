from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the page with the quiz
        page.goto("http://localhost:3000/other", timeout=20000)

        # Wait for the first question to be visible
        question_counter = page.locator(".question-count").first
        expect(question_counter).to_be_visible(timeout=10000)
        expect(question_counter).to_contain_text("Question 1/5")

        # Loop through all questions and answer them
        for i in range(5):
            question_text_locator = page.locator('.question-text').first
            expect(question_text_locator).to_be_visible()
            question_text = question_text_locator.inner_text()
            print(f"Answering question {i+1}: {question_text}")

            # Click the first answer option
            first_answer_button = page.locator(".answer-section button").first
            expect(first_answer_button).to_be_visible()
            first_answer_button.click()

            # Wait for the next question to appear, unless it's the last one
            if i < 4:
                next_question_counter = page.locator(".question-count").first
                expect(next_question_counter).to_contain_text(f"Question {i+2}/5", timeout=5000)

        # After all questions, the score should be visible
        score_section = page.locator(".score-section").first
        expect(score_section).to_be_visible(timeout=5000)
        expect(score_section).to_contain_text("You scored")

        # Take a screenshot of the final score
        screenshot_path = "/app/jules-scratch/verification/verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot on error for debugging
        page.screenshot(path="/app/jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)