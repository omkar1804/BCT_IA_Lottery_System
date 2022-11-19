import web3 from "./web3";
// console.log(web3);

// const getaccount = async () => {
//   const acc = await web3.eth.getAccounts();
//   console.log(acc);
// };

// getaccount();

const address = "0x06bb486644cD1e6eF1982B14A2Ca7C5D9e3f0DCe";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "pickupWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getplayers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "resetPlayers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const lottery = new web3.eth.Contract(abi, address);
// console.log("lottery " + lottery);
export default lottery;
