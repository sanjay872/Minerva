const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("MinervaModule", (m) => {

  const minerva = m.contract("Minerva");

  
  return { minerva };
});
