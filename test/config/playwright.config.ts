import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  reportSlowTests: { max: 0, threshold: 240000 },
  timeout: 180000,
  maxFailures: 2,
  workers: 2,
  fullyParallel: true,
  use: {
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Chromium",
      testDir: "../specs/",
      testMatch: /.spec.ts/,
      use: {
        browserName: "chromium",
        launchOptions: {
          channel: "chrome",
          // force GPU hardware acceleration
          // (even in headless mode)
          args: ["--use-angle=default", "--start-fullscreen"],
        },
      },
    },
    {
      name: "Chromium",
      testDir: "../api-test/",
      testMatch: /.spec.ts/,
      use: {
        headless: true,
        browserName: "chromium",
        launchOptions: {
          channel: "chrome",
          // force GPU hardware acceleration
          // (even in headless mode)
          args: ["--use-angle=default", "--start-fullscreen"],
        },
      },
    }
  ],
  reporter: [
    ["list"], 
    // html reporter needs to be first, because it will clear the output folder.
    ["html", { open: "never", outputFolder: "../output" }],
    ["junit", { outputFile: "../output/results.xml" }]
  ],
};

export default config;
