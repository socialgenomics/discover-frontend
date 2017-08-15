/* eslint-env node */

const browser = process.env.BROWSER || 'chrome';
module.exports = {
  "framework": "mocha",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    browser
  ],
  "launch_in_dev": [
    browser
  ],
  "browser_args": {
      [browser]: [
      "--headless",
      "--disable-gpu",
      "--remote-debugging-port=9222",
      "--window-size=2440,900"
    ]
  }
};
