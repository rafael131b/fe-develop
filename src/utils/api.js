import dbData from '../db.json';

let leadsData = [...dbData.leads];
let opportunitiesData = [...dbData.opportunities];

function simulateLatency(callback, data, error = null) {
  setTimeout(() => {
    if (error && Math.random() < 0.1) {
      callback(new Error("Simulated API failure"), null);
    } else {
      callback(null, data);
    }
  }, 1000);
}

function apiRequest(endpoint, options = {}, callback) {
  const method = options.method || 'GET';

  if (endpoint === '/leads') {
    if (method === 'GET') {
      simulateLatency(callback, leadsData);
    }
  } else if (endpoint.startsWith('/leads/')) {
    const leadId = endpoint.split('/')[2];

    if (method === 'PUT') {
      const updateData = JSON.parse(options.body || '{}');
      const leadIndex = leadsData.findIndex(lead => lead.id === leadId);

      if (leadIndex !== -1) {
        leadsData[leadIndex] = { ...leadsData[leadIndex], ...updateData };
        simulateLatency(callback, leadsData[leadIndex], true);
      } else {
        simulateLatency(callback, null, true);
      }
    } else if (method === 'DELETE') {
      const leadIndex = leadsData.findIndex(lead => lead.id === leadId);

      if (leadIndex !== -1) {
        leadsData.splice(leadIndex, 1);
        simulateLatency(callback, { success: true }, true);
      } else {
        simulateLatency(callback, null, true);
      }
    }
  } else if (endpoint === '/opportunities') {
    if (method === 'GET') {
      simulateLatency(callback, opportunitiesData);
    } else if (method === 'POST') {
      const newOpportunity = JSON.parse(options.body || '{}');
      const opportunityWithId = {
        ...newOpportunity,
        id: Date.now().toString()
      };
      opportunitiesData.push(opportunityWithId);
      simulateLatency(callback, opportunityWithId, true);
    }
  } else {
    simulateLatency(callback, null, true);
  }
}

export { apiRequest };
