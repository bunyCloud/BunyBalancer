import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ethers} from 'ethers';
import { formatBalance } from '../../utils/formatMetamask';

const PriceFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    const getTokenName = (address) => {
      switch (address) {
        case '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7':
          return 'WAVAX';
        case '0x152b9d0FdC40C096757F570A51E494bd4b943E50':
          return 'BTC.b';
          case '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB':
          return 'WETH.e';
          case '0x50b7545627a5162F82A992c33b87aDc75187B218':
          return 'WBTC.e';
        default:
          return 'Unknown Token';
      }
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gmx-avax-server.uc.r.appspot.com/prices');
        if (response.data && typeof response.data === 'object') {
          // Convert the object to an array of entries: [[key, value], [key, value], ...]
          const dataArray = Object.entries(response.data);
          setData(dataArray);
        } else {
          setError('Data format is unexpected.');
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
        console.error('There was an error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    const priceBigNumber = ethers.BigNumber.from(price);
    const formattedPrice = ethers.utils.formatUnits(priceBigNumber, 30); // because prices are multiplied by 10**30
    return formattedPrice;
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data.length) return <p>No data available.</p>;

  return (
    <div style={{width:'300px'}}>
      <h3>Current Price</h3>
      <table style={{padding:'12px', width:'250px'}}>
      
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{getTokenName(item[0])}</td>
              
              {/* Assuming the price is in Gwei and needs to be converted to Ether */}
              <td>{formatPrice(item[1])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceFeed;
