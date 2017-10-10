import { expect } from 'chai';
import { describe, it } from 'mocha';
import QP from 'npm:@repositive/query-parser';
import { constructAutoCompleteArray, getCurrentNode } from 'repositive/utils/query-array';

describe('query-array module', function() {
  const queryArray = QP.fromPhrase('lung cancer');

  describe('getCurrentNode', function() {
    it('returns the current node', function() {
      expect(getCurrentNode(queryArray, 1).value).to.eql('lung');
    });

    it('returns undefined when there is no node in that location', function() {
      expect(getCurrentNode(queryArray, 100)).to.eql(undefined);
    });
  });

  describe('!T constructAutoCompleteTree', function() {
    describe('when passed a single phrase', function() {
      it('returns an array with a node containing a token with autocomplete:true', function() {
        const currentNode = queryArray[0];
        const caretPos = 1;
        const result = constructAutoCompleteArray(queryArray, currentNode, caretPos);

        expect(result[0].tokens[0].autocomplete).to.be.true;
      });
    });

    describe('when passed a quoted phrase', function() {
      const quotedQuery = QP.fromPhrase('"lung cancer"');

      it('should return the same array', function() {
        const currentNode = quotedQuery[0];
        const caretPos = 1;
        const result = constructAutoCompleteArray(quotedQuery, currentNode, caretPos);

        expect(result).to.eql(quotedQuery);
      });
    });

    describe('when passed a predicate', function() {
      const predicateQuery = QP.fromPhrase('disease:lung');

      it('should return the same array', function() {
        const currentNode = predicateQuery[0];
        const caretPos = 1;
        const result = constructAutoCompleteArray(predicateQuery, currentNode, caretPos);

        expect(result).to.eql(predicateQuery);
      });
    });
  });
});
