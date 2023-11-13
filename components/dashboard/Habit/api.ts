import axios from "axios";

const API = process.env.API || "https://staging-api-health2023.agileteknik.com";

export const getHabit = async (config: any) => {
  return await axios.get(`${API}/api/v2/habbit`, config);
};

export const getHabitByDate = async (date: any, config: any) => {
  return await axios.get(`${API}/api/v2/user?date=${date}`, config);
};

export const createHabit = async (data: any, config: any) => {
  return await axios.post(`${API}/api/v2/habbit`, data, config);
};

export const editHabit = async (data: any, config: any, id: any) => {
  return await axios.put(`${API}/api/v2/habbit/${id}`, data, config);
};

export const deleteHabit = async (config: any, id: any) => {
  return await axios.delete(`${API}/api/v2/habbit/${id}`, config);
};
