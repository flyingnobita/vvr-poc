import React from "react";
import { stringToHex } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface ProjectProps {
  projectId: string;
}

// interface ProjectData {
//   owner: string;
//   verifierAddresses: string[];
// }

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
      <h2 className="text-2xl font-bold mb-4">Project {projectId}</h2>
      <p className="mb-2">Owner: {projectOwner}</p>
      {/* <div className="mb-2">
        <h3 className="text-lg font-semibold">Verifier Addresses:</h3>
        <ul className="list-disc list-inside pl-4">
          {project.verifierAddresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Project;
