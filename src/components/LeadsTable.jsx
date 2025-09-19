import { useState } from "react";

const LeadsTable = ({ leadsData, onConvertLead, onRowClick, convertingLeads }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLeads = searchQuery
    ? leadsData.searchLeads(searchQuery)
    : leadsData.leads;

  const handleSort = (type) => {
    if (type === "score-desc" || type === "score-asc") {
      const newSort = leadsData.sort === "score-desc" ? "score-asc" : "score-desc";
      leadsData.setSort(newSort);
    } else if (type === "name-asc" || type === "name-desc") {
      const newSort = leadsData.sort === "name-asc" ? "name-desc" : "name-asc";
      leadsData.setSort(newSort);
    } else {
      leadsData.setSort(type);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search name/company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded text-gray-700"
        />
        <select
          value={leadsData.filter}
          onChange={(e) => leadsData.setFilter(e.target.value)}
          className="p-2 border rounded text-gray-700"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="disqualified">Disqualified</option>
        </select>
        <button
          onClick={() => handleSort("score-desc")}
          className={`p-2 border rounded ${
            leadsData.sort === "score-desc" || leadsData.sort === "score-asc" ? "bg-blue-200" : ""
          }`}
        >
          Score {leadsData.sort === "score-desc" ? "↓" : leadsData.sort === "score-asc" ? "↑" : "↓"}
        </button>
        <button
          onClick={() => handleSort("name-asc")}
          className={`p-2 border rounded ${
            leadsData.sort === "name-asc" || leadsData.sort === "name-desc" ? "bg-blue-200" : ""
          }`}
        >
          Name {leadsData.sort === "name-asc" ? "↑" : leadsData.sort === "name-desc" ? "↓" : "↑"}
        </button>
      </div>
      <div className="hidden lg:block">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-gray-700">Name</th>
              <th className="p-3 text-left text-gray-700">Company</th>
              <th className="p-3 text-left text-gray-700">Email</th>
              <th className="p-3 text-left text-gray-700">Source</th>
              <th className="p-3 text-left text-gray-700">Score</th>
              <th className="p-3 text-left text-gray-700">Status</th>
              <th className="p-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick(lead)}
              >
                <td className="p-3 text-gray-700">{lead.name}</td>
                <td className="p-3 text-gray-700">{lead.company}</td>
                <td className="p-3 text-gray-700">{lead.email}</td>
                <td className="p-3 text-gray-700">{lead.source}</td>
                <td className="p-3 text-gray-700">{lead.score}</td>
                <td className="p-3 text-gray-700">{lead.status}</td>
                <td className="p-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onConvertLead(lead);
                    }}
                    disabled={convertingLeads.has(lead.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {convertingLeads.has(lead.id) ? "Converting..." : "Convert"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white p-4 rounded shadow border hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick(lead)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-900">{lead.name}</p>
                <p className="text-sm text-gray-600">{lead.company}</p>
              </div>
              <span className="text-sm text-gray-500">Score: {lead.score}</span>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Email:</span> {lead.email}</p>
              <p><span className="font-medium">Source:</span> {lead.source}</p>
              <p><span className="font-medium">Status:</span> {lead.status}</p>
            </div>
            <div className="mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConvertLead(lead);
                }}
                disabled={convertingLeads.has(lead.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {convertingLeads.has(lead.id) ? "Converting..." : "Convert"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredLeads.length === 0 && (
        <div className="text-center py-8">
          {leadsData.leads.length === 0 ? (
            <div>
              <p className="text-gray-500 mb-2">No leads available yet.</p>
              <p className="text-sm text-gray-400">Start by adding some leads to your database.</p>
            </div>
          ) : (
            <p className="text-gray-500">
              No leads match your current filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadsTable;
