// Importar dados do db.json
import dbData from '../db.json';

// Criar cópias mutáveis dos dados para simular operações CRUD
let leadsData = [...dbData.leads];
let opportunitiesData = [...dbData.opportunities];

function simulateLatency(callback, data, error = null) {
  setTimeout(() => {
    // Simular falha aleatória (10% de chance para operações não-GET)
    if (error && Math.random() < 0.1) {
      callback(new Error("Simulated API failure"), null);
    } else {
      callback(null, data);
    }
  }, 1000); // 1 segundo de latência simulada
}

function apiRequest(endpoint, options = {}, callback) {
  const method = options.method || 'GET';

  // Simular diferentes endpoints
  if (endpoint === '/leads') {
    if (method === 'GET') {
      simulateLatency(callback, leadsData);
    }
  } else if (endpoint.startsWith('/leads/')) {
    const leadId = endpoint.split('/')[2];

    if (method === 'PUT') {
      // Simular atualização de lead
      const updateData = JSON.parse(options.body || '{}');
      const leadIndex = leadsData.findIndex(lead => lead.id === leadId);

      if (leadIndex !== -1) {
        leadsData[leadIndex] = { ...leadsData[leadIndex], ...updateData };
        simulateLatency(callback, leadsData[leadIndex], true);
      } else {
        simulateLatency(callback, null, true);
      }
    } else if (method === 'DELETE') {
      // Simular exclusão de lead
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
      // Simular criação de oportunidade
      const newOpportunity = JSON.parse(options.body || '{}');
      const opportunityWithId = {
        ...newOpportunity,
        id: Date.now().toString() // Garantir ID único
      };
      opportunitiesData.push(opportunityWithId);
      simulateLatency(callback, opportunityWithId, true);
    }
  } else {
    // Endpoint não encontrado
    simulateLatency(callback, null, true);
  }
}

export { apiRequest };
