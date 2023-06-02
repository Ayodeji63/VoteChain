import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router";
export const SignIn = () => {
  const navigate = useNavigate()
  const handleLogout = () =>{
    navigate("/")
  }
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
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
                color: "#000",
                marginLeft: 40,
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    style={{
                      background: "#009444",
                      color: "#fff",
                      marginLeft: "80px",
                    }}
                    className="hero-page-btn"
                  >
                    Sign In
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
                <div
                  style={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <button
                    onClick={openChainModal}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "40px",
                      marginLeft: "80px",
                      background: "#FFF",
                    }}
                    type="button"
                    className="hero-page-btn"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: "chain.iconBackground",
                          width: 30,
                          height: 30,
                          borderRadius: 999,
                          // overflow: "hidden",
                          marginRight: 0,
                        }}
                        // className="hero-page-btn"
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{
                              width: 30,
                              height: 30,
                            }}
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name} */}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "50%",
                      marginLeft: "30px",
                    }}
                    className="hero-page-btn"
                  >
                    {account.displayName}
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
