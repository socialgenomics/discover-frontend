import openCenteredPopupWindow from 'frontend/utils/open-centered-popup-window';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Utility | open centered popup window');

// Replace this with your real tests.
test('it open new window with correct params', function(assert) {
  const originalWinOpen = window.open;
  const originalWinScreen = window.screen;
  const url = 'test';
  const title = 'lorem ipsum';
  const size = 100;
  const params = {
    width: size,
    height: size,
    toolbar: 'no',
    location: 'no',
    directories: 'no',
    menubar: 'no',
    copyhistory: 'no',
    top: size / 2,
    left: size / 2,
  };

  window.open = sinon.spy();
  window.screen = {
    width: size * 2,
    height: size * 2,
  };

  openCenteredPopupWindow(url, title, size, size);

  assert.ok(
    window.open.calledWith(
      url,
      title,
      Object.keys(params).map(name => `${name}=${params[name]}`).join(', ')
    ),
    true
  );

  window.open = originalWinOpen;
  window.screen = originalWinScreen;
});
