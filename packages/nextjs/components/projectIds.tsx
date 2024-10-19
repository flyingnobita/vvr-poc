import { useCallback } from "react";
import { hexToString } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ProjectIds = () => {
  const contractName = "VerifierRegistry";

  const { data: totalProject, isLoading: isTotalProjectLoading } = useScaffoldReadContract({
    contractName: contractName,
    functionName: "getProjectCount",
  });

  const { data: projectIds, isLoading: isProjectIdsLoading } = useScaffoldReadContract({
    contractName: contractName,
    functionName: "getAllProjectIds",
  });

  const convertStringToBytes32 = useCallback((): string[] => {
    if (!projectIds) {
      return [];
    }
    return projectIds.map(id => hexToString(id, { size: 32 }));
  }, [projectIds]);

  return (
    <div className="card card-compact w-64 bg-secondary text-primary-content shadow-xl m-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Project Count</h2>
        <div className="card-actions items-center flex-col gap-1 text-lg">
          <h2 className="font-bold m-0">Total Project count:</h2>
          {isTotalProjectLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p className="m-0">{totalProject ? totalProject.toString() : 0}</p>
          )}
          <h2 className="font-bold m-0">Projects:</h2>
          {isProjectIdsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p className="m-0">{projectIds ? convertStringToBytes32().join(", ") : "No projects"}</p>
          )}
        </div>
      </div>
    </div>
  );
};
