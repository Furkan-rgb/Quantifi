import "../styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";

// Wagmi & RainbowKit imports
import "@rainbow-me/rainbowkit/styles.css";
import { Chain, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const defaultChains: Chain[] = [
  {
    ...bsc,
    iconUrl: "/Binance-Icon-Logo.svg",
  },
  {
    ...bscTestnet,
    iconUrl: "/Binance-Icon-Logo.svg",
  },
];

const { chains, provider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: (chain) => ({
      // BSC Mainnet
      // `https://damp-fabled-resonance.bsc.discover.quiknode.pro/a6e1aa97c7173e264dfb91711955d76bf970f0e9/`
      http: `https://data-seed-prebsc-1-s3.binance.org:8545`,
    }),
    priority: 0,
  }),
  infuraProvider({ apiKey: process.env.INFURA_KEY as string, priority: 1 }),
  publicProvider({ priority: 2 }),
]);

const { connectors } = getDefaultWallets({
  appName: "QuantiFi",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const getLibrary = (provider: ethers.providers.ExternalProvider) => {
  return new ethers.providers.Web3Provider(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          appInfo={{
            learnMoreUrl: "https://quantifi.gitbook.io/docs/about-quantifi/welcome-to-quantifi",
          }}
        >
          <div className="min-h-screen bg-qdark">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </Web3ReactProvider>
  );
}

export default MyApp;
