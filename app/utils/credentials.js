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
  const sorted = credentials.sortBy('updatedAt');
  return get(sorted, 'lastObject');
}

export function fetchCredentials(store, userId) {
  return store.query('credential', {
    'where.user_id': userId,
    'order[0][0]': 'updated_at',
    'order[0][1]': 'DESC',
    'limit': '50'
  });
}
