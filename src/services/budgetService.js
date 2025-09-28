import axios from 'axios';

// Base URL for your budget API (adjust as needed)
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const budgetAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Budget Service Functions
export const budgetService = {
  // Budget operations
  getBudget: () => budgetAPI.get('/budget'),
  createBudget: (budgetData) => budgetAPI.post('/budget', budgetData),
  updateBudget: (id, budgetData) => budgetAPI.put(`/budget/${id}`, budgetData),
  
  // Expense operations
  getExpenses: () => budgetAPI.get('/expenses'),
  addExpense: (expenseData) => budgetAPI.post('/expenses', expenseData),
  
  // Mock data exactly matching your original HTML file's fallback data
  getMockBudgetData: () => Promise.resolve({
    data: {
      myBudget: [
        { title: 'Eat out', budget: 30 },
        { title: 'Rent', budget: 350 },
        { title: 'Groceries', budget: 90 }
      ]
    }
  })
};

// Error handling helper
export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    console.error('Network Error:', error.request);
    return 'Network error - please check your connection';
  } else {
    console.error('Error:', error.message);
    return 'An unexpected error occurred';
  }
};

export default budgetService;
