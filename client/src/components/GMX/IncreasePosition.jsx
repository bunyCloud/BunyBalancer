import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  Table,
  Tbody,
  Tr,
  Td,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Container,
} from '@chakra-ui/react';

// Extend dayjs with the plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const IncreasePosition = ({account}) => {
  
  const [order, setOrder] = useState({
    raw: { data: { account: account } },
    trade: { symbol: '', pair: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7, 0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', timestamp: dayjs().unix() },
    deal: { isLong: true, margin: '', price: '', leverage: '' },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevState) => {
      return {
        ...prevState,
        // Update the state with dynamic keys
        trade: { ...prevState.trade, [name]: value },
        deal: { ...prevState.deal, [name]: value },
        raw: { data: { ...prevState.raw.data, [name]: value } },
      };
    });
  };

  const handlePositionIncreasedOrder = async () => {
    const account = order.raw.data.account;
    const symbol = order.trade.symbol;
    const pair = order.trade.pair;
    const isLong = order.deal.isLong;
    const margin = order.deal.margin;
    const timestamp = order.trade.timestamp;
    const longOrShortText = order.deal.isLong ? `Long` : `Short`;
    const price = order.deal.price;
    const leverage = order.deal.leverage;
    const relationDate = dayjs.unix(timestamp).fromNow();
    const date = dayjs.tz(timestamp * 1000, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    // Here you would put the code that interacts with the trading services
    // For this example, those parts are omitted for simplicity

    // Log or set state here as needed
    console.log(`${pair} received an instruction to increase position`, {
      event: order,
    });

    // ...
    // other code from your function
    // ...

    // For demonstration, we are not making actual requests and handling them
    // Replace the below with actual logic as per your application's requirement
    try {
      const result = 'Simulated result of increasing position';
      console.log(`${pair} Increase position successful`, { result: result });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxW="container.md">
    <h1>Trading Order</h1>
    <form onSubmit={handlePositionIncreasedOrder}>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>
              <FormControl id="account">
                <FormLabel>Account</FormLabel>
                <Input type="text" name="account" value={account} onChange={handleInputChange} />
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <FormControl id="symbol">
                <FormLabel>Symbol</FormLabel>
                <Input type="text" name="symbol" value={order.trade.symbol} onChange={handleInputChange} />
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <FormControl id="pair">
                <FormLabel>Pair</FormLabel>
                <Input type="text" name="pair" value={order.trade.pair} onChange={handleInputChange} />
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <FormControl id="isLong">
                <FormLabel>Is Long</FormLabel>
                <Select name="isLong" value={order.deal.isLong} onChange={handleInputChange}>
                  <option value={true}>Long</option>
                  <option value={false}>Short</option>
                </Select>
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <FormControl id="margin">
                <FormLabel>Margin</FormLabel>
                <Input type="text" name="margin" value={order.deal.margin} onChange={handleInputChange} />
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input type="text" name="price" value={order.deal.price} onChange={handleInputChange} />
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <FormControl id="leverage">
                <FormLabel>Leverage</FormLabel>
                <Input type="text" name="leverage" value={order.deal.leverage} onChange={handleInputChange} />
              </FormControl>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Button mt={4} colorScheme="teal" type="submit">
        Increase Position
      </Button>
    </form>
  </Container>
  );
};

export default IncreasePosition;
