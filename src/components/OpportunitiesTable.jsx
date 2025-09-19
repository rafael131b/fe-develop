const OpportunitiesTable = ({ opportunities }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Opportunities
      </h2>
      <div className="hidden lg:block">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-gray-700">ID</th>
              <th className="p-3 text-left text-gray-700">Name</th>
              <th className="p-3 text-left text-gray-700">Stage</th>
              <th className="p-3 text-left text-gray-700">Amount</th>
              <th className="p-3 text-left text-gray-700">Account</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr key={opp.id} className="border-b">
                <td className="p-3 text-gray-700">{opp.id}</td>
                <td className="p-3 text-gray-700">{opp.name}</td>
                <td className="p-3 text-gray-700">{opp.stage}</td>
                <td className="p-3 text-gray-700">
                  ${opp.amount.toLocaleString()}
                </td>
                <td className="p-3 text-gray-700">{opp.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden space-y-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-white p-4 rounded shadow border">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-gray-900">{opp.name}</p>
              <span className="text-sm text-gray-500">#{opp.id}</span>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Stage:</span> {opp.stage}</p>
              <p><span className="font-medium">Amount:</span> ${opp.amount.toLocaleString()}</p>
              <p><span className="font-medium">Account:</span> {opp.accountName}</p>
            </div>
          </div>
        ))}
      </div>
      {opportunities.length === 0 && (
        <p className="text-center py-8 text-gray-500">No opportunities yet.</p>
      )}
    </div>
  );
};

export default OpportunitiesTable;
