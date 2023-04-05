import { createContext, useContext, useState } from 'react';

const TokenHoldingsContext = createContext();

export const useTokenHoldings = () => useContext(TokenHoldingsContext);

export const TokenHoldingsProvider = ({ children }) => {
  const [tokenHoldings, setTokenHoldings] = useState([]);

  return (
    <TokenHoldingsContext.Provider value={{ tokenHoldings, setTokenHoldings }}>
      {children}
    </TokenHoldingsContext.Provider>
  );
};
