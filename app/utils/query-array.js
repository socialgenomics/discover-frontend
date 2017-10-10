import v4 from 'npm:uuid/v4';

const uuid = v4;

/**
 * getCurrentNode - Returns the node which this user is editting
 * @param {node} queryArray - The existing array
 * @param {number} caretPosition - The position of the caret in search input
 * @return {node} The current node
 */
export function getCurrentNode(queryArray, caretPosition) {
  return queryArray
    .filter(n => n.position.from <= caretPosition - 1 && n.position.to >= caretPosition - 1)[0];
}

/**
 * constructAutoCompleteArray - Update the query array with new autocomplete node
 * @param {node?} queryArray - The existing array
 * @param {node} currentNode - The node being edited
 * @return {node} New array to send to suggestion endpoint
 */
export function constructAutoCompleteArray(queryArray, currentNode) {
  // NOTE: Should also pass caret position to this function to target specific token.
  // In the queryArray find the current node
  // Replace it with the same node but with a autocomplete flag the token touching the caret

  debugger;
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
