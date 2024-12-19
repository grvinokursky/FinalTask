"use client";

import React from "react";
import RegisterDiploma from "../components/RegisterDiploma";
import RevokeDiploma from "../components/RevokeDiploma";
import { CheckDiploma } from "~~/components/CheckDiploma";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Diploma Registry</h1>
      <RegisterDiploma />
      <RevokeDiploma />
      <CheckDiploma />
    </div>
  );
};

export default Home;
