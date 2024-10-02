import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";
// import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
export const config = createConfig({
  chains: [scrollSepolia],
  //   connectors: [
  //     // injected(),
  //     // walletConnect({ projectId: "" }),
  //     metaMask(),
  //     safe(),
  //   ],

  transports: {
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
    [scrollSepolia.id]: http(),
  },
});
