import { expect } from 'chai';
import { describe, it } from 'mocha';
import { beautifyNumber } from 'repositive/helpers/beautify-number';

describe('beautifyNumberHelper', function() {
  it('should add comma between every3 digits starting from the end', function () {
    const dataProvider = [
      [1, '1'],
      [111, '111'],
      [1111, '1,111'],
      [111111, '111,111'],
      [1111111111, '1,111,111,111']
    ];

    dataProvider.forEach(dataset => { expect(beautifyNumber(dataset[0])).to.be.equal(dataset[1])});
  });
});
