const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const DEVICE_NAMES = ['iPhone 5', 'iPhone 6', 'Pixel 2'];

(async () => {
    const browser = await puppeteer.launch({headless: false});

    const screenshotRequests = [takeScreenshot(browser, null)];
    DEVICE_NAMES.forEach(device => {
        const promise = takeScreenshot(browser, device);
        screenshotRequests.push(promise);
    });
    await Promise.all(screenshotRequests);

    await browser.close();
})();

const takeScreenshot = async (browser, device) => {
    const page = await browser.newPage();
    if (device != null) await page.emulate(devices[device]);
    await page.goto('http://ninja-labs.co.uk');
    await page.screenshot({path: `images/${device == null ? 'Tablet' : device}.png`});
};