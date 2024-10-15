const parseContactType = type => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = type => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

const parseFavorite = isFavorite => {
  const isBoolean = typeof isFavorite === 'boolean';
  if (!isBoolean) return;
  return isFavorite;
};

export const parseFilterParams = query => {
  const { type, isFavorite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavorite = parseFavorite(isFavorite);

  return {
    type: parsedContactType,
    isFavorite: parsedIsFavorite,
  };
};
