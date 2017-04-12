export const errorMessages = {
  blankField: 'This field can\'t be blank.',
  invalidUrl: 'Must be a valid url.',
  blankEmail: 'Please provide email address',
  blankPassword: 'Please provide password.',
  duplicateEntry: 'This value already exists.',
  newPassword: 'Please provide new password.',
  matchingPassword: 'Please provide matching password.',
  invalidEmail: 'Must be a valid email address.',
  minLength: 'Must be at least $1 characters.',
  invalidPassword: 'Must include an uppercase letter and a number.'
};

export const patterns = {
  url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  email:  /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
  password: /(?=.*\d)(?=.*[A-Z])/
};

export const lengths = {
  password: 8
};
