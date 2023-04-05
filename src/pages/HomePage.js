import React from 'react';
import { useTokenHoldings } from '../context/TokenHoldingsContext';
import { fetchTokenHoldings } from '../services/apiService';
import TokenHoldingsForm from '../components/TokenHoldingsForm';
import TokenHoldingsTable from '../components/TokenHoldingsTable';

const HomePage = () => {
  const { tokenHoldings, setTokenHoldings } = useTokenHoldings();

  const handleSubmit = async (chainName, addresses) => {
    try {
      const data = await fetchTokenHoldings(chainName, addresses);
      setTokenHoldings(data);
    } catch (error) {
      console.error('Error fetching token holdings:', error.message);
      alert('Failed to fetch token holdings. Please try again.');
    }
  };

  return (
    <div>
      <h1>Token Holdings</h1>
      <TokenHoldingsForm onSubmit={handleSubmit} />
      {tokenHoldings.length > 0 && <TokenHoldingsTable tokenHoldings={tokenHoldings} />}
    </div>
  );
};

export default HomePage;
