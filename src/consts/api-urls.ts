export const baseURL = `http://localhost:3001/api/`;
export const userURL = {
  UPDATE: (id: string) => `users/${id}`,
  GET_PROFILE: (id: string) => `users/${id}`,
  GET_ALL_USERS: "users"
};
