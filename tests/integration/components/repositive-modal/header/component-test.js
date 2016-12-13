/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

function actionSpyHelper(context) {
  const actionSpy = sinon.spy();

  context.on('closeAction', function() {
    actionSpy();
  });

  return actionSpy;
}

describe('Integration: RepositiveModalHeaderComponent', function() {
  setupComponentTest('repositive-modal/header', {
    integration: true
  });

  it('renders header title', function () {
    const title = 'lorem ipsum';

    actionSpyHelper(this);

    this.set('title', title);
    this.render(hbs`{{repositive-modal/header title=title onClose=(action 'closeAction')}}`);
    expect(this.$('h4').text().trim()).to.eql(title);
    expect(this.$('img')).to.have.length(0);
    expect(this.$('.orange-text')).to.have.length(0);
  });

  it('renders header with default background', function () {
    actionSpyHelper(this);

    this.render(hbs`{{repositive-modal/header onClose=(action 'closeAction')}}`);
    expect(this.$('.modal-header').hasClass('alternate-background')).to.eql(false);
  });

  it('renders header with alternative background', function () {
    actionSpyHelper(this);

    this.render(hbs`{{repositive-modal/header alternateBackground=true onClose=(action 'closeAction')}}`);
    expect(this.$('.modal-header').hasClass('alternate-background')).to.eql(true);
  });

  it('renders header with icon', function() {
    const icon = 'star';

    actionSpyHelper(this);

    this.set('icon', icon);
    this.render(hbs`{{repositive-modal/header icon=icon onClose=(action 'closeAction')}}`);

    expect(this.$(`.fa-${icon}`)).to.have.length(1);
    expect(this.$('img')).to.have.length(0);
  });

  it('renders header with image', function() {
    const image = 'http://my-site.com/image.png';

    actionSpyHelper(this);

    this.set('image', image);
    this.render(hbs`{{repositive-modal/header image=image onClose=(action 'closeAction')}}`);

    expect(this.$('.orange-text')).to.have.length(0);
    expect(this.$('img')).to.have.length(1);
    expect(this.$('img')[0].src).to.eql(image);
  });

  it('triggers close action on close button click', function() {
    const actionSpy = actionSpyHelper(this);

    this.render(hbs`{{repositive-modal/header onClose=(action 'closeAction')}}`);
    this.$('.close-button').click();

    expect(actionSpy.called).to.eql(true);
  });
});
