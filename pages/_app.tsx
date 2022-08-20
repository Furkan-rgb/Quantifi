import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className=" min-h-screen dark:bg-qdark">
      {/* <DAppProvider> */}
      <Component {...pageProps} />
      {/* </DAppProvider> */}
    </div>
  );
}

export default MyApp;
