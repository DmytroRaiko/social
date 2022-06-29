import { apiClient } from '../../../config/axios';
import settings from '../../../settings';

export const getUserInfoByCookie = async () => apiClient.get('/auth/user-by-cookie');

export const registration = async (data) => apiClient.post('/auth/registration', data);

export const login = async (data) => apiClient.post('/auth/login', data);

export const refresh = async () => apiClient.post('/auth/refresh');

export const logout = async () => apiClient.post('/auth/logout');

export const forgotPassword = async (data) => apiClient.post('/auth/forgot-password', data);

export const resetPassword = async (hash, data) => apiClient.post(`auth/reset-password/${hash}`, data);

export const googleOAuth = async (data) => apiClient.post(`${settings.URI}/auth/google`, {
  access_token: data.accessToken,
});

export const facebookOAuth = async (data) => apiClient.post(`${settings.URI}/auth/facebook`, {
  access_token: data.accessToken,
});
