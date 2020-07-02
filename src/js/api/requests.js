import { getTokenForRequest } from './authorization';

async function sendRequest(methodRequest, urlRequest, withCredentials = false, objectBody = null) {
  try {
    const token = await getTokenForRequest();
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
      console.log(params.body)
    }
    if (withCredentials) {
      params.withCredentials = true;
    }

    const rawResponse = await fetch(urlRequest, params);

    if (rawResponse.status === 404) {
      return null;
    }

    return rawResponse.json();
  } catch (error) {
    console.error(error.toString());
    return error;
  }
}

export default sendRequest;
