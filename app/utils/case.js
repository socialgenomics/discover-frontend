export function titleCase(text) {
  return text.replace(/\w\S*/g, function(result) {
    return result.charAt(0).toUpperCase() + result.substr(1).toLowerCase();
  });
}
