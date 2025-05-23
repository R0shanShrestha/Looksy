export const GetToken = (token) => {
  return localStorage.getItem(token);
};
export const RemoveToken = (token) => {
  localStorage.removeItem(token);
};
export const SetToken = (token, tokenValue) => {
  // console.log(tokenValue)
  localStorage.setItem(token, tokenValue);
};
