// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DigitalIdentityModule = buildModule("DigitalIdentityModule", (m) => {
  const digitalIdentity = m.contract("DigitalIdentity", []);

  return { digitalIdentity };
});

export default DigitalIdentityModule;
