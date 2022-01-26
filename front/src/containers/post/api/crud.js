import { apiClient } from '../../../config/axios';

export const getPosts = async () => apiClient.get('/posts');

export const getPost = async (id) => apiClient.get(`/posts/${id}`);

export const getPostComments = async (id) => apiClient.get(`/posts/${id}/comments`);

export const getPostLikes = async (id) => apiClient.get(`/posts/${id}/likes`);
