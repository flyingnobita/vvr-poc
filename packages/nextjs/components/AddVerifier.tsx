import React, { useState } from "react";
import { stringToHex } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface AddVerifierButtonProps {
  projectId: string;
}

const AddVerifier: React.FC<AddVerifierButtonProps> = ({ projectId }) => {
  const [newVerifierAddress, setNewVerifierAddress] = useState("");
  const contractName = "VerifierRegistry";

  const { writeContractAsync: addVerifierAsync } = useScaffoldWriteContract(contractName);

  const handleAddVerifier = async () => {
    if (newVerifierAddress) {
      try {
        await addVerifierAsync({
          functionName: "submitVerifier",
          args: [stringToHex(projectId, { size: 32 }), newVerifierAddress],
        });
      } catch (error) {
        console.error("Error adding verifier:", error);
      }
    }
  };

  return (
    <div className="bg-base-200 shadow-xl rounded-box p-6 mt-4">
      <h3 className="text-lg font-semibold mb-2">Add Verifier</h3>
      <input
        type="text"
        value={newVerifierAddress}
        onChange={e => setNewVerifierAddress(e.target.value)}
        placeholder="Verifier Address"
        className="input input-bordered w-full max-w-xs mr-2"
      />
      <button onClick={handleAddVerifier} className="btn btn-primary">
        Add
      </button>
    </div>
  );
};

export default AddVerifier;
