let colours = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey'
];

export function getColours(n) {
  if (!n) {
    n = 10;
  }

  return colours.slice(0, n);
}


/*
 * A hashing function that takes a string and returns a colour
 *
 * @param{key} - string or object
 * @returns{colour} -
 */
export function getColour(key) {
  if (!key) {
    return colours[Math.random(0, colours.length)];
  }

  if (typeof key !== 'string') {
    key = '' + key;
  }
  var djb2 = function(str) {
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash;
  };
  var hashed = '' + djb2(key);
  var lastTwoDigitsOfHash = Number(hashed.substr(hashed.length - 2, hashed.length));
  var scaleFactor = 100 / colours.length;
  return colours[Math.floor(lastTwoDigitsOfHash / scaleFactor)];
}
