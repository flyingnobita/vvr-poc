import React from "react";
import AddVerifier from "./AddVerifier";
import Verifier from "./Verifier";
import { stringToHex } from "viem";
import { VERIFIER_REGISTRY_CONTRACT_NAME } from "~~/constants/contracts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface ProjectVerifiersProps {
  projectId: string;
}

const ProjectVerifiers: React.FC<ProjectVerifiersProps> = ({ projectId }) => {
  const {
    data: verifiers,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: VERIFIER_REGISTRY_CONTRACT_NAME,
    functionName: "getVerifiers",
    args: [stringToHex(projectId, { size: 32 })],
  });

  const [isExpanded, setIsExpanded] = React.useState(false);

  if (isLoading) return <div>Loading verifiers...</div>;
  if (error) return <div>Error loading verifiers: {error.message}</div>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center focus:outline-none">
          <span>{isExpanded ? "▼" : "▶"}</span>
          <span className="ml-2">Verifiers</span>
        </button>
      </h3>
      {isExpanded && (
        <div className="mt-2">
          {verifiers && verifiers.length > 0 ? (
            <div className="space-y-4">
              {verifiers.map((verifierAddress, index) => (
                <Verifier key={index} projectId={projectId} verifierAddress={verifierAddress} />
              ))}
            </div>
          ) : (
            <p>No verifiers found for this project.</p>
          )}
          <AddVerifier projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export default ProjectVerifiers;
