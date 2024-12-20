import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Explorer = () => {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const fetchChain = async () => {
      try {
        const response = await axios.get('/chain');
        setChain(response.data);
      } catch (error) {
        console.error('Error fetching the blockchain:', error);
      }
    };

    fetchChain();
  }, []);

  return (
    <div>
      <h1>Blockchain Explorer</h1>
      <ul>
        {chain.map((block, index) => (
          <li key={index}>
            <h2>Block {block.index}</h2>
            <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
            <p>Previous Hash: {block.previousHash}</p>
            <p>Hash: {block.hash}</p>
            <p>Merkle Root: {block.merkleRoot}</p>
            <h3>Transactions:</h3>
            <ul>
              {block.transactions.map((transaction, txIndex) => (
                <li key={txIndex}>
                  <p>ID: {transaction.id}</p>
                  <p>Data: {JSON.stringify(transaction.data)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explorer;
