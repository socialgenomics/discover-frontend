// /* jshint expr:true */
// import { expect } from 'chai';
// import {
//   describeModule,
//   it
// } from 'ember-mocha';
// import sinon from 'sinon';
//
// let sandbox, config;
//
// describeModule('metrics-adapter:calq', 'calq adapter', {
//   beforeEach() {
//     sandbox = sinon.sandbox.create();
//     config = {
//       id: 'ca78eed5d34a041ab5cf164295cf2c25'
//     };
//   },
//   afterEach() {
//     sandbox.restore();
//   }
// });
//
// it('#identify calls `calq.identify` with the right arguments', function() {
//   const adapter = this.subject({ config });
//   const stub1 = sandbox.stub(window.calq.user, 'identify', () => {
//     return true;
//   });
//   sandbox.stub(window.calq.user, 'profile', () => {
//     return true;
//   });
//   adapter.identify({
//     email: 'la@la.com',
//     inviteCode: 'aaaa',
//     firstname: 'bbbb',
//     lastname: 'cccc',
//     username: 1
//   });
//   expect(stub1.calledWith(1), 'it sends the correct arguments').to.be.ok;
// });
