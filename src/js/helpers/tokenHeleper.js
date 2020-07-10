import { getToken } from "../utils/storage";

export function parseJwt (token) {
  if(token){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return `%${  (`00${  c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));

    return JSON.parse(jsonPayload);
  }
};

export function getTokenTime(){
  const payLoad = parseJwt(getToken());
  return payLoad.exp;
}


