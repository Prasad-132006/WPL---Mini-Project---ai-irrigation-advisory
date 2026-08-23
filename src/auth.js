const REGISTERED_USER_KEY = "agroai-registered-user";
const LOGGED_IN_USER_KEY = "agroai-logged-in-user";

export const registerUser = (user) => {
  localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(user));
};

export const getRegisteredUser = () => {
  const user = localStorage.getItem(REGISTERED_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const loginUser = (email, password) => {
  const registeredUser = getRegisteredUser();

  if (
    !registeredUser ||
    registeredUser.email.toLowerCase() !== email.toLowerCase() ||
    registeredUser.password !== password
  ) {
    return false;
  }

  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(registeredUser));
  return true;
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};