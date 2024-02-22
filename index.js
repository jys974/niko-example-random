// 导入web3库
const Web3 = require('web3');

// 连接到以太坊节点的地址
const ethereumUri = 'YOUR_ETHEREUM_NODE_URI';

// 创建一个新的web3实例
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

// 获取以太坊的区块高度
web3.eth.getBlockNumber().then(blockNumber => {
    console.log('当前区块高度：', blockNumber);
}).catch(error => {
    console.error('获取区块高度时出错：', error);
});

// 获取账户余额
const address = 'YOUR_ETH_ADDRESS';
web3.eth.getBalance(address).then(balance => {
    console.log('账户余额：', web3.utils.fromWei(balance, 'ether'), 'ETH');
}).catch(error => {
    console.error('获取账户余额时出错：', error);
});
