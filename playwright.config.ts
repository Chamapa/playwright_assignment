
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

if (!username || !accessKey) {
  throw new Error("Missing LT_USERNAME or LT_ACCESS_KEY in .env");
}

const cloudWs = (capabilities: object) =>
  `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;

export default defineConfig({
  testDir: "./tests",
  timeout: 240_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  expect: {
    timeout: 15_000,
  },
  use: {
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "pw-chromium:latest:Windows 10@lambdatest",
      use: {
        connectOptions: {
          wsEndpoint: cloudWs({
            browserName: "pw-chromium",
            browserVersion: "latest",
            "LT:Options": {
              platform: "Windows 10",
              build: "playwright-101-assignment",
              name: "Chrome Windows test",
              user: username,
              accessKey: accessKey,
              network: true,
              video: true,
              console: true,
              visual: true,
            },
          }),
          timeout: 120_000,
        },
      },
    },
    {
      name: "pw-firefox:latest:Windows 11@lambdatest",
      use: {
        connectOptions: {
          wsEndpoint: cloudWs({
            browserName: "pw-firefox",
            browserVersion: "latest",
            "LT:Options": {
              platform: "Windows 11",
              build: "playwright-101-assignment",
              name: "Firefox Windows test",
              user: username,
              accessKey: accessKey,
              network: true,
              video: true,
              console: true,
              visual: true,
            },
          }),
          timeout: 120_000,
        },
      },
    },
  ],
});
