import { useState } from "react";
import { stringToHex } from "viem";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const AddProjectButton: React.FC = () => {
  const [newProjectId, setNewProjectId] = useState<string>("");
  const contractName = "VerifierRegistry";

  const { writeContractAsync: newProjectAsync } = useScaffoldWriteContract(contractName);

  return (
    <div className="mt-8 flex justify-center">
      <InputBase name="newProjectId" placeholder="Project ID" value={newProjectId} onChange={setNewProjectId} />
      <button
        className="btn btn-primary"
        onClick={async () => {
          try {
            await newProjectAsync({
              functionName: "newProject",
              args: [stringToHex(newProjectId, { size: 32 })],
            });
          } catch (e) {
            console.error("Error creating new project:", e);
          }
        }}
      >
        New Project
      </button>
    </div>
  );
};
