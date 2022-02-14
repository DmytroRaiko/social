import axios from 'axios';
import projectSettings from '../settings';

export const apiClient = axios.create(
  {
    baseURL: projectSettings.URI,
    responseType: 'json',
  },
);
