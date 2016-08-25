export function truncateAndRemoveNewlines(text, charLimit) {
  let textToReturn = text.replace(/(\r\n|\n|\r)/gm, ' ');
  if (textToReturn.length > charLimit) {
    textToReturn = textToReturn.substr(0, charLimit) + '...';
  }
  return textToReturn;
}
