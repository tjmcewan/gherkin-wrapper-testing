import { test as base } from "@playwright/test";
import GherkinWrapper from "gherkin-wrapper";

// Add fixtures
const test = base.extend<{ value: string }>({
    value: async ({ }, use) => {
        await use('go')
    }
})

// Build the wrapper
const wrapper = new GherkinWrapper.forPlaywright(test)

// Register step functions
wrapper.given(/the Maker has started a game with the word "(.*)"/, async ({ page, value }, { match }) => {
    await page.goto("http://localhost:3000/");
})
wrapper.when("the Breaker joins the Maker's game", () => { })
wrapper.then("the Breaker must guess a word with 5 characters", () => { })

// Run tests
wrapper.test('./features/example.feature')
