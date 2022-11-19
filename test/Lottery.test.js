const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
  it("deploys the contract", async () => {
    const lottery = await Lottery.deployed();
    assert.ok(lottery);
  });

  it("allows one player to enter", async () => {
    const lottery = await Lottery.deployed();
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei("0.12", "ether"),
    });

    const players = await lottery.getplayers({ from: accounts[0] });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("allows multiple players to enter", async () => {
    const lottery = await Lottery.deployed();
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei("0.12", "ether"),
    });

    await lottery.enter({
      from: accounts[1],
      value: web3.utils.toWei("0.12", "ether"),
    });

    await lottery.enter({
      from: accounts[2],
      value: web3.utils.toWei("0.12", "ether"),
    });

    const players = await lottery.getplayers({ from: accounts[0] });
    // console.log(players);
    assert.equal(accounts[0], players[1]);
    assert.equal(accounts[1], players[2]);
    assert.equal(accounts[2], players[3]);
    assert.equal(4, players.length); //4 after running first test(3+1)
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
