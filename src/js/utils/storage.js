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

function setUserEmail(email) {
  localStorage.setItem('email', email);
}

function setUserPassword(password) {
  localStorage.setItem('password', password);
}

function getUserPassword(){
  return localStorage.getItem('password');
}

function getUserEmail(){
  return localStorage.getItem('email');
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
  setUserId, setToken, setDateToken, setUserPassword, getUserEmail, getUserPassword,
  setUserEmail, getToken, getUserId, getDateToken, removeUserId,
};
