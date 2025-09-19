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
  const {
    opportunities,
    addOpportunity,
    loading: opportunitiesLoading,
    error: opportunitiesError,
    refetch: refetchOpportunities,
  } = useOpportunities();
  const { convertingLeads } = leadsData;
  const [selectedLead, setSelectedLead] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorType, setErrorType] = useState("error");
  const [retryFunction, setRetryFunction] = useState(null);

  const setError = (message, type = "error", retryFn = null) => {
    setErrorMessage(message);
    setErrorType(type);
    setRetryFunction(() => retryFn);
  };

  const clearError = () => {
    setErrorMessage("");
    setErrorType("error");
    setRetryFunction(null);
  };

  useEffect(() => {
    if (leadsData.error) {
      setError(leadsData.error, "network", () => {
        window.location.reload();
      });
    }
  }, [leadsData.error]);

  useEffect(() => {
    if (opportunitiesError) {
      setError(opportunitiesError, "network", () => {
        refetchOpportunities();
      });
    }
  }, [opportunitiesError, refetchOpportunities]);

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
  };

  const handleCloseDetail = () => {
    setSelectedLead(null);
  };

  const handleSaveLead = (id, updates) => {
    leadsData.updateLead(id, updates, (err) => {
      if (err) {
        setError("Failed to update lead: " + err.message, "server");
        setSuccessMessage("");
      } else {
        clearError();
        setSuccessMessage("Lead updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    });
  };

  const handleConvertLead = (lead) => {
    leadsData.convertToOpportunity(lead, (err1) => {
      if (err1) {
        setError("Failed to convert lead: " + err1.message, "server");
        setSuccessMessage("");
        return;
      }
      const opportunityData = {
        id: Date.now(),
        name: lead.name || "Unknown Lead",
        stage: lead.status === "qualified" ? "qualified" : "prospect",
        amount: null,
        accountName: lead.company || "Unknown Company",
      };

      addOpportunity(opportunityData, (err2) => {
        if (err2) {
          setError("Failed to add opportunity: " + err2.message, "server");
          setSuccessMessage("");
        } else {
          clearError();
          setSuccessMessage("Lead converted to opportunity successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      });
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <header className="bg-white shadow p-2 sm:p-4">
        <h1 className="text-xl sm:text-2xl font-bold">Mini Seller Console</h1>
      </header>
      <main className="container mx-auto flex flex-col 2xl:flex-row p-2 sm:p-4 gap-4">
        <div className="flex-1 bg-white rounded shadow">
          {leadsData.loading ? (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            <LeadsTable
              leadsData={leadsData}
              onConvertLead={handleConvertLead}
              onRowClick={handleRowClick}
              convertingLeads={convertingLeads}
            />
          )}
        </div>
        <div className="flex-1 bg-white rounded shadow">
          {opportunitiesLoading ? (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            <OpportunitiesTable opportunities={opportunities} />
          )}
        </div>
      </main>
      <LeadDetail
        isOpen={!!selectedLead}
        lead={selectedLead}
        onClose={handleCloseDetail}
        onSave={handleSaveLead}
        updating={leadsData.updating}
      />
      <ErrorToast
        message={errorMessage}
        type={errorType}
        onRetry={retryFunction}
        onDismiss={clearError}
      />
      <SuccessToast message={successMessage} />
    </div>
  );
}

export default App;
