import QP from 'npm:@repositive/query-parser';
import Ember from 'ember';

const { assign } = Ember;

/**
 * getCurrentNode - Returns the node which this user is editting
 * @param {node} queryTree - The existing tree
 * @param {number} caretPosition - The position of the caret in search input
 * @return {node} The current node
 */
export function getCurrentNode(queryTree, caretPosition) {
  const treeWithPositions = QP.decorateTreeWithNaturalPositions(queryTree);
  return QP.filter(treeWithPositions, n => n.from <= caretPosition - 1 && n.to >= caretPosition - 1)[0];
}

/**
 * constructAutoCompleteTree - Update the query tree with new autocomplete node
 * @param {node?} queryTree - The existing tree, with no autocomplete attrs
 * @param {node} currentNode - The node being edited
 * @return {node} New tree to send to suggestion endpoint
 */
export function constructAutoCompleteTree(queryTree, currentNode) {
  const hackToken = QP.token('');
  const autocompleteNode = assign({ 'autocomplete': true }, currentNode, { _id: hackToken._id });

  return QP.replace({
    on: queryTree,
    target: currentNode,
    replacement: autocompleteNode
  });
}
