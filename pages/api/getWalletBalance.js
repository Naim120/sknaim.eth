import { ethers } from 'ethers';

const infuraProjectId = process.env.INFURA_PROJECT_ID;

const infuraUrls = {
  ethereum: `https://mainnet.infura.io/v3/${infuraProjectId}`,
  linea: `https://linea-mainnet.infura.io/v3/${infuraProjectId}`,
  celo: `https://celo-mainnet.infura.io/v3/${infuraProjectId}`,
  matic: `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`,
  blast: `https://blast-mainnet.infura.io/v3/${infuraProjectId}`,
  optimism: `https://optimism-mainnet.infura.io/v3/${infuraProjectId}`,
  arbitrum: `https://arbitrum-mainnet.infura.io/v3/${infuraProjectId}`,
  zksync: `https://zksync-mainnet.infura.io/v3/${infuraProjectId}`,
  bsc: `https://bsc-dataseed.binance.org/`, // Added BSC
};

const fetchBalance = async (providerUrl, address) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const response = await provider.send('eth_getBalance', [address, 'latest']);
  return ethers.BigNumber.from(response);
};

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const [balanceEth, balanceLinea, balanceCelo, balanceMatic, balanceBlast, balanceOptimism, balanceArbitrum, balanceZksync, balanceBnb] = await Promise.all([
      fetchBalance(infuraUrls.ethereum, address),
      fetchBalance(infuraUrls.linea, address),
      fetchBalance(infuraUrls.celo, address),
      fetchBalance(infuraUrls.matic, address),
      fetchBalance(infuraUrls.blast, address),
      fetchBalance(infuraUrls.optimism, address),
      fetchBalance(infuraUrls.arbitrum, address),
      fetchBalance(infuraUrls.zksync, address),
      fetchBalance(infuraUrls.bsc, address), // Added BSC
    ]);

    const balanceInEth = ethers.utils.formatEther(balanceEth);
    const balanceInLinea = ethers.utils.formatEther(balanceLinea);
    const balanceInCelo = ethers.utils.formatEther(balanceCelo);
    const balanceInMatic = ethers.utils.formatEther(balanceMatic);
    const balanceInBlast = ethers.utils.formatEther(balanceBlast);
    const balanceInOptimism = ethers.utils.formatEther(balanceOptimism);
    const balanceInArbitrum = ethers.utils.formatEther(balanceArbitrum);
    const balanceInZksync = ethers.utils.formatEther(balanceZksync);
    const balanceInBnb = ethers.utils.formatEther(balanceBnb);

    // Fetch ETH price in USD from CoinGecko API
    const apiKey = process.env.COINGECKO_API3;
    const apiKey2 = process.env.COINGECKO_API4;

    const responseUSD = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum,celo,matic-network,binancecoin&vs_currencies=usd&x_cg_api_key=${apiKey}`);
    const responseUSD2 = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=blast,optimism,arbitrum,zksync&vs_currencies=usd&x_cg_api_key=${apiKey2}`);
    const dataUSD = await responseUSD.json();
    const dataUSD2 = await responseUSD2.json();

    // Check if the required data is present in the response
    const ethPriceInUsd = dataUSD.ethereum?.usd || 0;
    const celoPriceInUsd = dataUSD.celo?.usd || 0;
    const lineaPriceInUsd = dataUSD.ethereum?.usd || 0;
    const maticPriceInUsd = dataUSD['matic-network']?.usd || 0;
    const blastPriceInUsd = dataUSD2.blast?.usd || 0;
    const opPriceInUsd = dataUSD2.optimism?.usd || 0;
    const arbPriceInUsd = dataUSD2.arbitrum?.usd || 0;
    const zkPriceInUsd = dataUSD2.zksync?.usd || 0;

    const bnbPriceInUsd = dataUSD.binancecoin?.usd || 0;

    const balanceInUsdEth = parseFloat((balanceInEth * ethPriceInUsd).toFixed(2));
    const balanceInUsdCelo = parseFloat((balanceInCelo * celoPriceInUsd).toFixed(2));
    const balanceInUsdLinea = parseFloat((balanceInLinea * lineaPriceInUsd).toFixed(2));
    const balanceInUsdMatic = parseFloat((balanceInMatic * maticPriceInUsd).toFixed(2));
    const balanceInUsdBlast = parseFloat((balanceInBlast * blastPriceInUsd).toFixed(2));
    const balanceInUsdOptimism = parseFloat((balanceInOptimism * opPriceInUsd).toFixed(2));
    const balanceInUsdArbitrum = parseFloat((balanceInArbitrum * arbPriceInUsd).toFixed(2));
    const balanceInUsdZksync = parseFloat((balanceInZksync * zkPriceInUsd).toFixed(2));
    const balanceInUsdBnb = parseFloat((balanceInBnb * bnbPriceInUsd).toFixed(2));

    const totalassets = balanceInUsdEth + balanceInUsdCelo + balanceInUsdLinea + balanceInUsdMatic + balanceInUsdBlast + balanceInUsdOptimism + balanceInUsdArbitrum + balanceInUsdZksync + balanceInUsdBnb;

    return res.status(200).json({
      balanceInEth: parseFloat(balanceInEth).toFixed(6),
      balanceInLinea: parseFloat(balanceInLinea).toFixed(6),
      balanceInCelo: parseFloat(balanceInCelo).toFixed(6),
      balanceInMatic: parseFloat(balanceInMatic).toFixed(6),
      balanceInBlast: parseFloat(balanceInBlast).toFixed(6),
      balanceInOptimism: parseFloat(balanceInOptimism).toFixed(6),
      balanceInArbitrum: parseFloat(balanceInArbitrum).toFixed(6),
      balanceInZksync: parseFloat(balanceInZksync).toFixed(6),
      balanceInBnb: parseFloat(balanceInBnb).toFixed(6),
      balanceInUsdEth,
      balanceInUsdCelo,
      balanceInUsdLinea,
      balanceInUsdMatic,
      balanceInUsdBlast,
      balanceInUsdOptimism,
      balanceInUsdArbitrum,
      balanceInUsdZksync,
      balanceInUsdBnb,
      totalassets: parseFloat(totalassets).toFixed(2),
    });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return res.status(500).json({ error: 'Error fetching wallet balance' });
  }
}
