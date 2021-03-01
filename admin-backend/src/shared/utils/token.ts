export const getExpires = (remember: boolean) => {
  return remember ? 3600 * 24 * 30 : 3600;
};
