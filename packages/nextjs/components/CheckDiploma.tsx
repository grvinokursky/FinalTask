import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface Dipmola {
  graduateName: string;
  degree: string;
  graduationYear: bigint;
  issuedTo: string;
  isValid: boolean;
}

/**
 * Компонент для проверки диплома в смарт-контракте DiplomaRegistry
 */
const CheckDiploma = () => {
  const [diplomaId, setDiplomaId] = useState("");
  const [diplomaData, setDiplomaData] = useState<Dipmola | null>(null);

  const { data: diploma } = useScaffoldReadContract({
    contractName: "DiplomaRegistry",
    functionName: "verifyDiploma",
    args: [diplomaId],
  });

  const handleCheck = async () => {
    try {
      setDiplomaData(diploma ? diploma : null);
    } catch (error) {
      console.error("Ошибка проверки диплома:", error);
      alert("Диплом не найден или произошла ошибка.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Проверка диплома</h2>
      <input
        type="text"
        placeholder="Diploma ID"
        value={diplomaId}
        onChange={e => setDiplomaId(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-green-300"
      />
      <button
        onClick={handleCheck}
        className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
      >
        Проверить диплом
      </button>
      {diplomaData && (
        <div className="mt-4 p-4 bg-gray-900 rounded">
          <p>
            <strong>Имя выпускника:</strong> {diplomaData.graduateName}
          </p>
          <p>
            <strong>Степень:</strong> {diplomaData.degree}
          </p>
          <p>
            <strong>Год выпуска:</strong> {diplomaData.graduationYear.toString()}
          </p>
          <p>
            <strong>Статус:</strong> {diplomaData.isValid ? "Действителен" : "Аннулирован"}
          </p>
        </div>
      )}
    </div>
  );
};

export { CheckDiploma };
