import axios from "axios";

const API_URL = "http://localhost:3001/leads";

export const getLeads = () => {
  return axios.get(API_URL);
};

export const getLeadById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateLead = (id, lead) => {
  return axios.put(`${API_URL}/${id}`, lead);
};