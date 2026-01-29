import fetch from "node-fetch";
const { AGENT_EMAIL, AGENT_PASSWORD } = process.env;
const currentDate = new Date();
const UniqueNumber = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}`;
const msg = `Message_${UniqueNumber}`;

describe("push notification", () => {
  it("andriod push notification test", async () => {

    await browser.pause(3000);
     const abc = await $(`android=new UiSelector().textContains("ADD")`);
    expect(await abc.isDisplayed()).toBe(true, "Push notification not found.");

  });
});

