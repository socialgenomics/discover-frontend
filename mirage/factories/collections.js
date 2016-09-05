import Mirage, {faker}  from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: faker.hacker.phrase,
  description: faker.lorem.sentence
});
