import React from "react";
import ProjectVerifiers from "./ProjectVerifiers";
import { stringToHex } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface ProjectProps {
  projectId: string;
}

const Project: React.FC<ProjectProps> = ({ projectId }) => {
  const contractName = "VerifierRegistry";

  const {
    data: projectOwner,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: contractName,
    functionName: "getProjectOwner",
    args: [stringToHex(projectId, { size: 32 })],
  });

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (error) {
    return <div>Error loading project: {error.message}</div>;
  }

  if (!projectOwner) {
    return <div>Project not found</div>;
  }

  return (
    <div className="bg-base-100 shadow-xl rounded-box p-6">
      <h2 className="text-2xl font-bold mb-4">{projectId}</h2>

      <table className="table w-full mb-4">
        <thead>
          <tr className="border-none">
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-none">
            <td>
              <Address address={projectOwner} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-col gap-4">
        <ProjectVerifiers projectId={projectId} />
      </div>
    </div>
  );
};

export default Project;
