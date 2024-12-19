import { ethers } from "hardhat";

import { expect } from "chai";

describe("DiplomaRegistry", function () {
  let DiplomaRegistry: any;
  let diplomaRegistry: any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Развёртываем контракт перед каждым тестом
    DiplomaRegistry = await ethers.getContractFactory("DiplomaRegistry");
    [owner, addr1, addr2] = await ethers.getSigners();
    diplomaRegistry = await DiplomaRegistry.deploy();
    await diplomaRegistry.waitForDeployment();
  });

  it("Должен позволять регистрировать диплом", async function () {
    const diplomaId = "DIP001";
    const graduateName = "John Doe";
    const degree = "Computer Science";
    const graduationYear = 2024;

    await diplomaRegistry.registerDiploma(diplomaId, graduateName, degree, graduationYear, addr1.address);

    const diploma = await diplomaRegistry.verifyDiploma(diplomaId);

    expect(diploma.graduateName).to.equal(graduateName);
    expect(diploma.degree).to.equal(degree);
    expect(diploma.graduationYear).to.equal(graduationYear);
    expect(diploma.issuedTo).to.equal(addr1.address);
    expect(diploma.isValid).to.equal(true);
  });

  it("Должен выбрасывать ошибку при попытке зарегистрировать диплом с существующим ID", async function () {
    const diplomaId = "DIP001";

    await diplomaRegistry.registerDiploma(diplomaId, "John Doe", "Computer Science", 2024, addr1.address);

    await expect(
      diplomaRegistry.registerDiploma(diplomaId, "Jane Smith", "Mathematics", 2023, addr2.address),
    ).to.be.revertedWith("Diploma already registered");
  });

  it("Должен позволять проверять подлинность диплома", async function () {
    const diplomaId = "DIP002";

    await diplomaRegistry.registerDiploma(diplomaId, "Alice", "Engineering", 2022, addr2.address);

    const diploma = await diplomaRegistry.verifyDiploma(diplomaId);

    expect(diploma.isValid).to.equal(true);
    expect(diploma.issuedTo).to.equal(addr2.address);
  });

  it("Должен выбрасывать ошибку при проверке несуществующего диплома", async function () {
    await expect(diplomaRegistry.verifyDiploma("INVALID_ID")).to.be.revertedWith("Diploma not found");
  });

  it("Должен позволять аннулировать диплом", async function () {
    const diplomaId = "DIP003";

    await diplomaRegistry.registerDiploma(diplomaId, "Bob", "Physics", 2021, addr1.address);

    await diplomaRegistry.revokeDiploma(diplomaId);

    const diploma = await diplomaRegistry.verifyDiploma(diplomaId);
    expect(diploma.isValid).to.equal(false);
  });

  it("Должен выбрасывать ошибку при попытке аннулировать несуществующий диплом", async function () {
    await expect(diplomaRegistry.revokeDiploma("INVALID_ID")).to.be.revertedWith("Diploma not found");
  });
});
