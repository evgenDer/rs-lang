function setUserId(infoAboutUser) {
  localStorage.setItem('userId', infoAboutUser.userId);
}

function setToken(infoAboutUser) {
  localStorage.setItem('token', infoAboutUser.token);
}

function setDateToken() {
  const dateGetToken = new Date();
  localStorage.setItem('tokenDate', dateGetToken.toString());
}

function setUserEmail(user) {
  localStorage.setItem('email', user.email);
}

function setUserPassword(user) {
  localStorage.setItem('password', user.password);
}

function getToken() {
  return localStorage.getItem('token');
}

function getUserId() {
  return localStorage.getItem('userId');
}

function getDateToken() {
  return localStorage.getItem('tokenDate');
}

function removeUserId() {
  localStorage.removeItem('userId');
}

export {
  setUserId,
  setToken,
  setDateToken,
  setUserPassword,
  setUserEmail,
  getToken,
  getUserId,
  getDateToken,
  removeUserId,
};
