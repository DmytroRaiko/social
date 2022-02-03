import { apiClient } from '../../../config/axios';

export const getPosts = async () => apiClient.get('/posts');

export const getPost = async (id) => apiClient.get(`/posts/${id}`);

export const addPost = async (data) => apiClient.post('/posts', data);

export const editPost = async (id, data) => apiClient.put(`/posts/${id}`, data);

export const getPostEdit = async (id) => apiClient.get(`/posts/${id}/edit`);

export const deletePost = async (id) => apiClient.delete(`/posts/${id}`);

export const getPostComments = async (id) => apiClient.get(`/posts/${id}/comments`);

export const getPostLikes = async (id) => apiClient.get(`/posts/${id}/likes`);

export const getAvailability = async () => apiClient.get('/select/availability');

export const getUniversities = async () => apiClient.get('/select/universities');
