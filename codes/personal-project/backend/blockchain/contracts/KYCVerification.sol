// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract KYCVerification {
//     // Mapping to store KYC verification status for each user address.
//     mapping(address => bool) public isKYCVerified;

//     // Event emitted when a user's KYC is verified.
//     event KYCVerified(address indexed userAddress);

//     // Allows a user to register their KYC as verified.
//     function registerKYC() public {
//         require(!isKYCVerified[msg.sender], "KYC already verified for this address."); // Ensure KYC isn't already verified.
//         isKYCVerified[msg.sender] = true; // Set the KYC status of the sender to true.
//         emit KYCVerified(msg.sender); // Emit an event indicating successful verification.
//     }

//     // Allows a business to check if a specific user's KYC is verified.
//     function checkKYC(address _userAddress) public view returns (bool) {
//         return isKYCVerified[_userAddress]; // Return the KYC verification status of the given user.
//     }
// }


pragma solidity ^0.8.0;

contract KYCRegistry {
    // Mapping to store the KYC verification status of users.
    // The key is the user's wallet address, and the value is a boolean (true if verified, false otherwise).
    mapping(address => bool) public isKYCVerified;

    // Event emitted when a user's KYC status is updated.
    event KYCStatusUpdated(address indexed userAddress, bool isVerified);

    // Allows a user to register their KYC verification status as 'verified'.
    // Only a user can call this function to verify themselves.
    function registerKYC() public {
        // Set the KYC status of the caller (user) to true.
        isKYCVerified[msg.sender] = true;
        // Emit an event to log the KYC status update.
        emit KYCStatusUpdated(msg.sender, true);
    }

    // Allows a business to check if a specific user's KYC is verified.
    // Any address can call this function to check the KYC status of another user.
    function checkKYCVerification(address _userAddress) public view returns (bool) {
        // Return the KYC verification status of the provided user address.
        return isKYCVerified[_userAddress];
    }
}