const ERROR_MSG = document.querySelector('.error-msg');
const LOG_PAGE = document.querySelector('.authentication-page');
const LIFETIME_TOKEN = 4 * 3600 * 1000;
const ERROR_PASSWORD = 422;
const ERROR_USER = 417;
const PASSWORD = document.getElementById('pwd');

export {
  ERROR_MSG, LOG_PAGE, LIFETIME_TOKEN, ERROR_PASSWORD, ERROR_USER, PASSWORD,
};
