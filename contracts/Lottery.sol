// SPDX-License-Identifier: GPL-3.0

pragma solidity  ^0.8.17;

contract Lottery{
    address public manager;
    address[] public players;

    constructor(){
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.1 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(sha256(abi.encode(block.difficulty,block.timestamp,players)));
    }

    function pickupWinner() public onlyManager{
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }
    
}