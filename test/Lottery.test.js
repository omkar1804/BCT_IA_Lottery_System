const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
  it("deploys the contract", async () => {
    const lottery = await Lottery.deployed();
    assert.ok(lottery);
  });

  it("resets players !", async () => {
    const lottery = await Lottery.deployed();
    await lottery.resetPlayers({
      from: accounts[0],
    });
    const players = await lottery.getplayers({ from: accounts[0] });
  });

  it("winner receives the winning amount and players array is reset", async () => {
    const lottery = await Lottery.deployed();
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    const initialAmount = await web3.eth.getBalance(accounts[0]);

    await lottery.pickupWinner({
      from: accounts[0],
    });

    const finalAmount = await web3.eth.getBalance(accounts[0]);

    difference = finalAmount - initialAmount;

    assert(difference > web3.utils.toWei("1.8", "ether"));
  });
});
