import React, { useState } from "react";
import companiesData from "../data/companies.json";
import Card from "./Card";

export default function CompanyList() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const companiesPerPage = 6;

  // used for filtering (drop down options)
  const uniqueLocations = ["All", ...new Set(companiesData.map((c) => c.location))];
  const uniqueIndustries = ["All", ...new Set(companiesData.map((c) => c.industry))];

  // used for Searching,Filtering and Sorting
  const filteredCompanies = companiesData
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (location === "All" ? true : c.location === location))
    .filter((c) => (industry === "All" ? true : c.industry === industry))
    .sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // applying Pagination 
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const startIndex = (currentPage - 1) * companiesPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, startIndex + companiesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {uniqueLocations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {uniqueIndustries.map((ind, idx) => (
            <option key={idx} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Sort: A → Z</option>
          <option value="desc">Sort: Z → A</option>
        </select>
      </div>

      {/* 🧾 Company Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentCompanies.map((company) => (
          <Card key={company.id} company={company} />
        ))}
      </div>

      {/* 🔁 Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
