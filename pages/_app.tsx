import "../styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";

const getLibrary = (provider: ethers.providers.ExternalProvider) => {
  return new ethers.providers.Web3Provider(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="min-h-screen bg-qdark">
        <Navbar></Navbar>

        <Component {...pageProps} />

        <Footer></Footer>
      </div>
    </Web3ReactProvider>
  );
}

export default MyApp;
