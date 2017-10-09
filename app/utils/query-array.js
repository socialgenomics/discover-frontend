import QP from 'npm:@repositive/query-parser';
import { v4 as uuid } from 'npm:uuid';

import Ember from 'ember';

const { assign } = Ember;

/**
 * getCurrentNode - Returns the node which this user is editting
 * @param {node} queryArray - The existing array
 * @param {number} caretPosition - The position of the caret in search input
 * @return {node} The current node
 */
export function getCurrentNode(queryArray, caretPosition) {
  const toRet = queryArray
    .filter(n => n.position.from <= caretPosition - 1 && n.position.to >= caretPosition - 1[0]);
  debugger;
  return toRet;
  // return QP.filter(treeWithPositions, n => n.from <= caretPosition - 1 && n.to >= caretPosition - 1)[0];
}

/**
 * constructAutoCompleteArray - Update the query array with new autocomplete node
 * @param {node?} queryArray - The existing array
 * @param {node} currentNode - The node being edited
 * @return {node} New tree to send to suggestion endpoint
 */
export function constructAutoCompleteArray(queryArray, currentNode) {
  const hackToken = QP.token('');
  const autocompleteNode = assign({ 'autocomplete': true }, currentNode, { _id: hackToken._id });

  return QP.replace({
    on: queryArray,
    target: currentNode,
    replacement: autocompleteNode
  });
}

export function toNatural(queryArray) {
  if (queryArray === null) { return ''; }

  return queryArray
    .reduce((accStr, cur) => {
      if (cur.type === 'phrase' || cur.type === 'quoted_phrase') {
        return `${accStr} ${cur.text}`;
      }
      if (cur.type === 'predicate') {
        return `${accStr} ${cur.target}:"${cur.value}"`;
      }
    }, '');
}

export function createPredicate(props) {
  const value = props.value.indexOf(' ') >= 0
    ? createQuotedPhrase(props.value, props.startPos)
    : createToken(props.value, props.startPos);

  return {
    id: uuid(),
    type: 'predicate',
    position: getPredicatePosition(props.startPos, props.target, props.value),
    target: createToken(props.target, props.startPos),
    relation: createRelation('eq', props.startPos),
    value
  }
}

export function isPredicate(node) {
  return node.type === 'predicate';
}

function createRelation(value, startPos) {
  return {
    id: uuid(),
    position: getPosition(startPos, value),
    text: '',
    value
  }
}

function createToken(text, startPos) {
  return {
    id: uuid(),
    type: 'token',
    position: getPosition(startPos, text),
    text
  }
}

function createQuotedPhrase(text, startPos) {
  return {
    id: uuid(),
    type: 'quoted_phrase',
    position: getPosition(startPos, text),
    text: `"${text}"`
  }
}

function getPredicatePosition(from = 0, target, value) {
  const to = from + target.length + 1 + value.length;
  return { from, to };
}

function getPosition(from = 0, value) {
  const to = from + value.length;
  return { from, to };
}
