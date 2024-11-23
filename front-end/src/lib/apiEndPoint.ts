import ENV from './env';

export const BASE_URL = `${ENV.BACKEND_URL}/api`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const check_credential = `${BASE_URL}/auth/logincheck`;
