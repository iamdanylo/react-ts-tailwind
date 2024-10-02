import axios, { CreateAxiosDefaults } from 'axios';
import { getAccessToken } from 'src/client-base/auth/actions';

export function createPrivateAPI(config?: CreateAxiosDefaults<unknown>) {
  const api = axios.create(config);

  api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
}

export function createPublicAPI(config?: CreateAxiosDefaults<unknown>) {
  return axios.create(config);
}
