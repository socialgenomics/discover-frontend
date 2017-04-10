/**
 * Safely open a link in a new tab
 * @public
 * @param {String} url url you want to open
 */
export function openLinkInNewTab(url) {
  const newWindow = window.open(url, '_blank');
  newWindow.opener = null;
  newWindow.focus();
}
