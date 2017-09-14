import { expect } from 'chai';
import { describe, it } from 'mocha';
import { nameForKeyCode } from 'repositive/utils/key-codes';

describe('nameForKeyCode', function() {
  it('return a key string for a given number', function() {
    expect(nameForKeyCode(8)).to.eql('Backspace');
    expect(nameForKeyCode(13)).to.eql('Enter');
    expect(nameForKeyCode(46)).to.eql('Delete');
  });

  it('returns undefined for an unknown code', function() {
    expect(nameForKeyCode(100)).to.eql(undefined);
  });
});
