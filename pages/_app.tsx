import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen dark:bg-qdark">
      <Navbar></Navbar>
      {/* <DAppProvider> */}
      <Component {...pageProps} />
      {/* </DAppProvider> */}
      <Footer></Footer>
    </div>
  );
}

export default MyApp;
