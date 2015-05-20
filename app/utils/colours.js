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

export function getColours(n){
  if (!n) n = 10;
  return colours.slice(0, n)
}
