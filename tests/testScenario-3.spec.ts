
import test, { expect } from "../lambdatest-setup";

test.describe("Input Form Submit", () => {
  test("should validate form submission with all fields", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/", {
      waitUntil: "domcontentloaded",
    });

    await page.getByRole("link", { name: "Input Form Submit" }).click();
    await expect(page).toHaveURL(/input-form-demo/);

    const mainForm = page.locator("form").filter({
      has: page.locator("#name"),
    }).first();

    const nameInput = mainForm.locator("#name");
    const emailInput = mainForm.locator("#inputEmail4");
    const passwordInput = mainForm.locator("#inputPassword4");
    const companyInput = mainForm.locator("#company");
    const websiteInput = mainForm.locator("#websitename");
    const countrySelect = mainForm.locator("select[name='country']");
    const cityInput = mainForm.locator("#inputCity");
    const address1Input = mainForm.locator("#inputAddress1");
    const address2Input = mainForm.locator("#inputAddress2");
    const stateInput = mainForm.locator("#inputState");
    const zipInput = mainForm.locator("#inputZip");
    const submitButton = mainForm.getByRole("button", { name: "Submit", exact: true });

    await expect(nameInput).toBeVisible();

    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();

    await expect(nameInput).toHaveAttribute("required", "");

    await nameInput.fill("Steve");
    await emailInput.fill("steve46@email.com");
    await passwordInput.fill("Secure123!");
    await companyInput.fill("TestMu AI Corp");
    await websiteInput.fill("https://www.testmuai.com");
    await countrySelect.selectOption({ label: "United States" });
    await cityInput.fill("New York");
    await address1Input.fill("Wall Street");
    await address2Input.fill("Dno:10-105");
    await stateInput.fill("NY");
    await zipInput.fill("3456");

    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();

    const successMessage = page.locator(".success-msg").first();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(
      "Thanks for contacting us, we will get back to you shortly."
    );
  });
});
