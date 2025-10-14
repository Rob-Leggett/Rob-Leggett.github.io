'use client';
import React from 'react';

type Row = {
  category: string;
  subcategory?: string;
  type: string;
  description: string;
  gcp: string[];
  aws: string[];
  azure: string[];
};

export default function CloudComparisonTable({ data }: { data: Row[] }) {
  const renderList = (items: string[]) =>
    items && items.length > 0 ? items.join(', ') : '—';

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm my-6">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800 border-b sticky top-0">
        <tr>
          {['Category', 'Type', 'Description', 'GCP', 'AWS', 'Azure'].map((h) => (
            <th key={h} className="p-3 font-semibold whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="border-t hover:bg-gray-50 dark:hover:bg-gray-900/30"
          >
            <td className="p-3 align-top">{row.category}</td>
            <td className="p-3 align-top">{row.type}</td>
            <td className="p-3 align-top">{row.description}</td>
            <td className="p-3 align-top">{renderList(row.gcp)}</td>
            <td className="p-3 align-top">{renderList(row.aws)}</td>
            <td className="p-3 align-top">{renderList(row.azure)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}