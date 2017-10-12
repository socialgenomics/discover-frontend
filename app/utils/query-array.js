import v4 from 'npm:uuid/v4';
import qp from 'npm:@repositive/query-parser';

const uuid = v4;

/**
 * getCurrentNode - Returns the node which this user is editting
 * @param {node} queryArray - The existing array
 * @param {number} caretPosition - The position of the caret in search input
 * @return {node} The current node
 */
export function getCurrentNode(queryArray, caretPosition) {
  let lastValue = findByPosition(queryArray, caretPosition);

  while (lastValue && lastValue.tokens) {
    lastValue = findByPosition(lastValue.tokens, caretPosition);
  }

  return lastValue;
}

function findByPosition(array, caretPosition) {
  const caretIndex = caretPosition - 1;

  return array.find(n => n.position.from <= caretIndex && caretIndex <= n.position.to);
}

/**
 * constructAutoCompleteArray - Adds autocomplete prop to current token.
 * @param {Array} queryArray - The existing array
 * @param {number} caretPosition - The position of the caret in the search bar
 * @return {Array} New array to send to suggestion endpoint
 */
export function constructAutoCompleteArray(queryArray, caretPosition) {
  const currentObject = findByPosition(queryArray, caretPosition);

  if (currentObject.type == 'phrase') {
    return replace(
      queryArray,
      annotatePhraseAutocompletion(currentObject, caretPosition)
    );
  }

  return queryArray;
}

function annotatePhraseAutocompletion(phrase, caretPosition) {
  const caretIndex = caretPosition - 1;

  const newTokens = phrase.tokens.map(item => {
    if (item.position.from <= caretIndex && caretIndex <= item.position.to) {
      return Object.assign({}, item, { autocomplete: true });
    } else {
      return item;
    }
  });

  return Object.assign({}, phrase, { tokens: newTokens });
}

/*
  TODO:
  To make this more general, this could be refactored to take a 3rd argument: target.
  If this argument is supplied the function will find the target object within
  the array and replace it, rather than matching by id.
*/
/**
 * replace - replaces the object by matching id
 * @param {Array} array
 * @param {*} replacement
 * @return {Array}
 */
export function replace(array, replacement) {
  return array.reduce((acc, cur) => {
    if (cur.id === replacement.id) {
      return [...acc, replacement];
    }

    return [...acc, cur];
  }, []);
}

export function toNatural(queryArray) {
  return (queryArray || []).map(e => e.text).join(' ');
}

export function createPredicate(props) {
  const value = props.value.indexOf(' ') >= 0
    ? createQuotedPhrase(props.value, props.startPos)
    : createToken(props.value, props.startPos);

  return {
    id: uuid(),
    type: 'predicate',
    position: createPredicatePosition(props.startPos, props.target, props.value),
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
    position: createPosition(startPos, value),
    text: '',
    value
  }
}

function createToken(text, startPos) {
  return {
    id: uuid(),
    type: 'token',
    position: createPosition(startPos, text),
    text
  }
}

function createQuotedPhrase(text, startPos) {
  return {
    id: uuid(),
    type: 'quoted_phrase',
    position: createPosition(startPos, text),
    text: `"${text}"`
  }
}

function createPredicatePosition(from = 0, target, value) {
  const to = from + target.length + 1 + value.length;
  return { from, to };
}

function createPosition(from = 0, value) {
  const to = from + value.length;
  return { from, to };
}

export function applyAutoCompletion(array, suggestedText, position) {
  const originalText = toNatural(array);
  const beforeText = originalText.substring(0, position.from);
  const afterText = originalText.substring(position.to + 1);
  return qp.fromPhrase(`${beforeText}${suggestedText}${afterText}`)
}
