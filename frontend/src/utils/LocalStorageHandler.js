export const GetToken = (token) => {
  return localStorage.getItem(token);
};
export const RemoveToken = (token) => {
  localStorage.removeItem(token);
  return true;
};
export const SetToken = (token, tokenValue) => {
  localStorage.setItem(token, tokenValue);
  return true;
};
