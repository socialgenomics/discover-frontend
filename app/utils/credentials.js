const { get } = Ember;

export function mainCredential(credentials) {
  return credentials.filter((c) => get(c, 'primary'))[0];
}

export function isVerified(credentials) {
  return credentials.reduce((acc, curr) => acc || get(curr, 'verified'), false);
}

export function allCredentials(credentials) {
  return credentials;
}
