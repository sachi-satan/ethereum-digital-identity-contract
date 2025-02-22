// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DigitalIdentity {
    struct Identity {
        string name;
        uint256 birthDate; // UNIX timestamp
        string introduction;
        string email;
        string website;
        bool exists;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(
        address indexed user,
        string name,
        uint256 birthDate,
        string introduction,
        string email,
        string website
    );
    event IdentityUpdated(
        address indexed user,
        string name,
        uint256 birthDate,
        string introduction,
        string email,
        string website
    );

    function registerIdentity(
        string memory _name,
        uint256 _birthDate,
        string memory _introduction,
        string memory _email,
        string memory _website
    ) external {
        require(!identities[msg.sender].exists, "Identity already registered");
        identities[msg.sender] = Identity({
            name: _name,
            birthDate: _birthDate,
            introduction: _introduction,
            email: _email,
            website: _website,
            exists: true
        });
        emit IdentityRegistered(
            msg.sender,
            _name,
            _birthDate,
            _introduction,
            _email,
            _website
        );
    }

    function updateIdentity(
        string memory _name,
        uint256 _birthDate,
        string memory _introduction,
        string memory _email,
        string memory _website
    ) external {
        require(identities[msg.sender].exists, "Identity not registered");
        identities[msg.sender] = Identity({
            name: _name,
            birthDate: _birthDate,
            introduction: _introduction,
            email: _email,
            website: _website,
            exists: true
        });
        emit IdentityUpdated(
            msg.sender,
            _name,
            _birthDate,
            _introduction,
            _email,
            _website
        );
    }

    function getMyIdentity()
        external
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        require(identities[msg.sender].exists, "Identity not registered");
        Identity memory id = identities[msg.sender];
        return (id.name, id.birthDate, id.introduction, id.email, id.website);
    }

    function getIdentityByAddress(
        address user
    )
        external
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        require(
            identities[user].exists,
            "Identity not registered for this address"
        );
        Identity memory id = identities[user];
        return (id.name, id.birthDate, id.introduction, id.email, id.website);
    }
}
