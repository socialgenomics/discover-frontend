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

  it('should return the number in correct order', function () {
    const dataProvider = [
      [1, '1'],
      [123, '123'],
      [1234, '1,234'],
      [123456, '123,456'],
      [1234567, '1,234,567']
    ];

    dataProvider.forEach(dataset => { expect(beautifyNumber(dataset[0])).to.be.equal(dataset[1])});
  });

  it('handles decimal numbers', function () {
    const dataProvider = [
      [1234.5, '1,234.5'],
      [123456.7891, '123,456.789']
    ];

    dataProvider.forEach(dataset => { expect(beautifyNumber(dataset[0])).to.be.equal(dataset[1])});
  });
});
