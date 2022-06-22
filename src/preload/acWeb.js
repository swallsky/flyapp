/**
 * 自动登录GitHub
 * @param {*} page
 * @param {*} data
 */
async function github(page, data) {
  await page.goto(data.url);
  await page.locator("#login_field").fill(data.username);
  await page.locator("#password").fill(data.password);
  await page.waitForTimeout(500);
  await page.locator('input[type="submit"]').click();
}
/**
 * 自动登录阿里云
 * @param {*} page
 * @param {*} data
 */
async function aliyun(page, data) {
  await page.goto(data.url);
  await page.locator("div.tabs-item >> nth=0").click();
  const frame = await page.frameLocator(
    "#alibaba-login-iframe #alibaba-login-box"
  );
  await frame.locator("#fm-login-id").fill(data.username);
  await frame.locator("#fm-login-password").fill(data.password);
  await page.waitForTimeout(500);
  await frame.locator("div.fm-btn > button").click();
}

/**
 * 自动登录友盟
 * @param {*} page
 * @param {*} data
 */
async function umeng(page, data) {
  await page.goto(data.url);
  const frame = await page.frameLocator("#alibaba-login-box");
  await frame.locator("#fm-login-id").fill(data.username);
  await frame.locator("#fm-login-password").fill(data.password);
  await page.waitForTimeout(500);
  await frame.locator("#fm-login-submit").click();
}

/**
 * 自动登录腾讯云
 * @param {*} page
 * @param {*} data
 */
async function tencent(page, data) {
  await page.goto(data.url);
  await page.locator("div.clg-other-link > a >> nth=0").click();
  await page.fill("input.J-username", data.username);
  await page.fill("input.J-password", data.password);
  await page.waitForTimeout(500);
  await page.locator("a.J-loginBtn").click();
}

/**
 * 自建gitlab
 * @param {*} page
 * @param {*} data
 */
async function mygitlab(page, data) {
  await page.goto(data.url);
  await page.fill("#user_login", data.username);
  await page.fill("#user_password", data.password);
  await page.waitForTimeout(500);
  await page.locator('input[name="commit"]').click();
}

/**
 * 其他情况，尝试自动填充
 * @param {*} page
 * @param {*} data
 */
async function other(page, data) {
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
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  switch (data.wtype) {
    case "github":
      await github(page, data);
      break;
    case "aliyun":
      await aliyun(page, data);
      break;
    case "umeng":
      await umeng(page, data);
      break;
    case "tencent":
      await tencent(page, data);
      break;
    case "mygitlab":
      await mygitlab(page, data);
      break;
    default:
      await other(page, data);
  }
};
