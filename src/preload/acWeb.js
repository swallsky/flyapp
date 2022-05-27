/**
 * 自动登录GitHub
 * @param {*} browser
 * @param {*} data
 */
async function github(browser, data) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(data.url);
  await page.locator('#login_field').fill(data.username);
  await page.locator('#password').fill(data.password);
  await page.waitForTimeout(500);
  await page.locator('input[type="submit"]').click();
}
/**
 * 自动登录阿里云
 * @param {*} browser
 * @param {*} data
 */
async function aliyun(browser, data) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(data.url);
  await page.locator('div.tabs-item >> nth=0').click();
  const frame = await page.frameLocator('#alibaba-login-iframe #alibaba-login-box');
  await frame.locator('#fm-login-id').fill(data.username);
  await frame.locator('#fm-login-password').fill(data.password);
  await page.waitForTimeout(500);
  await frame.locator('div.fm-btn > button').click();
}

/**
 * 自动登录友盟
 * @param {*} browser
 * @param {*} data
 */
 async function umeng(browser, data) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(data.url);
  const frame = await page.frameLocator('#alibaba-login-box');
  await frame.locator('#fm-login-id').fill(data.username);
  await frame.locator('#fm-login-password').fill(data.password);
  await page.waitForTimeout(500);
  await frame.locator('#fm-login-submit').click();
}

/**
 * 自动登录腾讯云
 * @param {*} browser
 * @param {*} data
 */
async function tencent(browser, data) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(data.url);
  await page.locator('div.clg-other-link > a >> nth=0').click();
  await page.fill('input.J-username',data.username);
  await page.fill('input.J-password',data.password);
  await page.waitForTimeout(500);
  await page.locator('a.J-loginBtn').click();
}

/**
 * 自建gitlab
 * @param {*} browser
 * @param {*} data
 */
async function mygitlab(browser, data) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(data.url);
  await page.fill('#user_login',data.username);
  await page.fill('#user_password',data.password);
  await page.waitForTimeout(500);
  await page.locator('input[name="commit"]').click();
}

/**
 * 其他情况，尝试自动填充
 * @param {*} browser
 * @param {*} data
 */
async function other(browser, data) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(data.url);
  await page.fill(
    'input[name="username"],#username,#account,#qquin',
    data.username
  );
  await page.fill(
    'input[name="password"],input[name="passwd"],#password,input#pptext',
    data.password
  );
  await page.waitForTimeout(500); //暂停0.5秒
  await page
    .locator(
      'input[name="submit"],input[type="submit"],button[type="submit"],#submit,#LAY-user-login-submit,button.ant-btn'
    )
    .click();
}

module.exports = async (browser, data) => {
  switch (data.wtype) {
    case "github":
      await github(browser, data);
      break;
    case "aliyun":
      await aliyun(browser, data);
      break;
    case "umeng":
      await umeng(browser, data);
      break;
    case "tencent":
      await tencent(browser, data);
      break;
    case "mygitlab":
      await mygitlab(browser, data);
      break;
    default:
      await other(browser, data);
  }
};
