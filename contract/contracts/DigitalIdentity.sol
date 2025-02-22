// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DigitalIdentity {
    struct Identity {
        string name;
        uint256 age;
        string documentHash;
        bool exists;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address indexed user, string name, uint256 age);
    event IdentityUpdated(address indexed user, string name, uint256 age);

    function registerIdentity(
        string memory _name,
        uint256 _age,
        string memory _documentHash
    ) external {
        require(!identities[msg.sender].exists, "Identity already registered");
        identities[msg.sender] = Identity({
            name: _name,
            age: _age,
            documentHash: _documentHash,
            exists: true
        });
        emit IdentityRegistered(msg.sender, _name, _age);
    }

    function updateIdentity(
        string memory _name,
        uint256 _age,
        string memory _documentHash
    ) external {
        require(identities[msg.sender].exists, "Identity not registered");
        identities[msg.sender] = Identity({
            name: _name,
            age: _age,
            documentHash: _documentHash,
            exists: true
        });
        emit IdentityUpdated(msg.sender, _name, _age);
    }

    function getMyIdentity()
        external
        view
        returns (string memory, uint256, string memory)
    {
        require(identities[msg.sender].exists, "Identity not registered");
        Identity memory id = identities[msg.sender];
        return (id.name, id.age, id.documentHash);
    }

    function getIdentityByAddress(
        address user
    ) external view returns (string memory, uint256, string memory) {
        require(
            identities[user].exists,
            "Identity not registered for this address"
        );
        Identity memory id = identities[user];
        return (id.name, id.age, id.documentHash);
    }
}
