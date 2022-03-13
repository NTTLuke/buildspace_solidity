// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    uint256 private seed;

    event NewWave(
        address indexed from,
        uint256 timestamp,
        string message,
        bool isWinner
    );

    struct Wave {
        address from;
        string message;
        uint256 timestamp;
        bool isWinner;
    }

    Wave[] waves;
    
    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("I am SMART CONTRACT. POG.");

        //set initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function testTotalWaves() public view returns (uint256) {
        return totalWaves;
    }

    function wave(string memory _message) public {
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastWavedAt[msg.sender] + 15 seconds < block.timestamp,
            "Wait 15secs before waving again!"
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        seed = (seed + block.difficulty + seed) % 100;
        console.log("Radom seed generated: %d", seed);

        //50 percent of win
        bool winner = (seed <= 50);
        if (winner) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            //send money to the wave sender contract address
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        /*
         * This is where I actually store the wave data in the array.
         */
        waves.push(Wave(msg.sender, _message, block.timestamp, winner));

        emit NewWave(msg.sender, block.timestamp, _message, winner);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total waves: %s", totalWaves);
        return totalWaves;
    }
}
