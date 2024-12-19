import React, { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

/**
 * Компонент для регистрации диплома в смарт-контракте DiplomaRegistry
 */
const RegisterDiploma = () => {
  const [diplomaId, setDiplomaId] = useState("");
  const [graduateName, setGraduateName] = useState("");
  const [degree, setDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [issuedTo, setIssuedTo] = useState("");

  // Хук для вызова функции смарт-контракта
  const { writeContractAsync: registerDiploma } = useScaffoldWriteContract({
    contractName: "DiplomaRegistry",
    chainId: 31337,
  });

  const handleRegister = async () => {
    try {
      await registerDiploma({
        functionName: "registerDiploma",
        args: [diplomaId, graduateName, degree, BigInt(graduationYear), issuedTo],
      });
      alert("Диплом успешно зарегистрирован!");
    } catch (error) {
      console.error("Ошибка регистрации диплома:", error);
      alert("Ошибка регистрации диплома.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Регистрация диплома</h2>
      <input
        type="text"
        placeholder="Diploma ID"
        value={diplomaId}
        onChange={e => setDiplomaId(e.target.value)}
        className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        placeholder="Graduate Name"
        value={graduateName}
        onChange={e => setGraduateName(e.target.value)}
        className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        placeholder="Degree"
        value={degree}
        onChange={e => setDegree(e.target.value)}
        className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="number"
        placeholder="Graduation Year"
        value={graduationYear}
        onChange={e => setGraduationYear(e.target.value)}
        className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        placeholder="Issued To Address"
        value={issuedTo}
        onChange={e => setIssuedTo(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={handleRegister}
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Зарегистрировать диплом
      </button>
    </div>
  );
};

export default RegisterDiploma;
