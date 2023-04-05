import React, { useState } from 'react';
import { useTokenHoldings } from '../context/TokenHoldingsContext';
import '../styles/TokenHoldingsTable.css';

const TokenHoldingsTable = () => {
  const { tokenHoldings } = useTokenHoldings();
  const [expandedAddress, setExpandedAddress] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleExpandAddress = (address) => {
    if (expandedAddress === address) {
      setExpandedAddress(null);
    } else {
      setExpandedAddress(address);
    }
  };

  const totalPages = Math.ceil(tokenHoldings.length / itemsPerPage);

  const handleClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedTokenHoldings = tokenHoldings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Token Name</th>
            <th>Token Balance</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTokenHoldings.map(({ address, balances }) => {
            return (
              <React.Fragment key={address}>
                <tr className="header-row" onClick={() => toggleExpandAddress(address)}>
                  <td>{address}</td>
                  <td>{balances.length} tokens</td>
                  <td></td>
                </tr>
                {expandedAddress === address &&
                  balances.map(({ name, balance, decimals }, index) => (
                    <tr key={`${address}-${index}`}>
                      <td></td>
                      <td>{name}</td>
                      <td>{(balance / (10 ** decimals)).toFixed(decimals)}</td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handleClick(currentPage - 1)}>&laquo;</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handleClick(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handleClick(currentPage + 1)}>&raquo;</button>
      </div>
    </div>
  );
};

export default TokenHoldingsTable;
