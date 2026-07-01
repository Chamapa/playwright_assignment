
import test, { expect } from "../lambdatest-setup";

test.describe("Drag & Drop Sliders", () => {
  test("should drag slider from default 15 to 95", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/", {
      waitUntil: "domcontentloaded",
    });

    const sliderLink = page.getByRole("link", { name: "Drag & Drop Sliders" });
    await expect(sliderLink).toBeVisible();
    await sliderLink.click();

    await expect(page).toHaveURL(/drag-drop-range-sliders-demo/);

    const sliderContainer = page.locator(
      "//h4[contains(text(),'Default value 15')]/following-sibling::div"
    );
    const slider = sliderContainer.locator("input[type='range']");
    const rangeValue = sliderContainer.locator("output");

    await expect(rangeValue).toHaveText("15");

    const sliderBoundingBox = await slider.boundingBox();
    if (!sliderBoundingBox) {
      throw new Error("Slider bounding box not found");
    }

    const { x, y, width, height } = sliderBoundingBox;
    const startX = x + width * 0.15;
    const targetX = x + width * 0.95;
    const centerY = y + height / 2;

    await page.mouse.move(startX, centerY);
    await page.mouse.down();

    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      const currentX = startX + ((targetX - startX) * i) / steps;
      await page.mouse.move(currentX, centerY);
    }

    await page.mouse.up();

    let currentValue = parseInt((await rangeValue.textContent()) || "0", 10);
    let attempts = 0;

    while (currentValue !== 95 && attempts < 30) {
      await slider.focus();
      await page.keyboard.press(currentValue < 95 ? "ArrowRight" : "ArrowLeft");
      currentValue = parseInt((await rangeValue.textContent()) || "0", 10);
      attempts++;
    }

    await expect(rangeValue).toHaveText("95");
  });
});
