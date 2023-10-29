// auth.js

import axios from "axios";

// Function to set the JWT token in the request headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Example: When a user logs in successfully, call setAuthToken to store the token
// in the request headers
const loginSuccess = (token) => {
  localStorage.setItem("token", token);
  setAuthToken(token);
};

// Example: When a user logs out, call setAuthToken with null to remove the token
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("notifications");
  setAuthToken(null);
};

export { loginSuccess, logout };
