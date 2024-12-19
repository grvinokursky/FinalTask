import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

/**
 * Компонент для аннулирования диплома в смарт-контракте DiplomaRegistry
 */
const RevokeDiploma = () => {
  const [diplomaId, setDiplomaId] = useState("");

  // Хук для вызова функции аннулирования диплома
  const { writeContractAsync: revokeDiploma } = useScaffoldWriteContract({
    contractName: "DiplomaRegistry",
    chainId: 31337,
  });

  const handleRevoke = async () => {
    try {
      await revokeDiploma({
        functionName: "revokeDiploma",
        args: [diplomaId],
      });
      alert("Диплом успешно аннулирован!");
    } catch (error) {
      console.error("Ошибка аннулирования диплома:", error);
      alert("Ошибка аннулирования диплома.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Аннулирование диплома</h2>
      <input
        type="text"
        placeholder="Diploma ID"
        value={diplomaId}
        onChange={e => setDiplomaId(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-red-300"
      />
      <button
        onClick={handleRevoke}
        className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Аннулировать диплом
      </button>
    </div>
  );
};

export default RevokeDiploma;
