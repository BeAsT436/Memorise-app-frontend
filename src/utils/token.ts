const TOKEN = "token";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN);
};

export const setToken = (token: string): void => {
  return localStorage.setItem(TOKEN, token);
};

export const removeToken = (): void => {
  return localStorage.removeItem(TOKEN);
};
