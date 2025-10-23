// API Configuration
const config = {
  // Use environment variable or default to localhost
  API_BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",

  // Development vs Production URLs
  development: {
    API_BASE_URL: "http://localhost:5000",
  },

  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  },
};

// Get current environment
const environment = process.env.NODE_ENV || "development";

// Export the appropriate configuration
export default config[environment] || config.development;
