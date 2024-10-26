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
  if (isBoolean(isFavourite)) return isFavourite;
};

const parseUserId = id => {
  const isString = typeof id === 'string';
  if (!isString) return;

  return id;
};

export const parseFilterParams = query => {
  const { type, isFavourite, userId } = query;

  const parsedUserId = parseUserId(userId);
  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseFavorite(isFavourite);

  return {
    userId: parsedUserId,
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
