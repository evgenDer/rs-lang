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

function setUserPassword(user) {
  localStorage.setItem('email', user.email);
}

function setUserEmail(user) {
  localStorage.setItem('password', user.email);
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

function getGameStatistics(gameName) {
  if (localStorage.getItem(gameName) === null) {
    const data  = { level: 0, page: 0 }
    localStorage.setItem(gameName, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(gameName));
};

function setGameStatistics(data) {
  localStorage.setItem('speakitStatistic', JSON.stringify(data));
};

export {
  setUserId, setToken, setDateToken, setUserPassword,
  setUserEmail, getToken, getUserId, getDateToken, removeUserId,
  getGameStatistics, setGameStatistics,
};
