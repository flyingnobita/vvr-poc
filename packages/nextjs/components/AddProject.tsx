import { useState } from "react";
import { stringToHex } from "viem";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const AddProject: React.FC = () => {
  const [newProjectId, setNewProjectId] = useState<string>("");
  const contractName = "VerifierRegistry";

  const { writeContractAsync: newProjectAsync } = useScaffoldWriteContract(contractName);

  return (
    <div className="mt-8 flex justify-center">
      <div className="bg-base-100 rounded-box p-5 max-w-md w-full">
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <InputBase
              name="newProjectId"
              placeholder="Project ID (≤ 32 chars)"
              value={newProjectId}
              onChange={setNewProjectId}
            />
          </div>
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
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};
