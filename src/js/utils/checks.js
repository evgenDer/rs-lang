function isValidToken(refreshToken) {
  const magickApiNumberForDate = 1000;
  const data = refreshToken.split('.')[1];
  const decodedString = JSON.parse(atob(data));

  const expDate = decodedString.exp * magickApiNumberForDate;

  if ((new Date).getTime() + 5 * 60000 > expDate) {
    return false;
  }

  return true;
}

function isNewUser() {
  return !(isValidToken() && localStorage.getItem('userId') !== null);
}

export {
  isValidToken,
  isNewUser
};
