/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import openCenteredPopupWindow from 'repositive/utils/open-centered-popup-window';

describe('Open Centered Popup Window', function() {
  it('it open new window with correct params', function () {
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
      left: size / 2
    };

    window.open = sinon.spy();
    window.screen = {
      width: size * 2,
      height: size * 2
    };

    openCenteredPopupWindow(url, title, size, size);

    expect(
      window.open.calledWith(
        url,
        title,
        Object.keys(params).map(name => `${name}=${params[name]}`).join(', ')
      ),
      true
    ).to.eql(true);

    window.open = originalWinOpen;
    window.screen = originalWinScreen;
  });
});
