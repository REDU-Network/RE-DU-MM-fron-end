import React from 'react';
import { TokenHoldingsProvider } from './context/TokenHoldingsContext';
import TokenHoldingsForm from './components/TokenHoldingsForm';
import TokenHoldingsTable from './components/TokenHoldingsTable';

function App() {
  return (
    <div>
      <TokenHoldingsProvider>
        <TokenHoldingsForm />
        <TokenHoldingsTable />
      </TokenHoldingsProvider>
    </div>
  );
}

export default App;
