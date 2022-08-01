import { apiClient } from '../../../config/axios';

export const getFriends = async (profileId) => apiClient.get(`/friends/${profileId}`);

export const getRequests = async (profileId) => apiClient.get(`/friends/${profileId}/requests`);

export const getRecommendation = async () => apiClient.get('/friends/recommendations');

export const getRequestsByType = async (type) => apiClient.get(`/friends/requests/${type}`);

export const checkFriendly = async (profileId) => apiClient.get(`/friends/check/friend/${profileId}`);

export const deleteFriend = async (friendId) => apiClient.delete(`/friends/${friendId}`);

export const sendRequest = async (data) => apiClient.put('/friends/send-request', data);

export const banOrUnban = async (data, type) => apiClient.put(`/friends/ban/${type}`, data);

export const acceptRequest = async (requestId) => apiClient.put(`/friends/accept/${requestId}`);

export const revokeRequest = async (requestId) => apiClient.put(`/friends/revoke/${requestId}`);

export const deleteRequest = async (friendId) => apiClient.delete(`/friends/cancel/${friendId}`);
