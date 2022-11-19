import "./App.css";
import { useEffect, useState, useRef } from "react";
import lottery from "./lottery.js";
import web3 from "./web3";

function App() {
  const inputRef = useRef(null);
  const [manager, setmanager] = useState("");
  const [players, setplayers] = useState([]);
  const [balance, setbalance] = useState();
  const [currentAcc, setcurrentAcc] = useState();


  const pickWinner = async (e) => {
    e.preventDefault();

    console.log(currentAcc);
    if (manager === currentAcc) {
      await lottery.methods.pickupWinner().send({
        from: currentAcc,
      });
    } else {
      alert("Sorry you are not the manager of the contract !");
    }
  };

  window.ethereum.on("accountsChanged", getCurrentAccount);

  useEffect(() => {
    getManager();
  }, []);

  return (
    <div className="App">
      <h2>Lottery System</h2>
      <h5>The lottery is managed by: {manager}</h5>
      <p>
        There are currently {players.length} players competing for the lottery
        prize which is
        {balance ? web3.utils.fromWei(balance.toString(), "ether") : 0} ethers
        !!
      </p>
      <hr />
      <b>Want to try your luck?</b>
      <br />
      <br />
      <label htmlFor="ether">Amount of ether to enter: </label>
      <input ref={inputRef} type="text" id="ether" />
      <br />
      <br />
      <button
        onClick={(e) => {
          enterContract(e);
        }}
      >
        Enter
      </button>
      <hr />
      <b>Pick a Winner ?</b>
      <br />
      <button
        onClick={(e) => {
          pickWinner(e);
        }}
      >
        Pick a Winner
      </button>
      <br />
    </div>
  );
}

export default App;
