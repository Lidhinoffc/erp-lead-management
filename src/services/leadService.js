import axios from "axios";

const API_URL = "https://6a4a4d3aedfa6a2b5fd7be69.mockapi.io/leads";

export const getLeads = () => {
  return axios.get(API_URL);
};

export const getLeadById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createLead = (lead) => {
  return axios.post(API_URL, lead);
};

export const updateLead = (id, lead) => {
  return axios.put(`${API_URL}/${id}`, lead);
};

export const deleteLead = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};