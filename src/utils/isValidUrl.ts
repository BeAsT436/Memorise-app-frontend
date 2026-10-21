export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_error) {
    return false;
  }
};