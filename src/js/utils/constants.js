const ERROR_MSG = document.querySelector('.error-msg');
const LOG_PAGE = document.querySelector('.authentication-page');
const LIFETIME_TOKEN = 4 * 60 * 3600 * 1000;
const ERROR_PASSWORD = 422;
const ERROR_USER = 417;

export {
  ERROR_MSG, LOG_PAGE, LIFETIME_TOKEN, ERROR_PASSWORD, ERROR_USER,
};
