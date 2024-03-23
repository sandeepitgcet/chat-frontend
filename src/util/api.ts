const serverBaseURL: string =
  import.meta.env.SERVER_BASE_URL || "http://localhost:3001";
console.log(serverBaseURL);
const API = Object.freeze({
  signup: `${serverBaseURL}/api/auth/signup`,
  signin: `${serverBaseURL}/api/auth/signin`,
  logout: `${serverBaseURL}/api/auth/logout`,
  me: `${serverBaseURL}/api/auth/me`,
  getAllUsers: `${serverBaseURL}/api/user/getAllUsers`,
});

export default API;
