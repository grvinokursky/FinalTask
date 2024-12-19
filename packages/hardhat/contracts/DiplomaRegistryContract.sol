// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DiplomaRegistry {
    string public greeting = "Building Unstoppable Apps!!!";

    struct Diploma {
        string graduateName; // Имя выпускника
        string degree;       // Специальность или степень
        uint256 graduationYear; // Год выпуска
        address issuedTo;    // Адрес выпускника
        bool isValid;        // Флаг валидности диплома
    }

    mapping(string => Diploma) public diplomas; // Маппинг для хранения дипломов по уникальному ID

    event DiplomaIssued(string diplomaId, address indexed issuedTo); // Событие для записи информации о новом дипломе
    event DiplomaRevoked(string diplomaId, address indexed issuedTo); // Событие для аннулирования диплома

    // Функция для регистрации диплома
    function registerDiploma(
        string calldata _diplomaId,
        string calldata _graduateName,
        string calldata _degree,
        uint256 _graduationYear,
        address _issuedTo
    ) external {
    require(bytes(diplomas[_diplomaId].graduateName).length == 0, "Diploma already registered");

        Diploma memory newDiploma = Diploma({
            graduateName: _graduateName,
            degree: _degree,
            graduationYear: _graduationYear,
            issuedTo: _issuedTo,
            isValid: true
        });
        diplomas[_diplomaId] = newDiploma;

        emit DiplomaIssued(_diplomaId, _issuedTo);
    }

    // Функция для проверки подлинности диплома
    function verifyDiploma(string calldata _diplomaId) external view returns (Diploma memory) {
        require(bytes(diplomas[_diplomaId].graduateName).length != 0, "Diploma not found");
        return diplomas[_diplomaId];
    }

    // Функция для аннулирования диплома
    function revokeDiploma(string calldata _diplomaId) external {
        require(bytes(diplomas[_diplomaId].graduateName).length != 0, "Diploma not found");

        // Отметить диплом как недействительный
        diplomas[_diplomaId].isValid = false;

        emit DiplomaRevoked(_diplomaId, diplomas[_diplomaId].issuedTo);
    }
}