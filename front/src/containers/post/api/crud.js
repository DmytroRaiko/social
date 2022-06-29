import { serialize } from 'object-to-formdata';
import { apiClient } from '../../../config/axios';

const header = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlaWQiOjEyLCJpYXQiOjE2NDUzNDY2NzR9.d_qSC8vsUP7OualnwnAJKejNf7lV9-j5phHyMRMTc6A',
  },
};

export const getPosts = async () => apiClient.get('/posts', header);

export const getPost = async (id) => apiClient.get(`/posts/${id}`, header);

export const addPost = async (data) => {
  const formData = serialize(data, { indices: true });

  return apiClient.post(
    '/posts',
    formData,
    {
      ...header,
      'Content-Type': 'multipart/form-data',
    },
  );
};

export const editPost = async (id, data) => {
  const formData = serialize(data, { indices: true });

  return apiClient.put(
    `/posts/${id}`,
    formData,
    {
      ...header,
      'Content-Type': 'multipart/form-data',
    },
  );
};

export const getPostEdit = async (id) => apiClient.get(`/posts/${id}/edit`, header);

export const deletePost = async (id) => apiClient.delete(`/posts/${id}`, header);

export const getPostComments = async (id) => apiClient.get(`/posts/${id}/comments`, header);

export const getPostLikes = async (id) => apiClient.get(`/posts/${id}/likes`, header);

export const getAvailability = async () => apiClient.get('/select/availability', header);

export const getUniversities = async () => apiClient.get('/select/universities', header);

export const likePost = async (postId) => apiClient.post(`/posts/${postId}/likes`, {}, header);

export const deleteLikePost = async (postId) => apiClient.delete(`/posts/${postId}/likes`, header);
