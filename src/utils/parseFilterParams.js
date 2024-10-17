const parseContactType = type => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = type => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

const parseFavorite = isFavourite => {
  const trimmedValue = isFavourite?.replace(/\s+/g, '').toLowerCase();
  if (trimmedValue === 'true') isFavourite = true;
  if (trimmedValue === 'false') isFavourite = false;

  const isString = typeof isFavourite === 'string';
  if (isString) return;

  const isBoolean = isFavourite => [true, false].includes(isFavourite);
  console.log(isBoolean);
  if (isBoolean(isFavourite)) return isFavourite;
};
export const parseFilterParams = query => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseFavorite(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
