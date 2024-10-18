//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "../contracts/VerifierRegistry.sol";
import "./DeployHelpers.s.sol";

contract DeployVerifierRegistry is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    VerifierRegistry yourContract = new VerifierRegistry();
    console.logString(
      string.concat(
        "VerifierRegistry deployed at: ", vm.toString(address(yourContract))
      )
    );
  }
}
