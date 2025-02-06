// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message; // State variable to store a message

    // Constructor to initialize the contract with a message
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    // Function to update the message
    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}