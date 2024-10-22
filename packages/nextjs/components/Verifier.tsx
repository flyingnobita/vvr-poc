import { useEffect, useState } from "react";
import AddValidator from "./AddValidator";
import ValidatorsList from "./ValidatorsList";
import { stringToHex } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface VerifierData {
  verifierAddress: string;
  isVerifier: boolean;
  validateCorrectlyCount: number;
  validateIncorrectlyCount: number;
}

interface VerifiersProps {
  projectId: string;
  verifierAddress: string;
}

const Verifier: React.FC<VerifiersProps> = ({ projectId, verifierAddress }) => {
  const [verifierData, setVerifierData] = useState<VerifierData | null>(null);
  const contractName = "VerifierRegistry";

  const { data, isLoading, isError } = useScaffoldReadContract({
    contractName: contractName,
    functionName: "getVerifier",
    args: [stringToHex(projectId, { size: 32 }), verifierAddress],
  });

  useEffect(() => {
    if (data) {
      setVerifierData({
        verifierAddress: data[0],
        isVerifier: data[1],
        validateCorrectlyCount: Number(data[2]),
        validateIncorrectlyCount: Number(data[3]),
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading verifier data...</div>;
  if (isError) return <div>Error fetching verifier data</div>;

  return (
    <div className="bg-base-200 shadow-xl rounded-box p-6">
      {verifierData ? (
        <>
          <table className="table w-full">
            <thead>
              <tr className="border-none">
                <th>Verifier Address</th>
                <th>Validations</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-none">
                <td>
                  <Address address={verifierData.verifierAddress} />
                </td>
                <td>
                  🟢 {verifierData.validateCorrectlyCount || 0} | 🔴 {verifierData.validateIncorrectlyCount || 0}
                </td>
              </tr>
            </tbody>
          </table>
          <ValidatorsList projectId={projectId} verifierAddress={verifierAddress} />
        </>
      ) : (
        <p>No verifier data found for this project.</p>
      )}

      <div className="mt-4 p-2 bg-base-100 rounded-box">
        <AddValidator projectId={projectId} verifierAddress={verifierAddress} />
      </div>
    </div>
  );
};

export default Verifier;
