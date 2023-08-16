# BunyBalancer
GMX Trade Balancer 
# Trade Balancer
## GMX Avalanche auto trade long/short eth 

Automate the transfer of profits from Long positions to Short and Short positions to Long. 

- GMX API token pair price check
- Create increase position size
- Create decrease position size
- ✨Magic ✨

## Features

- node.js server to call GMX token pairs price check on (x) time intervals. 
- Smartcontract to hold token balance and interface with GMX positions router contract functions. 
- Frontend client to view owners, emitted events, past transactions, token balance, timer, manual override functions (create increase, create decrease, cancel, close, trigger, swap, withdraw, transfer).

## Tech


- [reactjs] - frontend
- [solidity] - smartcontract
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 

## Conditions
Simple rule based parameters for executing trade functions. 

| Trade |  |
| ------ | ------ |
| Long |profit= (L) >= 20% [createDecreasePosition] 10% (size)[createIncreasePosition] (S) 8% of Profit |
| | |
|  | |
|Short |Profit = (S) >= 20% [createDecreasePosition] 10% (size) [createIncreasePosition] (L) 8% of Profit |
#### Create Increase Position
Example of transaction parameters
|  |  |
|-------|-------------------------------------------|
|    Path   | 0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e, 0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab |
| indexToken: | 0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab |
| amountIn: | 12941787 |
| minOut: | 0 |
| sizeDelta: | 190990174850246305342690000000000 |
| isLong: | True |
| acceptablePrice: | 1825129010000000000000000000000000 |
| executionFee: | 20000000000000000 |
| index: | 116 |
| queueIndex: | 153322 |
| blockNumber: | 34002682 |
| blockTime: | 1692206113 |
| gasPrice: | 28000000000 |

[Position Router: <https://snowtrace.io/address/0xfff6d276bc37c61a23f06410dce4a400f66420f8>]

```sh
Position Router: 0xffF6D276Bc37c61A23f06410Dce4A400f66420f8
```


## License

MIT

