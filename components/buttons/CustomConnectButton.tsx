import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: "opacity-0 pointer-events-none user-select-none",
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="flex items-center justify-center w-10 h-10"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="w-full h-full ">
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={24}
                            height={24}
                            layout="responsive"
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name} */}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {/* {account.displayBalance ? ` (${account.displayBalance})` : ""} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
