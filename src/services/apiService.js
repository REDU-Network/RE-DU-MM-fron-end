import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Replace with your backend API base URL

export async function fetchTokenHoldings(chainName, addresses) {
  try {
    const response = await axios.post(`${BASE_URL}/api/token-holdings`, {
      chainName,
      addresses,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token holdings:', error.message);
    throw error;
  }
}
