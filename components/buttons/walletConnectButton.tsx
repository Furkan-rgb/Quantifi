import React, { Fragment, useContext, useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { ethers } from "ethers";
import { toHex, truncateAddress } from "../utils";
import { networkParams } from "../utils/networks";
import SelectWalletModal from "../Modal";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

import { ConnectButton } from "@rainbow-me/rainbowkit";

function WalletConnectButton() {
  const router = useRouter();
  return (
    // Rainbowkit ConnectButton
    <ConnectButton />
  );
}

export default WalletConnectButton;
