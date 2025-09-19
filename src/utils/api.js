const API_BASE = "http://localhost:3000";

function apiRequest(endpoint, options = {}, callback) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  setTimeout(() => {
    fetch(url, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Inside the timeout, after fetch
        if (options.method && options.method !== "GET" && Math.random() < 0.1) {
          callback(new Error("Simulated API failure"), null);
          return;
        }
        callback(null, data);
      })
      .catch((error) => {
        callback(error, null);
      });
  }, 1000);
}

export { apiRequest };
