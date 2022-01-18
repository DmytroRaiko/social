import { apiClient } from '../../../config/axios';

export const getProfiles = async () => apiClient.get('/profiles');

export const getProfile = async (id) => apiClient.get(`/profiles/${id}`);

export const getProfilePosts = async (id) => apiClient.get(`profile/${id}/posts/`);
