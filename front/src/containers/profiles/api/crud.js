import { serialize } from 'object-to-formdata';
import { apiClient } from '../../../config/axios';

const header = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlaWQiOjEyLCJpYXQiOjE2NDUzNDY2NzR9.d_qSC8vsUP7OualnwnAJKejNf7lV9-j5phHyMRMTc6A',
  },
};

export const getProfiles = async () => apiClient.get('/profiles', header);

export const getProfile = async (id) => apiClient.get(`/profiles/${id}`, header);

export const editProfile = async (id, data) => apiClient.put(`/profiles/${id}`, data, header);

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

export const deleteProfileAvatar = async (id) => apiClient.delete(`/files/avatar/${id}`, header);

export const getEditProfile = async (id) => apiClient.get(`/profiles/${id}/edit`, header);

export const getProfilePosts = async (id) => apiClient.get(`/profiles/${id}/posts`, header);
