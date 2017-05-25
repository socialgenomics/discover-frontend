export const errorMessages = {
  blankField: 'This field can\'t be blank.',
  emptyField: 'This field cannot contain blank space.',
  invalidUrl: 'Must be a valid url.',
  blankEmail: 'Please provide email address',
  blankPassword: 'Please provide password.',
  duplicateEntry: 'This value already exists.',
  newPassword: 'Please provide new password.',
  matchingPassword: 'Please provide matching password.',
  invalidEmail: 'Must be a valid email address.',
  minLength: 'Must be at least $1 characters.',
  maxLength: 'Must be less than $1 characters.',
  invalidPassword: 'Must include an uppercase letter and a number.',
  invalidGoogleLink: 'Must be a valid Google Plus URL',
  invalidLinkedinLink: 'Must be a valid Linkedin URL',
  invalidTwitterHandle: 'Must be a valid twitter handle',
  invalidResearchGateLink: 'Must be a valid Research Gate URL',
  invalidOrcidLink: 'Must be a valid Orcid URL'
};

export const patterns = {
  url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  email: /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
  password: /(?=.*\d)(?=.*[A-Z])/,
  google: /^https:\/\/plus\.google\.com\/u?\/?0?\/?[0-9]{21}$/,
  linkedin: /^https:\/\/linkedin\.com\/in\/[a-zA-Z-]{2,}\/?$/,
  twitter: /^@(\w){1,15}$/,
  researchgate: /^https:\/\/(?:www.)?researchgate\.net\/profile\/[a-zA-Z_]{2,}$/,
  orcid: /^https:\/\/(?:www.)?orcid\.org\/[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/
};

export const lengths = {
  password: 8,
  textFieldShort: 50,
  description: 250,
  textFieldLong: 150
};

export const lengthTypes = { min: 'min', max: 'max' };
