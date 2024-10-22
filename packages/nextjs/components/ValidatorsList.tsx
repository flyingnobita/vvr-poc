import { useEffect, useState } from "react";
import { Address } from "./scaffold-eth";
import { stringToHex } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const ValidatorsList = ({ projectId, verifierAddress }: { projectId: string; verifierAddress: string }) => {
  const contractName = "VerifierRegistry";

  const [validators, setValidators] = useState<string[]>([]);
  const [validations, setValidations] = useState<boolean[]>([]);
  const [validationTimestamps, setValidationTimestamps] = useState<number[]>([]);

  const {
    data: validatorData,
    isLoading: validatorLoading,
    error: validatorError,
  } = useScaffoldReadContract({
    contractName: contractName,
    functionName: "getValidatorsForVerifier",
    args: [stringToHex(projectId, { size: 32 }), verifierAddress],
  });

  useEffect(() => {
    if (validatorData) {
      setValidators(validatorData[0] as string[]);
      setValidations(validatorData[1] as boolean[]);
      setValidationTimestamps(validatorData[2].map(timestamp => Number(timestamp)));
    }
  }, [validatorData]);

  const convertTimestampToUTC = (timestamp: number) => {
    return new Date(timestamp * 1000).toUTCString();
  };

  if (validatorLoading) return <div>Loading...</div>;
  if (validatorError) return <div>Error fetching validators</div>;

  return (
    <div>
      <details className="mt-2">
        <summary className="text-xl font-semibold mb-2 cursor-pointer">Validators</summary>
        {validators.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr className="border-none">
                <th>Validator Address</th>
                <th>Timestamp (UTC)</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {validators.map((validator, index) => (
                <tr className="border-none" key={validator}>
                  <td>
                    <Address address={validator} />
                  </td>
                  <td>{convertTimestampToUTC(validationTimestamps[index])}</td>
                  <td>{validations[index] ? "🟢" : "🔴"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-2">No Validators</div>
        )}
      </details>
    </div>
  );
};

export default ValidatorsList;
