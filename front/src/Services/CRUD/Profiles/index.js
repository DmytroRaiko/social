import { serialize } from 'object-to-formdata';
import { apiClient } from '../../../Config/axios';

export const getProfiles = async () => apiClient.get('/profiles');

export const search = async (row) => apiClient.get(`/profiles?searchRow=${row}`);

export const getProfile = async (id) => apiClient.get(`/profiles/${id}`);

export const editProfile = async (id, data) => apiClient.put(`/profiles/${id}`, data);

export const editProfileAvatar = async (id, data) => {
  const formData = serialize({ avatar: data }, { indices: true });

  return apiClient.post(
    `/files/${id}/avatar`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
};

export const deleteProfileAvatar = async (id) => apiClient.delete(`/files/avatar/${id}`);

export const getEditProfile = async (id) => apiClient.get(`/profiles/${id}/edit`);

export const getProfilePosts = async (id, page) => apiClient.get(`/profiles/${id}/posts?page=${page}`);

export const addUniversities = async (data) => apiClient.post('/select/university', data);
