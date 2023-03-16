import axios from "axios";
import axiosRetry from "axios-retry";

const BASE_URL = "http://localhost:3001";

axiosRetry(axios, { retries: 3 });

// Login
export const login = async (pseudo, password) => {
  const response = await axios.post(BASE_URL + "/connexion", { pseudo, password });
  return response?.data;
};

// Bookings
export const getBookings = async (accessToken) => {
  const response = await axios.get(BASE_URL + "/booking", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const postBookings = async (newBookingAPI, accessToken) => {
  const response = await axios.post(BASE_URL + "/booking", newBookingAPI, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const putBookings = async (editedBooking, accessToken) => {
  const response = await axios.put(BASE_URL + "/booking", editedBooking, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const deleteBookings = async (bookingId, accessToken) => {
  const response = await axios.delete(BASE_URL + `/booking/${bookingId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const closeBooking = async (bookingId, accessToken) => {
  const response = await axios.patch(BASE_URL + "/booking/close", bookingId, {
      headers: { Authorization: `Bearer ${accessToken}`},
  });
  return response?.data;
};

// Users
export const getUsers = async (accessToken) => {
  const response = await axios.get(BASE_URL + "/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const postUsers = async (newUserAPI, accessToken) => {
  const response = await axios.post(BASE_URL + "/user", newUserAPI, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const patchUsers = async (submitUser, accessToken) => {
  const response = await axios.patch(BASE_URL + "/user", submitUser, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const deleteUsers = async (userPseudo, accessToken) => {
  const response = await axios.delete(BASE_URL + `/user/${userPseudo}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

// Locations
export const getLocations = async (accessToken) => {
  const response = await axios.get(BASE_URL + "/location", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const postLocations = async (newLocationAPI, accessToken) => {
  const response = await axios.post(BASE_URL + "/location", newLocationAPI, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const deleteLocations = async (zipCode, city, accessToken) => {
  const response = await axios.delete(BASE_URL + `/location/${zipCode}/${city}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

// Ads
export const getAds = async (accessToken) => {
  const response = await axios.get(BASE_URL + "/ad", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const getAdById = async (id, accessToken) => {
  const response = await axios.get(BASE_URL + `/ad/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const postAds = async (newAdAPI, accessToken) => {
  const response = await axios.post(BASE_URL + "/ad", newAdAPI, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const patchAds = async (submitAd, accessToken) => {
  const response = await axios.patch(BASE_URL + "/ad", submitAd, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const deleteAds = async (adId, accessToken) => {
  const response = await axios.delete(BASE_URL + `/ad/${adId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

// Reviews
export const getReviews = async (accessToken) => {
  const response = await axios.get(BASE_URL + "/review", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const postReviews = async (newReview, accessToken) => {
  const response = await axios.post(BASE_URL + "/review", newReview, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const putReviews = async (editedReview, accessToken) => {
  const response = await axios.put(BASE_URL + "/review", editedReview, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const deleteReviews = async (reviewId, accessToken) => {
  const response = await axios.delete(BASE_URL + `/review/${reviewId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

// Subscriptions
export const getSubscriptions = async (accessToken) => {
  const response = await axios.get(BASE_URL + "/subscription", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const postSubscriptions = async (newSubscriptionAPI, accessToken) => {
  const response = await axios.post(BASE_URL + "/subscription", newSubscriptionAPI, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};

export const deleteSubscriptions = async (subscriber, subscription, accessToken) => {
  const response = await axios.delete(BASE_URL + `/subscription/${subscriber}/${subscription}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
};
