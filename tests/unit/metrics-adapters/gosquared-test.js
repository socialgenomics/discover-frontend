// import { moduleFor, test } from 'ember-qunit';
// import sinon from 'sinon';
//
// let sandbox, config;
//
// moduleFor('metrics-adapter:gosquared', 'gosquared adapter', {
//   beforeEach() {
//     sandbox = sinon.sandbox.create();
//     config = {
//       token: 'GSN-041822-M'
//     };
//   },
//   afterEach() {
//     sandbox.restore();
//   }
// });

// test('#identify calls gs with the right arguments', function(assert) {
//   const adapter = this.subject({ config });
//   //const stub = sandbox.stub(window._gs);
//   const  = sinon.createStubInstance(window._gs)
//   adapter.identify({
//     username: 123,
//     fullname: 'Test Person'
//   });
//   assert.ok(stub.calledWith(123), 'it sends the correct arguments');
// });

// test('#trackEvent returns the correct response shape', function(assert) {
//   const adapter = this.subject({ config });
//   sandbox.stub(window._gs);
//   const result = adapter.trackEvent({
//     category: 'button',
//     action: 'click',
//     label: 'nav buttons',
//     value: 4
//   });
//   const expectedResult = {
//     category: 'button',
//     action: 'click',
//     label: 'nav buttons',
//     value: 4
//   };
//   assert.deepEqual(result, expectedResult, 'it sends the correct response shape');
// });
