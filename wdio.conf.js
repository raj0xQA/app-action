import { sendEmail } from "./utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  runner: "local",
  specs: ["./test/app/**/*.js"],
  maxInstances: 1,
  logLevel: "info",
  waitforTimeout: 10000,
  framework: "mocha",
  mochaOpts: {
    timeout: 120000,
  },
  reporters: ["spec"],

  // Switch between services based on env
  services: [
    [
      "appium",
      {
        args: {
          relaxedSecurity: true,
        },
      },
    ],
  ],

  capabilities: [{
    // local
    platformName: "Android",
    "appium:deviceName": "Pixel_4_API_36",
    "appium:udid": "emulator-5554",
    "appium:platformVersion": "16",
    // "appium:deviceName": "Pixel_API_30_ARM",
    // "appium:udid": "emulator-5554",
    // "appium:platformVersion": "11",
    "appium:automationName": "UiAutomator2",
    "appium:app": process.env.LOCAL_APP,
    "appium:autoGrantPermissions": true,
    "appium:fullReset": true,
    "appium:noReset": false,
  },
  ],

  port: 4723,

  // user: isBrowserStack ? process.env.BROWSERSTACK_USERNAME : undefined,
  // key: isBrowserStack ? process.env.BROWSERSTACK_ACCESS_KEY : undefined,

  // afterTest: async function (test, context, result) {
  //   const { error, passed } = result;

  //   // Check the flag, default to true if not defined
  //   const shouldSendEmail = process.env.SEND_EMAIL !== "false";

  //   if (!passed && shouldSendEmail) {
  //     const subject = `❌ Push Notification Test Failed`;
  //     const message = `Filed Flow : ${test.title}. Please investigate.`;
  //     await sendEmail(subject, message);
  //   }
    // else {
    //   const subject = `✅ Push Notification Test Passed`;
    //   const message = `Flow : ${test.title} passed successfully.`;
    //   await sendEmail(subject, message);
    // }
  // },
};
