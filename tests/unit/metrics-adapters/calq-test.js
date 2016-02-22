import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

let sandbox, config;

moduleFor('metrics-adapter:calq', 'calq adapter', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
    config = {
      id: 'GSN-092810-X'
    };
  },
  afterEach() {
    sandbox.restore();
  }
});

// Replace this with your real tests.
test('#identify calls `calq.identify` with the right arguments', function(assert) {
  const adapter = this.subject({ config });
  const stub1 = sandbox.stub(window.calq.user, 'identify', () => {
    return true;
  });
  const stub2 = sandbox.stub(window.calq.user, 'profile', () => {
    return true;
  });
  adapter.identify({
    email: 'la@la.com',
    inviteCode: 'aaaa',
    firstname: 'bbbb',
    lastname: 'cccc',
    username: 1
  });
  assert.ok(stub1.calledWith(1), 'it sends the correct arguments');
});
