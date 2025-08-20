import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator';
export const randomNickName = () =>
  uniqueNamesGenerator({ dictionaries: [colors, adjectives, animals], separator: '-', length: 3 });