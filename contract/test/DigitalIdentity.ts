import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("DigitalIdentity", function () {
  async function deployDigitalIdentityFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const DigitalIdentity = await hre.ethers.getContractFactory(
      "DigitalIdentity"
    );
    const digitalIdentity = await DigitalIdentity.deploy();

    return { digitalIdentity, owner, otherAccount };
  }

  describe("Registration", function () {
    it("Should register a new identity", async function () {
      const { digitalIdentity, owner } = await loadFixture(
        deployDigitalIdentityFixture
      );
      const name = "John Doe";
      const age = 30;
      const documentHash = "QmHash123";

      await expect(digitalIdentity.registerIdentity(name, age, documentHash))
        .to.emit(digitalIdentity, "IdentityRegistered")
        .withArgs(owner.address, name, age);

      const identity = await digitalIdentity.getMyIdentity();
      expect(identity[0]).to.equal(name);
      expect(identity[1]).to.equal(age);
      expect(identity[2]).to.equal(documentHash);
    });

    it("Should fail to register if already registered", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await digitalIdentity.registerIdentity("John Doe", 30, "QmHash123");

      await expect(
        digitalIdentity.registerIdentity("Jane Doe", 25, "QmHash456")
      ).to.be.revertedWith("Identity already registered");
    });
  });

  describe("Update", function () {
    it("Should update an existing identity", async function () {
      const { digitalIdentity, owner } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await digitalIdentity.registerIdentity("John Doe", 30, "QmHash123");

      const newName = "John Smith";
      const newAge = 31;
      const newHash = "QmHash456";

      await expect(digitalIdentity.updateIdentity(newName, newAge, newHash))
        .to.emit(digitalIdentity, "IdentityUpdated")
        .withArgs(owner.address, newName, newAge);

      const identity = await digitalIdentity.getMyIdentity();
      expect(identity[0]).to.equal(newName);
      expect(identity[1]).to.equal(newAge);
      expect(identity[2]).to.equal(newHash);
    });

    it("Should fail to update if not registered", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await expect(
        digitalIdentity.updateIdentity("John Doe", 30, "QmHash123")
      ).to.be.revertedWith("Identity not registered");
    });
  });

  describe("Retrieval", function () {
    it("Should retrieve own identity", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );
      const name = "John Doe";
      const age = 30;
      const documentHash = "QmHash123";

      await digitalIdentity.registerIdentity(name, age, documentHash);

      const identity = await digitalIdentity.getMyIdentity();
      expect(identity[0]).to.equal(name);
      expect(identity[1]).to.equal(age);
      expect(identity[2]).to.equal(documentHash);
    });

    it("Should retrieve identity by address", async function () {
      const { digitalIdentity, owner } = await loadFixture(
        deployDigitalIdentityFixture
      );
      const name = "John Doe";
      const age = 30;
      const documentHash = "QmHash123";

      await digitalIdentity.registerIdentity(name, age, documentHash);

      const identity = await digitalIdentity.getIdentityByAddress(
        owner.address
      );
      expect(identity[0]).to.equal(name);
      expect(identity[1]).to.equal(age);
      expect(identity[2]).to.equal(documentHash);
    });

    it("Should fail to retrieve non-existent identity", async function () {
      const { digitalIdentity, otherAccount } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await expect(
        digitalIdentity.getIdentityByAddress(otherAccount.address)
      ).to.be.revertedWith("Identity not registered for this address");
    });

    it("Should fail to retrieve own identity if not registered", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await expect(digitalIdentity.getMyIdentity()).to.be.revertedWith(
        "Identity not registered"
      );
    });
  });
});
