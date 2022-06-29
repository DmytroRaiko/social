import axios from 'axios';
import { URI } from '../settings';

export const apiClient = axios.create(
  {
    baseURL: URI,
    responseType: 'json',
    withCredentials: true,
  },
);

apiClient.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

apiClient.interceptors.response.use((request) => request, async (error) => {
  const originalRequest = error.config;

  if (Number(error.response.status) === 401 && error.config && !error.config.requestIsRetry) {
    originalRequest.requestIsRetry = true;

    try {
      const response = await axios.post(`${URI}/auth/refresh`, {}, { withCredentials: true });
      localStorage.setItem('token', response.data.newAccessToken);
      return apiClient.request(originalRequest);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Unauthorised');
    }
  }
  return error?.response;
});
