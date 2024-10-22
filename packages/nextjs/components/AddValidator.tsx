import { useCallback, useState } from "react";
import { stringToHex } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface AddValidatorButtonProps {
  projectId: string;
  verifierAddress: string;
}

const AddValidator: React.FC<AddValidatorButtonProps> = ({ projectId, verifierAddress }) => {
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({});
  const contractName = "VerifierRegistry";

  const { writeContractAsync: addValidatorAsync } = useScaffoldWriteContract(contractName);

  const getKey = useCallback((projectId: string, verifierAddress: string) => {
    return `${projectId}-${verifierAddress}`;
  }, []);

  const getValidationResult = useCallback(
    (projectId: string, verifierAddress: string) => {
      const key = getKey(projectId, verifierAddress);
      return validationResults[key] ?? true;
    },
    [validationResults, getKey],
  );

  const setValidationResult = useCallback(
    (projectId: string, verifierAddress: string, isCorrect: boolean) => {
      const key = getKey(projectId, verifierAddress);
      setValidationResults(prev => ({
        ...prev,
        [key]: isCorrect,
      }));
    },
    [getKey],
  );

  const handleAddValidator = async () => {
    try {
      await addValidatorAsync({
        functionName: "addValidatorForVerifier",
        args: [stringToHex(projectId, { size: 32 }), verifierAddress, getValidationResult(projectId, verifierAddress)],
      });
    } catch (error) {
      console.error("Error adding validator:", error);
    }
  };

  const isValidationCorrect = getValidationResult(projectId, verifierAddress);

  return (
    <div>
      {/* <div className="mt-1"> */}
      {/* <h5 className="text-base font-semibold mb-2">Add Validation</h5> */}
      <details>
        <summary className="collapse-title text-xl font-semibold cursor-pointer">Add Validation</summary>
        <div>
          <div className="mb-4 flex items-center">
            <span className="mr-4 ml-4">Validation Result:</span>
            <label className="label cursor-pointer inline-flex items-center mr-4">
              <input
                type="radio"
                name={`validationResult-${getKey(projectId, verifierAddress)}`}
                checked={isValidationCorrect}
                onChange={() => setValidationResult(projectId, verifierAddress, true)}
                className="radio radio-primary mr-2"
              />
              <span className="label-text">🟢 Correct</span>
            </label>
            <label className="label cursor-pointer inline-flex items-center">
              <input
                type="radio"
                name={`validationResult-${getKey(projectId, verifierAddress)}`}
                checked={!isValidationCorrect}
                onChange={() => setValidationResult(projectId, verifierAddress, false)}
                className="radio radio-primary mr-2"
              />
              <span className="label-text">🔴 Incorrect</span>
            </label>
            <button onClick={handleAddValidator} className="btn btn-primary ml-4">
              Add
            </button>
          </div>
        </div>
      </details>
      {/* </div> */}
    </div>
  );
};

export default AddValidator;
