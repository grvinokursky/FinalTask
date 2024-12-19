import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployDiplomaRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("DiplomaRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const diplomaRegistryContract = await hre.ethers.getContract<Contract>("DiplomaRegistry", deployer);
  console.log("👋 Initial greeting:", await diplomaRegistryContract.greeting());
};

export default deployDiplomaRegistry;
deployDiplomaRegistry.tags = ["DiplomaRegistry"];
