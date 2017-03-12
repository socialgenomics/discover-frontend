export const errorMessages = {
  blankField: 'This field can\'t be blank.',
  invalidUrl: 'Must be a valid url.',
  blankEmail: 'Please provide email address',
  invalidEmail: 'Must be a valid email address.'
};

export const patterns = {
  url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  email:  /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/
};
