import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator';

// generating nicknames
export const randomNickName = () =>
  uniqueNamesGenerator({ dictionaries: [colors, adjectives, animals], separator: '-', length: 3 });