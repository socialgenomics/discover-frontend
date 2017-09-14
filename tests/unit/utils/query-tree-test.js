import { expect } from 'chai';
import { describe, it } from 'mocha';
import QP from 'npm:@repositive/query-parser';
import { constructAutoCompleteTree, getCurrentNode } from 'repositive/utils/query-tree';

describe('query-tree module', function() {
  const queryTree = QP.fromNatural('lung cancer');

  describe('getCurrentNode', function() {
    it('returns the current node', function() {
      expect(getCurrentNode(queryTree, 1).value).to.eql('lung');
    });

    it('returns undefined when there is no node in that location', function() {
      expect(getCurrentNode(queryTree, 100)).to.eql(undefined);
    });
  });

  describe('constructAutoCompleteTree', function() {
    it('returns a tree with a node containing autocomplete prop', function() {
      const currentNode = queryTree.right;
      const result = constructAutoCompleteTree(queryTree, currentNode);

      expect(result.right.autocomplete).to.be.true;
    });
  });
})

