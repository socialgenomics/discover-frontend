import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | activity card', function() {
  setupComponentTest('activity-card', {
    integration: true
  });

  const datasets = [
    {id: 1, title: 'abc'},
    {id: 2, title: 'def'},
    {id: 3, title: 'ghi'},
    {id: 4, title: 'jkl'}
  ]
  // describe('when more than 3 items', function() {
  //
  // });
  //
  // describe('when between 1 and 3 items', function() {
  //
  // });

  describe('when no items', function() {
    it('should display a message', function() {
      this.set('model', []);
      this.render(hbs`{{activity-card model=model group='favourite'}}`);
      expect(this.$('p').text().trim()).to.eql(`This user doesn't have any favourite datasets yet.`);
    })
  })

  describe('when collapsed', function() {
    beforeEach(function() {
      this.setProperties({
        'isCollapsed': true,
        'model': datasets
      });

      this.render(hbs`{{activity-card model=model}}`);
    });

    it('should display at most 3 items', function() {
      expect(this.$('.t-activity-card-item').length).to.eql(3);
    })
  });
});
