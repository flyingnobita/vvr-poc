/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    VerifierRegistry: {
      address: "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35",
      abi: [
        {
          type: "function",
          name: "addValidatorForVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "validatedCorrectly",
              type: "bool",
              internalType: "bool",
            },
          ],
          outputs: [
            {
              name: "validatorCount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "disableProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "disableVerifierFromProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enableProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enableVerifierForProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getAllProjectIds",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getProjectCount",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getProjectOwner",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getValidatorsForVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "",
              type: "bool[]",
              internalType: "bool[]",
            },
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getVerifierCountForProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getVerifiers",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "address[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "newProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "projectIndex",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "projectExists",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "projectStructs",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "isProject",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "projectsIds",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "submitVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "verifierCount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferProjectOwnership",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "validatorAddresses",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "validatorStructs",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "validatorAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "isValidator",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "verifierExistsForProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155111: {
    VerifierRegistry: {
      address: "0x13CE0000AD615aaB5de1E7F7d2D6F9a5A6fA6922",
      abi: [
        {
          type: "function",
          name: "addValidatorForVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "validatedCorrectly",
              type: "bool",
              internalType: "bool",
            },
          ],
          outputs: [
            {
              name: "validatorCount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "disableProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "disableVerifierFromProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enableProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enableVerifierForProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getAllProjectIds",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32[]",
              internalType: "bytes32[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getProjectCount",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getProjectOwner",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getValidatorsForVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "",
              type: "bool[]",
              internalType: "bool[]",
            },
            {
              name: "",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getVerifierCountForProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getVerifiers",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "address[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "newProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "projectIndex",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "projectExists",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "projectStructs",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "isProject",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "projectsIds",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "submitVerifier",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "verifierCount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferProjectOwnership",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "validatorAddresses",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "validatorStructs",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "validatorAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "isValidator",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "verifierExistsForProject",
          inputs: [
            {
              name: "projectId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "verifierAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
