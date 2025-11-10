import React from "react";

export default function Card({ company }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 hover:shadow-lg hover:bg-red-50 hover:scale-110 transition">
      <h2 className="text-xl font-semibold">{company.name}</h2>
      <p className="text-gray-500">{company.industry}</p>
      <div className="mt-2 space-y-1 text-sm">
        <p>
          <span className="font-medium">Location:</span> {company.location}
        </p>
        <p>
          <span className="font-medium">Size:</span> {company.size}
        </p>
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
}
