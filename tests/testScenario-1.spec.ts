
import test, { expect } from "../lambdatest-setup";

test.describe("Simple Form Demo Validation", () => {
  test("should validate simple form message display", async ({ page }) => {
    const msg = "Welcome to TestMu AI";

    await page.goto("https://www.testmuai.com/selenium-playground/", {
      waitUntil: "domcontentloaded",
    });

    await page.getByRole("link", { name: "Simple Form Demo" }).click();
    await expect(page).toHaveURL(/simple-form-demo/);

    const messageInput = page.locator('input[placeholder="Please enter your Message"]').first();
    const showMessageButton = page.getByRole("button", {
      name: "Get Checked Value",
      exact: true,
    }).first();
    const outputMessage = page.locator("#message").first();

    await expect(messageInput).toBeVisible();
    await messageInput.fill(msg);

    await showMessageButton.scrollIntoViewIfNeeded();
    await showMessageButton.click();

    await expect(outputMessage).toHaveText(msg);
  });
});
