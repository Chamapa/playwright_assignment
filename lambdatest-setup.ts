
import { test as base, expect } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if (!testInfo.project.name.includes("@lambdatest")) {
      return;
    }

    const status = testInfo.status === "passed" ? "passed" : "failed";
    const remark = testInfo.error?.message ?? "";

    try {
      await page.evaluate(
        () => {},
        `lambdatest_action: ${JSON.stringify({
          action: "setTestStatus",
          arguments: {
            status,
            remark,
          },
        })}`
      );
    } catch {
      // Ignore LambdaTest status update failures.
    }
  },
});

export default test;
export { expect };
