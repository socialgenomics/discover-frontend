/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

describe('Integration | Component | user preview', function() {
  setupComponentTest('user-preview', {
    integration: true
  });
  describe('user has work role and organisation', function() {
    it('displays work role and organisation', function() {
      this.setProperties({
        'user': {
          displayName: 'Liz',
          profile: {
            work_organisation: 'Repositive',
            work_role: 'Developer'
          }
        }
      });
      this.render(hbs`{{user-preview user=user}}`);
      expect(this.$('h4').text().trim()).to.eql('Liz');
      expect(this.$('img')).to.exist;
      const $infoLine = this.$('p.fs1');
      expect($infoLine.eq(0).text()).to.eql('Developer');
      expect($infoLine.eq(1).text()).to.eql('at');
      expect($infoLine.eq(2).text()).to.eql('Repositive');
    });
  });
  describe('user has work role or organisation', function() {
    it('displays work role if only work role', function() {
      this.setProperties({
        'user': {
          profile: { work_role: 'Developer' }
        }
      });
      this.render(hbs`{{user-preview user=user}}`);
      expect(this.$('p.fs1').text()).to.eql('Developer');
    });

    it('displays work organisation if only work organisation', function() {
      this.setProperties({
        'user': {
          profile: { work_organisation: 'Repositive' }
        }
      });
      this.render(hbs`{{user-preview user=user}}`);
      expect(this.$('p.fs1').text()).to.eql('Repositive');
    });
  });

  it('renders the add affiliation message if empty', function() {
    this.setProperties({
      'user': {
        profile: {
          work_organisation: '',
          work_role: ''
        }
      }
    });

    this.render(hbs`{{user-preview user=user}}`);
    expect(this.$('a.td-underline').text().trim()).to.eql('Add your affiliation');
  });

  it('render the timestamp for comments context, if there is one', function() {
    this.set('timestamp', moment(new Date()).subtract(7, 'days'));

    this.render(hbs`{{user-preview timestamp=timestamp}}`);
    expect(this.$('span.fc-tertiary').text().trim()).to.eql('7 days ago');
  })
});
