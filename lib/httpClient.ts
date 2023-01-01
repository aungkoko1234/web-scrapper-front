import axios from "axios";

export const apiClient = (baseURL = process.env.API_URL) => {
  return axios.create({
    baseURL: baseURL,
  });
};
