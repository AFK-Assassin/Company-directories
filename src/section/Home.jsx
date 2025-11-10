import React from "react";
import Navbar from "../components/Navbar";
import CompanyList from "../components/CompanyList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Companies Directory
        </h1>
        <CompanyList />
      </main>
    </div>
  );
}
