//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./DeployHelpers.s.sol";
import { DeployVerifierRegistry } from "./DeployVerifierRegistry.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  function run() external {
    DeployVerifierRegistry deployVerifierRegistry = new DeployVerifierRegistry();
    deployVerifierRegistry.run();
  }
}
