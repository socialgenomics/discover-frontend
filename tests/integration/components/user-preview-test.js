/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

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
    this.set('timestamp', 'Fri Mar 24 2017 12:19:42 GMT+0000 (GMT)');
    
    this.render(hbs`{{user-preview timestamp=timestamp}}`);
    expect(this.$('span.u-tc-tertiary').text().trim()).to.eql('3 days ago');
  })
});
