import axios from "axios";

export const apiInstance = (baseURL) => {
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return api;
};
