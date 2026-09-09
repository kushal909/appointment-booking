// Save authentication information

export const saveAuth = (token, user) => {
    console.log("token",token)
    console.log("user",user)

  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

};


// Get token

export const getToken = () => {

  return localStorage.getItem(
    "token"
  );

};


// Get user

export const getUser = () => {

  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);

};


// Remove authentication information

export const clearAuth = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

};