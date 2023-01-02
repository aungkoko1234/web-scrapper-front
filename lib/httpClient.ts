import axios from "axios";

export const apiClient = (
  baseURL = process.env.API_URL,
  accessToken?: string,
  isMultiPart = false
) => {
  if (!isMultiPart)
    return axios.create({
      baseURL: baseURL,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  else
    return axios.create({
      baseURL: baseURL,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
};
