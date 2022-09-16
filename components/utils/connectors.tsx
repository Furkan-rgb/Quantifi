import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 97, 56, 137, 43114, 42161, 10, 25, 250, 100, 3, 4, 5, 42],
});

const walletConnect = new WalletConnectConnector({
  rpc: { 1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  chainId: 97,
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "quantifi",
});

export const connectors = {
  injected: injected,
  walletConnect: walletConnect,
  coinbaseWallet: walletlink,
};
