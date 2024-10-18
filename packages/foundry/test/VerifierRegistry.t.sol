//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Test } from "forge-std/Test.sol";
import "forge-std/console.sol";

import "../contracts/VerifierRegistry.sol";

contract VerifierRegistryTest is Test {
  VerifierRegistry public verifierRegistry;

  address project1Owner = address(this);
  address project1NewOwner = makeAddr("project1NewOwner");
  address project2Owner = makeAddr("project2Owner");
  address project1Verifier1 = makeAddr("project1Verifier1");
  address project1Verifier2 = makeAddr("project1Verifier2");
  address project1Verifier1Validator1 = makeAddr("project1Verifier1Validator1");
  address project1Verifier1Validator2 = makeAddr("project1Verifier1Validator2");

  function setUp() public {
    verifierRegistry = new VerifierRegistry();

    vm.deal(project2Owner, 100 ether);
    vm.deal(project1Verifier1Validator1, 100 ether);
    vm.deal(project1Verifier1Validator2, 100 ether);
  }

  function test_newProject() public {
    bytes32 projectId = "project1";
    uint256 projectIndex = verifierRegistry.newProject(projectId);

    require(projectIndex == 0);
    require(verifierRegistry.projectExists(projectId) == true);
    require(verifierRegistry.projectExists("projectNotExists") == false);

    // Check that the project owner is set correctly
    require(
      verifierRegistry.getProjectOwner(projectId) == address(project1Owner)
    );
  }

  function test_transferProjectOwnership() public {
    bytes32 projectId = "project1";
    uint256 projectIndex = verifierRegistry.newProject(projectId);

    verifierRegistry.transferProjectOwnership(projectId, project1NewOwner);
    require(
      verifierRegistry.getProjectOwner(projectId) == address(project1NewOwner)
    );
  }

  function test_submitVerifier() public {
    bytes32 projectId = "project1";
    uint256 projectIndex = verifierRegistry.newProject(projectId);

    verifierRegistry.submitVerifier(projectId, project1Verifier1);

    (
      address verifier,
      bool isVerifier,
      uint256 validateCorrectlyCount,
      uint256 validateIncorrectlyCount
    ) = verifierRegistry.getVerifier(projectId, project1Verifier1);
    require(verifier == project1Verifier1);
    require(isVerifier == true);
    require(validateCorrectlyCount == 0);
    require(validateIncorrectlyCount == 0);

    uint256 verifierCount =
      verifierRegistry.submitVerifier(projectId, project1Verifier2);
    require(verifierCount == 2);

    (verifier, isVerifier, validateCorrectlyCount, validateIncorrectlyCount) =
      verifierRegistry.getVerifier(projectId, project1Verifier2);
    require(verifier == project1Verifier2);
    require(isVerifier == true);
    require(validateCorrectlyCount == 0);
    require(validateIncorrectlyCount == 0);

    require(verifierRegistry.getVerifierCountForProject(projectId) == 2);
  }

  function test_addValidatorForVerifier() public {
    bytes32 projectId = "project1";
    uint256 projectIndex = verifierRegistry.newProject(projectId);

    uint256 verifierCount =
      verifierRegistry.submitVerifier(projectId, project1Verifier1);

    // add validator for verifier
    vm.prank(project1Verifier1Validator1);
    verifierRegistry.addValidatorForVerifier(projectId, project1Verifier1, true);

    vm.prank(project1Verifier1Validator2);
    verifierRegistry.addValidatorForVerifier(
      projectId, project1Verifier1, false
    );

    (address[] memory validators, bool[] memory validations) =
      verifierRegistry.getValidatorsForVerifier(projectId, project1Verifier1);

    require(validators.length == 2);
    require(validations.length == 2);
    require(validators[0] == project1Verifier1Validator1);
    require(validations[0] == true);
    require(validators[1] == project1Verifier1Validator2);
    require(validations[1] == false);
  }
}
