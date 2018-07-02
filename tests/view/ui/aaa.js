const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slomo: 80});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/rooms/797');

  const path = await page.evaluate(() => {
    return window.location;
  });

  await page.waitForSelector("input[name=username]");
  await page.click("input[name=username]")
  await page.type("input[name=username]", 'admin@refocus.admin');

  await page.click("input[name=password]")
  await page.type("input[name=password]", 'password');

  await page.click('button[type=submit]');

  console.log(path);
  //await browser.close();
})();



