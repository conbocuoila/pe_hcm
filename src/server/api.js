import axios from "axios";

const API_URL = "http://localhost:5174/sections";

export const getAllSections = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.log("Error while calling getAllSections api", error.message);
  }
};
export const getSectionDetails = async (id) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.log("Error while calling getSectionDetails api", error.message);
  }
};

export const addNewSection = async (data) => {
  try {
    return await axios.post(API_URL, data);
  } catch (error) {
    console.log("Error while calling addNewSection api", error.message);
  }
};

export const updateSection = async (id, data) => {
  try {
    return await axios.put(`${API_URL}/${id}`, data);
  } catch (error) {
    console.log("Error while calling updateSection api", error.message);
  }
};

export const deleteSection = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.log("Error while calling deleteSection api", error.message);
  }
};
