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
  ];

  describe('when more than 3 items', function() {
    describe('when collapsed', function() {
      beforeEach(function() {
        this.set('model', datasets);
        this.render(hbs`{{activity-card model=model isCollapsed=true}}`);
      });

      it('should display at most 3 items', function() {
        expect(this.$('.t-activity-card-item').length).to.eql(3);
      });
      it('should show view all button', function() {
        expect(this.$('.t-view-all').text().trim()).to.eql('View all');
      });
    });

    describe('when expanded', function() {
      beforeEach(function() {
        this.set('model', datasets);
        this.render(hbs`{{activity-card model=model isCollapsed=false}}`);
      });

      it('should display all items', function() {
        expect(this.$('.t-activity-card-item').length).to.eql(4);
      });
      it('displays show less button', function() {
        expect(this.$('.t-view-all').text().trim()).to.eql('Show less');
      });
    })
  });

  describe('when between 1 and 3 items', function() {
    beforeEach(function() {
      this.set('model', [datasets[0], datasets[1]]);
      this.render(hbs`{{activity-card model=model}}`);
    });

    it('should display all items', function() {
      expect(this.$('.t-activity-card-item').length).to.eql(2);
    });
    it('should not display a view all button', function() {
      expect(this.$('.t-view-all').length).to.eql(0);
    });
  });

  describe('when no items', function() {
    it('should display a message', function() {
      this.set('model', []);
      this.render(hbs`{{activity-card model=model group='favourite'}}`);
      expect(this.$('p').text().trim()).to.eql(`This user doesn't have any favourite datasets yet.`);
    });
  });
});
