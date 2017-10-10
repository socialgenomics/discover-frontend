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
    it('returns a tree with a node containing autocomplete prop', function() {
      const currentNode = queryArray.right;
      const result = constructAutoCompleteArray(queryArray, currentNode);

      expect(result.right.autocomplete).to.be.true;
    });
  });
})

