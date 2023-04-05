import React, { useState } from 'react';
import { useTokenHoldings } from '../context/TokenHoldingsContext';
import { fetchTokenHoldings } from '../services/apiService';
import '../styles/TokenHoldingsForm.css';

const TokenHoldingsForm = () => {
  const [chainName, setChainName] = useState('');
  const [addresses, setAddresses] = useState('');
  const { setTokenHoldings } = useTokenHoldings();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const addressArray = addresses.split(',').map((address) => address.trim());
      const fetchedTokenHoldings = await fetchTokenHoldings(chainName, addressArray);
      console.log('Fetched token holdings:', fetchedTokenHoldings);

      // Convert the fetched token holdings data into the expected format
      const formattedTokenHoldings = Object.entries(fetchedTokenHoldings).map(([address, balances]) => {
        return { address, balances };
      });

      setTokenHoldings(formattedTokenHoldings);
    } catch (error) {
      console.error('Error fetching token holdings:', error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chainName">Chain Name:</label>
        <select
          id="chainName"
          value={chainName}
          onChange={(event) => setChainName(event.target.value)}
        >
          <option value="">Select Chain</option>
          <option value="ethereum">Ethereum</option>
          <option value="bsc">Binance Smart Chain</option>
          <option value="xdai">xDAI</option>
          <option value="polygon">Polygon</option>
          <option value="avalanche">Avalanche</option>
          <option value="fantom">Fantom</option>
          <option value="heco">Huobi ECO Chain</option>
          <option value="optimism">Optimism</option>
          <option value="arbitrum">Arbitrum</option>
        </select>
        <label htmlFor="addresses">Addresses (comma-separated):</label>
        <textarea
          id="addresses"
          value={addresses}
          onChange={(event) => setAddresses(event.target.value)}
        />
        <button type="submit">Fetch Token Holdings</button>
      </form>
    </div>
  );
};

export default TokenHoldingsForm;
