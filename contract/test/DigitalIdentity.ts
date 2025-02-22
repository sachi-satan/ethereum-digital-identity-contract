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
      const birthDate = 946684800; // January 1, 2000
      const introduction = "Hello, I'm John!";
      const email = "john.doe@example.com";
      const website = "example.com";

      await expect(
        digitalIdentity.registerIdentity(
          name,
          birthDate,
          introduction,
          email,
          website
        )
      )
        .to.emit(digitalIdentity, "IdentityRegistered")
        .withArgs(owner.address, name, birthDate, introduction, email, website);

      const [
        retrievedName,
        retrievedBirthDate,
        retrievedIntroduction,
        retrievedEmail,
        retrievedWebsite,
      ] = await digitalIdentity.getMyIdentity();
      expect(retrievedName).to.equal(name);
      expect(retrievedBirthDate).to.equal(birthDate);
      expect(retrievedIntroduction).to.equal(introduction);
      expect(retrievedEmail).to.equal(email);
      expect(retrievedWebsite).to.equal(website);
    });

    it("Should fail to register if already registered", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await digitalIdentity.registerIdentity(
        "John Doe",
        946684800,
        "Hello",
        "john@example.com",
        "example.com"
      );

      await expect(
        digitalIdentity.registerIdentity(
          "Jane Doe",
          978307200,
          "Hi",
          "jane@example.com",
          "example.com"
        )
      ).to.be.revertedWith("Identity already registered");
    });
  });

  describe("Update", function () {
    it("Should update an existing identity", async function () {
      const { digitalIdentity, owner } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await digitalIdentity.registerIdentity(
        "John Doe",
        946684800,
        "Hello",
        "john@example.com",
        "example.com"
      );

      const newName = "John Smith";
      const newBirthDate = 978307200;
      const newIntroduction = "Hi, I'm John Smith!";
      const newEmail = "john.smith@example.com";
      const newWebsite = "johnsmith.com";

      await expect(
        digitalIdentity.updateIdentity(
          newName,
          newBirthDate,
          newIntroduction,
          newEmail,
          newWebsite
        )
      )
        .to.emit(digitalIdentity, "IdentityUpdated")
        .withArgs(
          owner.address,
          newName,
          newBirthDate,
          newIntroduction,
          newEmail,
          newWebsite
        );

      const [
        retrievedName,
        retrievedBirthDate,
        retrievedIntroduction,
        retrievedEmail,
        retrievedWebsite,
      ] = await digitalIdentity.getMyIdentity();
      expect(retrievedName).to.equal(newName);
      expect(retrievedBirthDate).to.equal(newBirthDate);
      expect(retrievedIntroduction).to.equal(newIntroduction);
      expect(retrievedEmail).to.equal(newEmail);
      expect(retrievedWebsite).to.equal(newWebsite);
    });

    it("Should fail to update if not registered", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );

      await expect(
        digitalIdentity.updateIdentity(
          "John Doe",
          946684800,
          "Hello",
          "john@example.com",
          "example.com"
        )
      ).to.be.revertedWith("Identity not registered");
    });
  });

  describe("Retrieval", function () {
    it("Should retrieve own identity", async function () {
      const { digitalIdentity } = await loadFixture(
        deployDigitalIdentityFixture
      );
      const name = "John Doe";
      const birthDate = 946684800;
      const introduction = "Hello, I'm John!";
      const email = "john.doe@example.com";
      const website = "example.com";

      await digitalIdentity.registerIdentity(
        name,
        birthDate,
        introduction,
        email,
        website
      );

      const [
        retrievedName,
        retrievedBirthDate,
        retrievedIntroduction,
        retrievedEmail,
        retrievedWebsite,
      ] = await digitalIdentity.getMyIdentity();
      expect(retrievedName).to.equal(name);
      expect(retrievedBirthDate).to.equal(birthDate);
      expect(retrievedIntroduction).to.equal(introduction);
      expect(retrievedEmail).to.equal(email);
      expect(retrievedWebsite).to.equal(website);
    });

    it("Should retrieve identity by address", async function () {
      const { digitalIdentity, owner } = await loadFixture(
        deployDigitalIdentityFixture
      );
      const name = "John Doe";
      const birthDate = 946684800;
      const introduction = "Hello, I'm John!";
      const email = "john.doe@example.com";
      const website = "example.com";

      await digitalIdentity.registerIdentity(
        name,
        birthDate,
        introduction,
        email,
        website
      );

      const [
        retrievedName,
        retrievedBirthDate,
        retrievedIntroduction,
        retrievedEmail,
        retrievedWebsite,
      ] = await digitalIdentity.getIdentityByAddress(owner.address);
      expect(retrievedName).to.equal(name);
      expect(retrievedBirthDate).to.equal(birthDate);
      expect(retrievedIntroduction).to.equal(introduction);
      expect(retrievedEmail).to.equal(email);
      expect(retrievedWebsite).to.equal(website);
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
