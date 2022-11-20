import "./App.css";
import { useEffect, useState, useRef } from "react";
import lottery from "./lottery.js";
import web3 from "./web3";
import logo from "./logo.svg";

function App() {
  const inputRef = useRef(null);
  const [manager, setmanager] = useState("0000");
  const [winner, setwinner] = useState();
  const [players, setplayers] = useState([]);
  const [balance, setbalance] = useState();
  const [currentAcc, setcurrentAcc] = useState();
  const [ismanager, setismanager] = useState(false);

  const getManager = async () => {
    const manager_address = await lottery.methods.manager().call();
    const plyrs = await lottery.methods.getplayers().call();
    const balnc = await web3.eth.getBalance(lottery.options.address);

    setmanager(manager_address);
    setplayers(plyrs);
    setbalance(balnc);

    getCurrentAccount();
  };

  const getCurrentAccount = async () => {
    // await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // console.log(accounts);

    setcurrentAcc(accounts[0]);
  };

  const enterContract = async (e) => {
    e.preventDefault();
    // console.log(inputRef.current.value);
    await lottery.methods.enter().send({
      from: currentAcc,
      value: web3.utils.toWei("0.12", "ether"),
    });
    window.location.reload();
  };

  const pickWinner = async (e) => {
    e.preventDefault();

    // console.log(currentAcc);
    if (manager.toLowerCase() === currentAcc) {
      await lottery.methods.pickupWinner().send({
        from: currentAcc,
      });
      const win = await lottery.methods.lastWinner().call();
      // alert(win);
      setwinner(win);
      // window.location.reload();
    } else {
      alert("Sorry you are not the manager of the contract !");
    }
  };

  window.ethereum.on("accountsChanged", getCurrentAccount);

  useEffect(() => {
    getManager();
  }, []);

  return (
    <div className="App vw-100 vh-100 flex flex-column">
      <div className="flex mt-3 mb-5">
        <img src={logo} height={80} width={80} alt="Logo" />
        <h1 className="title display-5">Lottery System</h1>
      </div>

      <div className="flex flex-column shadow bg-white text-dark rounded p-5 text-center">
        <div className="mb-2">
          <h5 className="text-muted">The lottery is managed by:</h5>
          <h4 className="text-decoration-underline">{manager}</h4>
        </div>

        <hr className="my-1 py-1" />

        <div className="my-2">
          <h5 className="text-muted">Current Status:</h5>
          <h4>
            Players competing:
            <mark>{players.length}</mark>
          </h4>
          <h4>
            Lottery prize:
            <mark>
              {balance ? web3.utils.fromWei(balance.toString(), "ether") : 0}{" "}
              ethers
            </mark>
            !!
          </h4>
        </div>

        <hr className="my-1 py-1" />

        {manager.toLowerCase() === currentAcc ? (
          <div className="mt-2">
            <h5 className="text-muted">Pick a Winner?</h5>
            <button
              className="btn btn-outline-secondary"
              onClick={(e) => {
                pickWinner(e);
              }}
            >
              Pick a Winner
            </button>
          </div>
        ) : (
          <div className="my-2">
            <h5 className="text-muted mb-2">Want to try your luck?</h5>
            {/* <label htmlFor="ether">: </label> */}
            <div className="input-group mb-3">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={(e) => {
                  enterContract(e);
                }}
              >
                Enter with 0.12 ethers
              </button>
            </div>
          </div>
        )}

        <hr className="my-1 py-1" />
        {winner ? (
          <div className="mb-2 w-100 flex flex-column">
            <h5 className="text-muted">The winner of the lottery is: </h5>
            <h4 className="text-decoration-underline"> {winner} </h4>
            <lottie-player
              src="https://assets8.lottiefiles.com/packages/lf20_ky24lkyk.json"
              background="transparent"
              speed="3"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default App;
