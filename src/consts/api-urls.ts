export const baseURL = `http://localhost:3001/api/`;
export const userURL = {
  UPDATE: (id: string) => `users/${id}`,
  GET_PROFILE: (id: string) => `users/${id}`,
  GET_ALL_USERS: "users",
  SUBSCRIBE: (id:string) => `users/subscribe/${id}`,
  UNSUBSCRIBE:(id:string) => `users/unsubscribe/${id}`
};
export const memoryURL = {
  ME: "memory/me",
  ADD: "memory",
  DELETE: (id:string)=>`memory/${id}`,
  PUT: (id:string)=>`memory/${id}`
}
