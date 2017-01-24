let colours = [
  'u-bc-red',
  'u-bc-pink',
  'u-bc-purple',
  'u-bc-deep-purple',
  'u-bc-indigo',
  'u-bc-blue',
  'u-bc-light-blue',
  'u-bc-cyan',
  'u-bc-teal',
  'u-bc-green',
  'u-bc-light-green',
  'u-bc-lime',
  'u-bc-yellow',
  'u-bc-amber',
  'u-bc-orange',
  'u-bc-deep-orange',
  'u-bc-brown',
  'u-bc-grey'
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
