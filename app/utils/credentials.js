import Ember from 'ember';

const { get } = Ember;

export function mainCredential(credentials) {
  return credentials.filter((c) => get(c, 'primary'))[0];
}

export function isVerified(credentials) {
  return credentials.reduce((acc, curr) => acc || get(curr, 'verified'), false);
}

export function secondaryCredentials(credentials) {
  return credentials.rejectBy('primary',  true);
}

export function getLatestSecondaryCredential(credentials) {
  return get(secondaryCredentials(credentials)
    .sortBy('updatedAt'), 'firstObject');
}
