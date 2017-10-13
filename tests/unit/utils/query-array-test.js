import { expect } from 'chai';
import { describe, it } from 'mocha';
import QP from 'npm:@repositive/query-parser';
import {
  applyAutoCompletion,
  constructAutoCompleteArray,
  getCurrentNode,
  toNatural
} from 'repositive/utils/query-array';

describe('query-array module', function() {
  const queryArray = QP.fromPhrase('lung cancer');
  const queryArray2 = QP.fromPhrase('lung disease:cancer');

  describe('getCurrentNode', function() {
    it('returns the current node', function() {
      expect(getCurrentNode(queryArray, 1).text).to.eql('lung');
      expect(getCurrentNode(queryArray, 7).text).to.eql('cancer');
      expect(getCurrentNode(queryArray2, 7).text).to.eql('disease:cancer');
    });

    it('returns undefined when there is no node in that location', function() {
      expect(getCurrentNode(queryArray, 100)).to.eql(undefined);
    });
  });

  describe('constructAutoCompleteTree', function() {
    describe('when passed a single phrase', function() {
      it('returns an array with a node containing a token with autocomplete:true', function() {
        const caretPos = 1;
        const result = constructAutoCompleteArray(queryArray, caretPos);

        expect(result[0].tokens[0].autocomplete).to.be.true;
      });
    });

    describe('when passed a quoted phrase', function() {
      const quotedQuery = QP.fromPhrase('"lung cancer"');

      it('should return the same array', function() {
        const caretPos = 1;
        const result = constructAutoCompleteArray(quotedQuery, caretPos);

        expect(result).to.eql(quotedQuery);
      });
    });

    describe('when passed a predicate', function() {
      const predicateQuery = QP.fromPhrase('disease:lung');

      it('should return the same array', function() {
        const caretPos = 1;
        const result = constructAutoCompleteArray(predicateQuery, caretPos);

        expect(result).to.eql(predicateQuery);
      });
    });
  });

  describe('applyAutoCompletion', function() {
    const query = QP.fromPhrase('a:b programming in c');

    it('replaces whole phrases', function() {
      const actual = applyAutoCompletion(query, 'developing in cobol', {from: 4, to: 19});
      const expected = QP.fromPhrase('a:b developing in cobol');

      const actualText = toNatural(actual);
      const expectedText = toNatural(expected);
      expect(actualText).to.eql(expectedText);
    });

    it('replaces partial phrases', function() {
      const actual = applyAutoCompletion(query, 'in croatia', {from: 16, to: 19});
      const expected = QP.fromPhrase('a:b programming in croatia');

      const actualText = toNatural(actual);
      const expectedText = toNatural(expected);
      expect(actualText).to.eql(expectedText);
    });

    it('replaces inside phrases', function() {
      const actual = applyAutoCompletion(query, 'without', {from: 16, to: 17});
      const expected = QP.fromPhrase('a:b programming without c');

      const actualText = toNatural(actual);
      const expectedText = toNatural(expected);
      expect(actualText).to.eql(expectedText);
    });
  });
});
