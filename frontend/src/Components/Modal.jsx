import { useEffect, useRef, useState } from "react";
import vector2 from "../assets/svg/Ellipse.svg";
import { ethers } from "ethers";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";

const contractAddress = "0xed6f474c68a66138Deb31CF502d17e7eF798eb93";
const tokenAddress = "0x429f2336e332e8c4227D965f921E1A3E827b1D9e";
const credLinkAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_lender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "BorrowerApplySuccessful",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_approverAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_borrowerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "BorrowerApproveSuccessful",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_depositor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "LenderDepositSuccessful",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_lender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timeOfRepay",
        type: "uint256",
      },
    ],
    name: "RepaySuccessful",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_lender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "applyForLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrowerToApprove",
        type: "address",
      },
    ],
    name: "approveBorrower",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLenderBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "lenderDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_lender",
        type: "address",
      },
    ],
    name: "repayLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewApproveBorrowers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasBorrow",
            type: "bool",
          },
        ],
        internalType: "struct CredLinkContract.borrowerDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewAvailableLoans",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewInterestedBorrowers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasBorrow",
            type: "bool",
          },
        ],
        internalType: "struct CredLinkContract.borrowerDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const tokenAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ProvideLoanModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const {
    writeContract,
    isPending,
    isSuccess,
    status,
    failureReason,
    error,
    variables,
    data: hash,
  } = useWriteContract();

  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const { connectors, connect } = useConnect();
  const { isConnected, connector, address } = useAccount();
  const [current_allowance, set_current_allowance] = useState(0);

  const { data: allowance } = useReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "allowance",
    query: {
      refetchInterval: 2000,
    },

    args: [address, contractAddress],
  });

  console.log(allowance, "ALLOWANCE");
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await deposit();
  };

  let toastId;

  useEffect(() => {
    switch (status) {
      case "error":
        toast.dismiss(toastId);
        setLoading(false);
        toastId = toast.error(failureReason?.message ?? "Error");
        break;
      case "pending":
        toast.loading("Pending");
        break;
      case "success":
        if (variables.functionName.toString() === "lenderDeposit" && hash) {
          setAmount("");
          closeModal();
        }
        toast.dismiss(toastId);
        toast.success(variables.functionName + " " + "Success");
    }
  }, [isPending, isSuccess, status, failureReason]);

  useEffect(() => {
    if (amount && Number(allowance) !== Number(current_allowance)) {
      set_current_allowance(Number(allowance));
      writeContract({
        abi: credLinkAbi,
        address: contractAddress,
        functionName: "lenderDeposit",
        args: [Number(ethers.utils.parseEther(amount))],
      });
    }
  }, [allowance]);

  async function deposit() {
    try {
      if (isNaN(Number(amount)) || Number(amount) < 1) {
        toast.error("Invalid input");
        return;
      }

      if (!isConnected) {
        connect({
          connector:
            connectors.find((fd) => fd.name.toLowerCase() === "metamask") ??
            connectors[0],
        });
      }

      setLoading(true);
      if (
        Number(allowance.toString()) < Number(ethers.utils.parseEther(amount))
      ) {
        writeContract({
          abi: tokenAbi,
          address: tokenAddress,
          functionName: "approve",
          args: [contractAddress, Number(ethers.utils.parseEther(amount))],
        });
      } else {
        writeContract({
          abi: credLinkAbi,
          address: contractAddress,
          functionName: "lenderDeposit",
          args: [Number(ethers.utils.parseEther(amount))],
        });
      }

      setLoading(false);
      toast.dismiss(toastId);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      console.log(error, "ERROR");
      toast.error(
        error.reason ??
          error.message ??
          error.info ??
          "OOPS! Something went wrong"
      );
    }
  }

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        className="rounded-3xl bg-[#584BFF] text-white flex items-center gap-2 px-3 py-2"
        onClick={openModal}
      >
        Provide Loan <img src={vector2} alt="Limit Icon 2" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[400px] p-6">
            <h2 className="text-xl font-semibold mb-4 ">Provide Loan</h2>
            <form onSubmit={handleSubmit}>
              {/* Input Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="Enter amount"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                {loading && (
                  <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#584BFF] text-white px-4 py-2 rounded-lg"
                >
                  {loading
                    ? "Processing"
                    : Number(allowance.toString()) <
                      Number(ethers.utils.parseEther(amount || "0") ?? 0)
                    ? "Approve"
                    : "Deposit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvideLoanModal;
