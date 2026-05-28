export function parseJWT(token: string | null) {
  if (!token) return null;
  try {
    const data = JSON.parse(atob(token.split(".")[1]));
    if (data.exp * 1000 < Date.now()) return null;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
