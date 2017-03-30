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

  it('renders the correct user data', function() {
    this.setProperties({
      'user': {
        displayName: 'Liz',
        userProfile: {
          workOrganisation: 'Developer'
        }
      }
    });

    this.render(hbs`{{user-preview user=user}}`);
    expect(this.$('h4').text().trim()).to.eql('Liz');
    expect(this.$('img')).to.exist;
    expect(this.$('p.u-fs1').text().trim()).to.eql('Developer');
  });

  it('renders the add affiliation message if empty', function() {
    this.setProperties({
      'user': {
        userProfile: {
          workOrganisation: ''
        }
      }
    });

    this.render(hbs`{{user-preview user=user}}`);
    expect(this.$('a.u-td-underline').text().trim()).to.eql('Add your affiliation');
  });

  it('render the timestamp for comments context, if there is one', function() {
    this.set('timestamp', moment(new Date()).subtract(7, 'days'));

    this.render(hbs`{{user-preview timestamp=timestamp}}`);
    expect(this.$('span.u-tc-tertiary').text().trim()).to.eql('7 days ago');
  })
});
