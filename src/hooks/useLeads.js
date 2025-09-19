import { useState, useEffect, useMemo, useCallback } from "react";
import { apiRequest } from "../utils/api";
import { useLocalStorage } from "./useLocalStorage";

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [convertingLeads, setConvertingLeads] = useState(new Set());
  const [error, setError] = useState(null);
  const [filterStore, setFilterStore] = useLocalStorage("filter", "all");
  const [sortStore, setSortStore] = useLocalStorage("sort", "score-desc");

  useEffect(() => {
    const loadLeads = () => {
      setLoading(true);
      setError(null);
      apiRequest("/leads", {}, (err, data) => {
        if (err) {
          setError(err.message);
        } else {
          setLeads(data);
        }
        setLoading(false);
      });
    };
    loadLeads();
  }, []);

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Filter
    if (filterStore !== "all") {
      result = result.filter((lead) => lead.status === filterStore);
    }

    // Sort
    if (sortStore === "score-desc") {
      result.sort((a, b) => b.score - a.score);
    } else if (sortStore === "score-asc") {
      result.sort((a, b) => a.score - b.score);
    } else if (sortStore === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortStore === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [leads, filterStore, sortStore]);

  const searchLeads = useCallback(
    (query) => {
      return filteredAndSortedLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query.toLowerCase()) ||
          lead.company.toLowerCase().includes(query.toLowerCase())
      );
    },
    [filteredAndSortedLeads]
  );

  const updateLead = useCallback(
    (id, updates, callback) => {
      setUpdating(true);
      // Optimistic update
      const originalLeads = [...leads];
      const updatedLeads = leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
      );
      setLeads(updatedLeads);

      apiRequest(
        `/leads/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...leads.find((lead) => lead.id === id),
            ...updates,
          }),
        },
        (err, result) => {
          setUpdating(false);
          if (err) {
            setLeads(originalLeads); // Rollback
            callback(err);
          } else {
            callback(null, result);
          }
        }
      );
    },
    [leads]
  );

  const convertToOpportunity = useCallback(
    (lead, callback) => {
      setConvertingLeads(prev => new Set(prev).add(lead.id));
      // Optimistic: Remove lead
      const originalLeads = [...leads];
      const filtered = leads.filter((l) => l.id !== lead.id);
      setLeads(filtered);

      apiRequest(
        "/opportunities",
        {
          method: "POST",
          body: JSON.stringify({
            id: Date.now(), // Simple ID
            name: lead.name,
            stage: "prospect",
            amount: Math.floor(Math.random() * 9000 + 1000),
            accountName: lead.company,
          }),
        },
        (err, result) => {
          setConvertingLeads(prev => {
            const newSet = new Set(prev);
            newSet.delete(lead.id);
            return newSet;
          });
          if (err) {
            setLeads(originalLeads); // Rollback
            callback(err);
          } else {
            callback(null, result);
          }
        }
      );
    },
    [leads]
  );

  return {
    leads: filteredAndSortedLeads,
    loading,
    updating,
    convertingLeads,
    error,
    filter: filterStore,
    setFilter: setFilterStore,
    sort: sortStore,
    setSort: setSortStore,
    searchLeads,
    updateLead,
    convertToOpportunity,
  };
};
