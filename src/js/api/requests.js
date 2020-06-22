import { getTokenForRequest } from './authorization';

async function sendRequest(methodRequest, urlRequest, withCredentials = false, objectBody = null) {
  try {
    const token = await getTokenForRequest();
    console.log(token);
    const params = {
      method: methodRequest,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (objectBody) {
      params.body = JSON.stringify(objectBody);
    }
    if (withCredentials) {
      params.withCredentials = true;
    }
    const rawResponse = await fetch(urlRequest, params);
    return rawResponse.json();
  } catch (error) {
    return error;
  }
}

export default sendRequest;
