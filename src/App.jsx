import { useState, useEffect } from "react";
import LeadsTable from "./components/LeadsTable";
import LeadDetail from "./components/LeadDetail";
import OpportunitiesTable from "./components/OpportunitiesTable";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorToast from "./components/ErrorToast";
import SuccessToast from "./components/SuccessToast";
import { useLeads } from "./hooks/useLeads";
import { useOpportunities } from "./hooks/useOpportunities";

function App() {
  const leadsData = useLeads();
  const { opportunities, addOpportunity } = useOpportunities();
  const { convertingLeads } = leadsData;
  const [selectedLead, setSelectedLead] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (leadsData.error) {
      setErrorMessage(leadsData.error);
    }
  }, [leadsData.error]);

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
  };

  const handleCloseDetail = () => {
    setSelectedLead(null);
  };

  const handleSaveLead = (id, updates) => {
    leadsData.updateLead(id, updates, (err) => {
      if (err) {
        setErrorMessage("Failed to update lead: " + err.message);
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("Lead updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    });
  };

  const handleConvertLead = (lead) => {
    leadsData.convertToOpportunity(lead, (err1) => {
      if (err1) {
        setErrorMessage("Failed to convert lead: " + err1.message);
        setSuccessMessage("");
        return;
      }
      addOpportunity(
        {
          id: Date.now(),
          name: lead.name,
          stage: "prospect",
          amount: Math.floor(Math.random() * 9000 + 1000),
          accountName: lead.company,
        },
        (err2) => {
          if (err2) {
            setErrorMessage("Failed to add opportunity: " + err2.message);
            setSuccessMessage("");
          } else {
            setErrorMessage("");
            setSuccessMessage("Lead converted to opportunity successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
          }
        }
      );
    });
  };

  if (leadsData.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <header className="bg-white shadow p-2 sm:p-4">
        <h1 className="text-xl sm:text-2xl font-bold">Mini Seller Console</h1>
      </header>
      <main className="container mx-auto flex flex-col 2xl:flex-row p-2 sm:p-4 gap-4">
        <div className="flex-1 bg-white rounded shadow">
          <LeadsTable
            leadsData={leadsData}
            onConvertLead={handleConvertLead}
            onRowClick={handleRowClick}
            convertingLeads={convertingLeads}
          />
        </div>
        <div className="flex-1 bg-white rounded shadow">
          <OpportunitiesTable opportunities={opportunities} />
        </div>
      </main>
      <LeadDetail
        isOpen={!!selectedLead}
        lead={selectedLead}
        onClose={handleCloseDetail}
        onSave={handleSaveLead}
        updating={leadsData.updating}
      />
      <ErrorToast message={errorMessage} />
      <SuccessToast message={successMessage} />
    </div>
  );
}

export default App;
