import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  email: 'test1@repositive.io',
  firstname: 'Test',
  lastname: 'Name',
  password: '12345678'
});
