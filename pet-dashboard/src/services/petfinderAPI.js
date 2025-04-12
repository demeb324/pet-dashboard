import axios from 'axios';

const API_KEY = 'mUoWMdmCTfnUkxYgqG3QpBsplIgJAfd6s0MWuZZ08egUVIlT6I';
const API_SECRET = 'B00SPDUTOTFZEoBGrneyPfpMOHOQscB1HIdKxEo5';
let accessToken = '';
let tokenExpiration = 0;

export const getAccessToken = async () => {
  if (accessToken && Date.now() < tokenExpiration) return accessToken;

  try {
    const response = await axios.post(
      'https://api.petfinder.com/v2/oauth2/token',
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error('Token error:', error);
    throw error;
  }
};

export const fetchPets = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.petfinder.com/v2/animals', {
      params: { limit: 50 },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.animals || [];
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchPetDetails = async (id) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.animal;
  } catch (error) {
    console.error('Detail error:', error);
    throw error;
  }
};