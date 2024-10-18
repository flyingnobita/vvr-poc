//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";

// For managing all the structs, using "Mapped Structs with Index"
// pattern from: https://ethereum.stackexchange.com/a/13168

contract VerifierRegistry {
  // store Project attributes
  // TODO: store other project attributes offchain to save gas. e.g. description, team, repo, website
  struct Project {
    bytes32 projectId; // unique project id TODO: redundant for debug, remove later
    address owner; // project owner
    bool isProject;
    mapping(address => Verifier) verifiers;
    address[] verifierAddresses;
  }

  // mapping to store project indexed by projectId
  mapping(bytes32 => Project) public projectStructs;
  // array to store all projectIds
  bytes32[] public projectsIds;
  // TODO: do we need count of active projectIds?
  // uint256 public activeProjectCount;

  // Represent a Verifier
  // TODO: store other Verifier attributes offchain to save gas. e.g. name, description
  struct Verifier {
    address verifierAddress; // TODO: redundant for debug, to be remove
    bool isVerifier;
    mapping(address => Validator) validators;
    address[] validatorAddresses;
    uint256 validateCorrectlyCount; // sum of all validations that were correct
    uint256 validateIncorrectlyCount; // sum of all validations that were incorrect
  }

  // Represent a Validator
  struct Validator {
    address validatorAddress; // TODO: redundant for debug, to be remove
    bool isValidator;
    Validation[] validations; // validators can validate each verifier multiple times
  }

  // Represent a Validation
  // TODO: a gas efficient way to store validation comments
  struct Validation {
    bool validatedCorrect;
    uint256 validationTimestamp;
  }

  // mapping to store validator indexed by validator address
  mapping(address => Validator) public validatorStructs;
  // array to store all validator addresses
  address[] public validatorAddresses;

  // function to check if project exists
  function projectExists(
    bytes32 projectId
  ) public view returns (bool) {
    return projectStructs[projectId].isProject;
  }

  // function to get number of projects
  // TODO: do we need to store length as variable to save gas?
  function getProjectCount() public view returns (uint256) {
    return projectsIds.length;
  }

  // function to get all projectIds
  function getAllProjectIds() public view returns (bytes32[] memory) {
    return projectsIds;
  }

  // function to submit a new project and verifier
  function newProject(
    bytes32 projectId
  )
    // address verifierAddress
    public
    returns (uint256 projectIndex)
  {
    // check if projectId is not empty
    require(projectId != bytes32(0), "ProjectId is empty");

    // check if project already exists
    require(!projectExists(projectId), "Project already exists");

    // create and initialize new project
    Project storage newProject_ = projectStructs[projectId];
    newProject_.projectId = projectId;
    newProject_.owner = msg.sender;
    newProject_.isProject = true;
    projectsIds.push(projectId);

    // return index of new project
    return projectsIds.length - 1;
  }

  // function to get project owner
  function getProjectOwner(
    bytes32 projectId
  ) public view returns (address) {
    return projectStructs[projectId].owner;
  }

  // function to update project owner
  function transferProjectOwnership(
    bytes32 projectId,
    address newOwner
  ) public returns (bool) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    Project storage project_ = projectStructs[projectId];

    // check if caller is owner of project
    require(project_.owner == msg.sender, "Caller is not owner of project");

    // check if newOwner is valid
    require(newOwner != address(0), "New owner is invalid");

    // check if newOwner is not already the owner of the project
    require(
      project_.owner != newOwner,
      "New owner is already the owner of the project"
    );

    project_.owner = newOwner;

    return project_.owner == newOwner;
  }

  // function to disable project (soft delete)
  // TODO: do we need hard delete?
  function disableProject(
    bytes32 projectId
  ) public returns (bool) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    Project storage project_ = projectStructs[projectId];

    // check if caller is owner of project
    require(project_.owner == msg.sender, "Caller is not owner of project");

    // check if project is active
    require(project_.isProject, "Project is not active");

    // disable project
    project_.isProject = false;

    return project_.isProject == false;
  }

  // function to enable project
  function enableProject(
    bytes32 projectId
  ) public returns (bool) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    Project storage project_ = projectStructs[projectId];

    // check if caller is owner of project
    require(project_.owner == msg.sender, "Caller is not owner of project");

    // check if project is disabled
    require(!project_.isProject, "Project is disabled");

    // enable project
    project_.isProject = true;

    return project_.isProject;
  }

  // function to submit a verifier to existing project
  function submitVerifier(
    bytes32 projectId,
    address verifierAddress
  ) public returns (uint256 verifierCount) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    Project storage project_ = projectStructs[projectId];

    // check if caller is owner of project
    require(project_.owner == msg.sender, "Caller is not owner of project");

    // check if verifier address is valid
    require(verifierAddress != address(0), "Verifier address is invalid");

    Verifier storage verifier_ = project_.verifiers[verifierAddress];

    // check if verifier already exists
    require(verifier_.verifierAddress == address(0), "Verifier already exists");

    // initialize verifier
    verifier_.verifierAddress = verifierAddress;
    verifier_.isVerifier = true;
    verifier_.validatorAddresses = new address[](0);
    verifier_.validateCorrectlyCount = 0;
    verifier_.validateIncorrectlyCount = 0;

    // add verifier to project
    project_.verifierAddresses.push(verifierAddress);

    // return number of verifiers for projects
    return project_.verifierAddresses.length;
  }

  // function to check if verifier exists for project
  function verifierExistsForProject(
    bytes32 projectId,
    address verifierAddress
  ) public view returns (bool) {
    return projectStructs[projectId].verifiers[verifierAddress].isVerifier;
  }

  // function to enable verifier for project
  function enableVerifierForProject(
    bytes32 projectId,
    address verifierAddress
  ) public returns (bool) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    // check if verifier exists
    require(
      verifierExistsForProject(projectId, verifierAddress),
      "Verifier does not exist"
    );

    Verifier storage verifier_ =
      projectStructs[projectId].verifiers[verifierAddress];

    // check if verifier is already enabled
    require(!verifier_.isVerifier, "Verifier is already enabled");

    // enable verifier
    verifier_.isVerifier = true;

    return verifier_.isVerifier;
  }

  // function to get all verifiers for a project
  function getVerifiers(
    bytes32 projectId
  ) public view returns (address[] memory) {
    return projectStructs[projectId].verifierAddresses;
  }

  // function to get verifier for project
  function getVerifier(
    bytes32 projectId,
    address verifierAddress
  ) public view returns (address, bool, uint256, uint256) {
    Verifier storage verifier =
      projectStructs[projectId].verifiers[verifierAddress];
    return (
      verifier.verifierAddress,
      verifier.isVerifier,
      verifier.validateCorrectlyCount,
      verifier.validateIncorrectlyCount
    );
  }

  // function to get number of verifiers for a project
  function getVerifierCountForProject(
    bytes32 projectId
  ) public view returns (uint256) {
    return projectStructs[projectId].verifierAddresses.length;
  }

  // function to disable verifier from project
  // TODO: do we need hard delete?
  function disableVerifierFromProject(
    bytes32 projectId,
    address verifierAddress
  ) public returns (bool) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    Project storage project_ = projectStructs[projectId];

    // check if caller is owner of project
    require(project_.owner == msg.sender, "Caller is not owner of project");

    // check if verifier exists
    require(
      verifierExistsForProject(projectId, verifierAddress),
      "Verifier does not exist"
    );

    Verifier storage verifier_ = project_.verifiers[verifierAddress];

    // check if verifier is active
    require(verifier_.isVerifier, "Verifier is not active");

    // disable verifier from project (soft delete)
    verifier_.isVerifier = false;

    return verifier_.isVerifier == false;
  }

  // function to add validator for verifier
  function addValidatorForVerifier(
    bytes32 projectId,
    address verifierAddress,
    bool validatedCorrectly
  ) public returns (uint256 validatorCount) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    // check if verifier exists
    require(
      verifierExistsForProject(projectId, verifierAddress),
      "Verifier does not exist"
    );

    Verifier storage verifier_ =
      projectStructs[projectId].verifiers[verifierAddress];

    Validator storage verifierValidator = verifier_.validators[msg.sender];

    // check if sender is already a validator for this verifier
    require(
      verifierValidator.validatorAddress == address(0),
      "You are already a validator for this verifier"
    );

    // add validator to verifier
    verifierValidator.validatorAddress = msg.sender;
    verifierValidator.isValidator = true;
    verifierValidator.validations.push(
      Validation(validatedCorrectly, block.timestamp)
    );
    verifier_.validatorAddresses.push(msg.sender);

    // update validator count for verifier
    // TODO: to review if this is needed
    if (validatedCorrectly) {
      verifier_.validateCorrectlyCount++;
    } else {
      verifier_.validateIncorrectlyCount++;
    }

    // TODO: we don't need this
    // check if sender is already a validator, create new validator if not
    // Validator storage validator_ = validatorStructs[msg.sender];
    // if (!validator_.isValidator) {
    //   validator_.validatorAddress = msg.sender;
    //   validator_.isValidator = true;
    //   validatorAddresses.push(msg.sender);
    // }
    // add validation to validator
    // validator_.validations[verifierAddress] =
    //   Validation(validatedCorrectly, block.timestamp);
    // validator_.verifierAddresses.push(verifierAddress);

    // return number of validators for verifier
    return verifier_.validatorAddresses.length;
  }

  // function to get validators and their validations for verifier
  // TODO: add validations for verifier
  function getValidatorsForVerifier(
    bytes32 projectId,
    address verifierAddress
  ) public view returns (address[] memory, bool[] memory) {
    // check if project exists
    require(projectExists(projectId), "Project does not exist");

    // check if verifier exists
    require(
      verifierExistsForProject(projectId, verifierAddress),
      "Verifier does not exist"
    );

    Verifier storage verifier_ =
      projectStructs[projectId].verifiers[verifierAddress];

    // declare temporary variables to be returned
    address[] memory validatorAddresses_ =
      new address[](verifier_.validatorAddresses.length);
    bool[] memory validatedCorrectly_ =
      new bool[](verifier_.validatorAddresses.length);

    // loop through verifier's validators and get their validations
    for (uint256 i = 0; i < verifier_.validatorAddresses.length; i++) {
      if (
        verifier_.isVerifier
          && verifier_.validators[verifier_.validatorAddresses[i]].isValidator
      ) {
        for (
          uint256 j = 0;
          j
            < verifier_.validators[verifier_.validatorAddresses[i]]
              .validations
              .length;
          j++
        ) {
          validatorAddresses_[i] = verifier_.validatorAddresses[i];
          if (
            verifier_.validators[verifier_.validatorAddresses[i]].validations[j]
              .validatedCorrect
          ) {
            validatedCorrectly_[i] = true;
          } else {
            validatedCorrectly_[i] = false;
          }
        }
      }
    }

    return (validatorAddresses_, validatedCorrectly_);
  }
}
