export function truncateAndRemoveNewlines(text, charLimit) {
  text = text.replace(/(\r\n|\n|\r)/gm, ' ');
  if (text.length > charLimit) {
    text = text.substr(0, charLimit) + '...';
  }
  return text;
}
