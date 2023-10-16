import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActionsList = ({account}) => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.gmx.io/actions',
        {
          params:{
            account: account,
          },
        }
        );
        setActions(result.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Actions List</h1>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>
            <p><strong>Action:</strong> {action.data.action}</p>
            <p><strong>Block Number:</strong> {action.data.blockNumber}</p>
            <p><strong>Account:</strong> {action.data.account}</p>
            <p><strong>Timestamp:</strong> {action.data.timestamp}</p>
            <p><strong>Value:</strong> {action.data.value}</p>
            <p><strong>Index Token:</strong> {action.data.indexToken}</p>
            <p><strong>Collateral Token:</strong> {action.data.collateralToken}</p>
            <p><strong>isLong:</strong> {action.data.isLong}</p>
           
            {/* Add more fields as you see fit */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionsList;
