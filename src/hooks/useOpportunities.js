import { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOpportunities = () => {
    setLoading(true);
    setError(null);
    apiRequest("/opportunities", {}, (err, data) => {
      if (err) {
        setError(err.message);
      } else {
        setOpportunities(data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  const addOpportunity = (opportunity, callback) => {
    const tempId = Date.now();
    const tempOpp = { ...opportunity, id: tempId };
    setOpportunities((prev) => [...prev, tempOpp]);

    apiRequest(
      "/opportunities",
      {
        method: "POST",
        body: JSON.stringify(opportunity),
      },
      (err, newOpp) => {
        if (err) {
          setOpportunities((prev) => prev.filter((o) => o.id !== tempId)); // Rollback
          callback(err);
        } else {
          // Replace temp with real
          setOpportunities((prev) =>
            prev.map((o) => (o.id === tempId ? newOpp : o))
          );
          callback(null, newOpp);
        }
      }
    );
  };

  return {
    opportunities,
    loading,
    error,
    refetch: loadOpportunities,
    addOpportunity,
  };
};
